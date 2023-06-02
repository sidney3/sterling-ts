import {
  AlloyInstance,
  getAtomType,
  getInstanceRelations,
  getRelationTuples
} from '@/alloy-instance';
import { Edge, getEdges, getNodes, PositionedGraph } from '@/graph-lib';
import {
  CurveDef,
  EdgeLabelDef,
  GraphProps,
  LabelDef,
  NodeLabelDef,
  ShapeDef
} from '@/graph-svg';
import {
  EdgeStyleSpec,
  getRelationIsAttribute,
  NodeStyleSpec,
  SterlingTheme
} from '@/sterling-theme';
import { assign } from 'lodash-es';
import { CSSProperties } from 'react';
import { getInstanceEdgeStyleSpecs } from './getInstanceEdgeStyleSpecs';
import { getInstanceNodeStyleSpecs } from './getInstanceNodeStyleSpecs';
import { AlloyEdge, AlloyGraph } from './types';

/**
 * TODO: This function needs to accept an array of themes so that we can apply
 *       multiple themes in sequence.
 */
export function generateGraphProps(
  id: string,
  instance: AlloyInstance,
  graph: AlloyGraph & PositionedGraph,
  theme: SterlingTheme
): GraphProps {
  // Create our props objects
  const nodeShapes: Record<string, ShapeDef> = {};
  const nodeStyles: Record<string, CSSProperties> = {};
  const nodeLabels: Record<string, NodeLabelDef[]> = {};
  const edgeCurves: Record<string, CurveDef> = {};
  const edgeStyles: Record<string, CSSProperties> = {};
  const edgeLabels: Record<string, EdgeLabelDef[]> = {};

  // For each type and for wildcard, get an ordered array of node style specs
  const nodeSpecs: Record<string, NodeStyleSpec[]> = getInstanceNodeStyleSpecs(
    instance,
    theme
  );

  // For each relation and for wildcard, get an ordered array of edge styles specs
  const edgeSpecs: Record<string, EdgeStyleSpec[]> = getInstanceEdgeStyleSpecs(
    instance,
    theme
  );

  // Generate attribute labels (Record<atom, label[]>)
  const attributeLabels: Record<string, string[]> = {};
  getInstanceRelations(instance).forEach((relation) => {
    if (getRelationIsAttribute(theme, relation.id)) {
      getRelationTuples(relation).forEach((tuple) => {
        const atoms = tuple.atoms;
        if (atoms.length > 1) {
          const atom = atoms[0];
          if (!attributeLabels[atom]) attributeLabels[atom] = [];
          attributeLabels[atom].push(
            `${relation.name}: ${atoms.slice(1).join(', ')}`
          );
        }
      });
    }
  });

  // Generate node labels and styles
  getNodes(graph).forEach((node) => {
    nodeLabels[node.id] = [
      {
        text: node.atom.id,
        props: {},
        style: {}
      }
    ];
    if (attributeLabels[node.id]) {
      nodeLabels[node.id].push(
        ...attributeLabels[node.id].map((label) => {
          return {
            text: label,
            props: {},
            style: {}
          };
        })
      );
    }
    nodeStyles[node.id] = {};
  });

  const generateEdgeLabel = (edge: AlloyEdge) => {
    if (edge.tuple.atoms.length > 2) {
      return (
        edge.relation.name + `[${edge.tuple.atoms.slice(1, -1).join(', ')}]`
      );
    }
    return edge.relation.name;
  };

  // Generate edge labels and styles
  getEdges(graph).forEach((edge) => {
    edgeLabels[edge.id] = [
      {
        text: generateEdgeLabel(edge),
        props: {},
        style: {}
      }
    ];
    edgeStyles[edge.id] = {};
  });

  // Build props for each node
  getNodes(graph).forEach((node) => {
    const { id, atom } = node;
    const type = getAtomType(instance, atom);
    const typeHierarchy = ['*', 'univ', ...type.types.slice().reverse()];
    typeHierarchy.forEach((type) => {
      nodeSpecs[type]?.forEach((spec) => {
        // set the shape if one is specified
        if (spec.shape) {
          nodeShapes[id] = spec.shape;
        }

        // apply node shape styles if any are specified
        assign(nodeStyles[id], spec.styles?.node);

        // apply node label props and styles if any are specified
        nodeLabels[id].forEach((label) => {
          assign(label.props, spec.props?.label);
          assign(label.style, spec.styles?.label);
        });

        // vertically align labels if there are multiple
        verticallyAlignLabels(nodeLabels[id]);
      });
    });
  });

  getEdges(graph).forEach((edge) => {
    const { id, relation, tuple } = edge;
    const relations = ['*', relation.id];
    relations.forEach((relation) => {
      edgeSpecs[relation]?.forEach((spec) => {
        // set the curve if one is specified
        if (spec.curve) {
          edgeCurves[id] = spec.curve;
        }

        // apply edge shape styles if any are specified
        assign(edgeStyles[id], spec.styles?.edge);

        // apply edge label props and styles if any are specified
        edgeLabels[id].forEach((label) => {
          assign(label.props, spec.props?.label);
          assign(label.style, spec.styles?.label);
        });

        // vertically align labels if there are multiple
        verticallyAlignLabels(edgeLabels[id]);
      });
    });
  });

  return {
    id,
    graph,
    nodeShapes,
    nodeStyles,
    nodeLabels,
    edgeCurves,
    edgeLabels,
    edgeStyles
  };
}

function verticallyAlignLabels(labels: LabelDef[]) {
  const height = labels.length - 1;
  labels.forEach((label, index) => {
    if (!label.props) label.props = {};
    label.props.dy = `${index - height / 2 + 0.33}em`;
  });
}
