import { GraphLayout } from '@/alloy-graph';
import { GraphProps } from '@/graph-svg';
import { DatumParsed } from '@/sterling-connection';
import { Projection } from '@/sterling-theme';
import { Matrix } from 'transformation-matrix';

export interface GraphsState {
  // the set of graphs associated with each datum
  graphsByDatumId: Record<
    string,
    {
      // the datum id
      datumId: string;
      // the graphs by graph id
      graphsById: Record<string, GraphProps>;
    }
  >;
  layoutsByDatumId: Record<
    string,
    {
      // the datum id
      datumId: string;
      // the datum's layouts
      layoutById: Record<string, GraphLayout>;
    }
  >;
  // the transformation matrix associated with each datum
  matricesByDatumId: Record<
    string,
    {
      // the datum id
      datumId: string;
      // the spread matrix
      spreadMatrix: Matrix;
      // the zoom matrix
      zoomMatrix: Matrix;
    }
  >;
}

export interface GraphData {
  // the datum represented by the graph data
  datum: DatumParsed<any>;
  // the graph props (used for rendering)
  graphProps: GraphProps;
  // the time projection type, if one was used
  timeProjection?: string;
}

/**
 * Create a new graphs state.
 */
export function newGraphsState(): GraphsState {
  return {
    graphsByDatumId: {},
    layoutsByDatumId: {},
    matricesByDatumId: {}
  };
}

/**
 * Generate a unique layout id based on the set of projections.
 *
 * @param projections A set of projections
 */
export function generateLayoutId(projections: Projection[]): string {
  if (!projections.length) return '|';
  const sorted = projections.slice().sort((a, b) => {
    if (a.time === b.time) return a.type.localeCompare(b.type);
    return a.time === true ? -1 : 1;
  });
  const names = sorted.map((projection) => {
    return projection.time === true
      ? `[${projection.type}]`
      : `(${projection.type})`;
  });
  return names.join('|');
}

/**
 * Generate a unique graph id based on the set of projections.
 * @param index
 * @param projections
 */
export function generateGraphId(
  index: number,
  projections: Projection[]
): string {
  if (!projections.length) return `${index}`;
  const sorted = projections.slice().sort((a, b) => {
    if (a.time === b.time) return a.type.localeCompare(b.type);
    return a.time === true ? -1 : 1;
  });
  const names = sorted.map((projection) => {
    return projection.time === true
      ? `[${projection.type}:${projection.atom || ''}]`
      : `(${projection.type}:${projection.atom || ''})`;
  });
  return names.join('|');
}