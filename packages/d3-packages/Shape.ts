import {VisualObject, Coords} from './VisualObject'
import {DEFAULT_BORDER_COLOR, DEFAULT_COLOR, DEFAULT_FONT_SIZE, DEFAULT_STROKE_WIDTH, DEFAULT_TEXT_COLOR} from './Constants'
import { TextBox } from './Textbox';

export class Shape extends VisualObject{
    public color: string;
    public borderWidth: number;
    public borderColor: string;
    public label: TextBox;
    /*
    All shapes will extend this class

    Idea: want functionality to be able to conjoin two shapes (i.e. for tic-tac-toe,
        throw an X over a square and call it a single type)
    */

    constructor(
        coords?: Coords
    ){
        if(coords){super(coords)}
        else{super()}
        this.color = DEFAULT_BORDER_COLOR; 
        this.borderWidth = DEFAULT_STROKE_WIDTH;
        this.borderColor = DEFAULT_COLOR;
        this.label = new TextBox("", coords)
        this.children.push(this.label)
    }

    setCenter(center: Coords){
        this.label.setCenter(center)
        super.setCenter()
    }

    setColor(color: string){ this.color = color }
    setBorderWidth(borderWidth: number){ this.borderWidth = borderWidth }
    setBorderColor(borderColor: string){ this.borderColor = borderColor }
    setLabelText(text: string){this.label.setText(text)}
    setLabelColor(labelColor: string){this.label.setTextColor(labelColor)}
    setLabelSize(labelSize: number){this.label.setFontSize(labelSize)}
}