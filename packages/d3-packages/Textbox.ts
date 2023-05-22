import { require as d3require } from 'd3-require';
import * as d3 from 'd3';
import {
  DEFAULT_COLOR,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_COLOR
} from './Constants';
import { VisualObject } from './VisualObject';
import { BoundingBox, Coords, toFunc } from './Utility';

export interface TextBoxProps {
  text?: string | (() => string);
  coords?: Coords | (() => Coords);
  color?: string | (() => string);
  fontSize?: number | (() => number);
  events?: VisualObjectEventDecl[] | (() => VisualObjectEventDecl[])
}

/**
 * Taken from D3's declarations. `d` is typed within D3, but via
 * a type parameter.
 */
export type VisualObjectEventCallback = 
  (this: SVGTextElement, event: any, d: any) => void
export interface VisualObjectEventDecl {
  event: string,
  callback: VisualObjectEventCallback,
  options?: any // D3's type decls use `any` here
}

export class TextBox extends VisualObject {
  text: () => string;
  fontSize: () => number;
  color: () => string;
  events: () => VisualObjectEventDecl[];

  /**
   * Displays given text.
   * @param text text to display
   * @param coords location for center of text
   * @param color text color
   * @param fontSize size of the text
   */
  constructor(props: TextBoxProps) {
    super(props.coords);
    this.text = toFunc('', props.text);
    this.fontSize = toFunc(DEFAULT_FONT_SIZE, props.fontSize);
    this.color = toFunc(DEFAULT_TEXT_COLOR, props.color);
    this.events = toFunc([], props.events)
  }

  boundingBox(): BoundingBox {
    console.log('getting textBox bounding box');
    return {
      top_left: {
        // No easy solution here. Just returning a square of the text's size.
        x: this.center().x - this.fontSize() / 2,
        y: this.center().y - this.fontSize() / 2
      },
      bottom_right: {
        // No easy solution here. Just returning a square of the text's size.
        x: this.center().x + this.fontSize() / 2,
        y: this.center().y + this.fontSize() / 2
      }
    };
  }

  setText(text: string | (() => string)) {
    this.text = toFunc(this.text(), text);
  }
  setFontSize(fontSize: number | (() => number)) {
    this.fontSize = toFunc(this.fontSize(), fontSize);
  }
  setTextColor(color: string | (() => string)) {
    this.color = toFunc(this.color(), color);
  }

  override render(svg: any, parent_masks: BoundingBox[]) {

    let maskIdentifier: string = '';

    let render_masks: BoundingBox[];
    if (parent_masks) {
      render_masks = this.masks.concat(parent_masks);
    } else {
      render_masks = this.masks;
    }
    maskIdentifier = this.addMaskRender(render_masks, svg);

    const d3Box = d3.select(svg)
      .append('text')
      .attr('x', this.center().x)
      .attr('y', this.center().y)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'central')
      .attr('font-size', this.fontSize)
      .attr('mask', (render_masks.length > 0) ? `url(#${maskIdentifier})` : '')
      .attr('fill', this.color)
      .text(this.text);

    // Because of how props are lifted to a function, they can
    // never themselves have function type. Instead, have one 
    // event prop (object), which is more extensible anyway. 
    if(this.events()) 
      this.events().forEach(e => d3Box.on(e.event, e.callback))

    super.render(svg);
  }
}
