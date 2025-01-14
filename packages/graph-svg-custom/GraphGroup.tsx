import {
  getEdges,
  getNode,
  getNodes,
  PositionedNode,
  RoutedEdge
} from '@/graph-lib';
import { memo, SVGProps, useMemo } from 'react';
import { extractArrowHeads } from './components/ArrowHead/extractArrowHeads';
import { Defs } from './components/Defs/Defs';
import { EdgesGroup } from './components/EdgesGroup/EdgesGroup';
import { NodesGroup } from './components/NodesGroup/NodesGroup';
import { GraphGroupProps } from './GraphGroupProps';
import { buildPath } from './paths/buildPath';
import { useInteraction } from './providers/interaction/InteractionProvider';
import { ArrowDef, EdgeDef, NodeDef } from './types';
import { isDefined } from './util';

const GraphGroup = memo(
  <N extends PositionedNode, E extends RoutedEdge>(
    props: GraphGroupProps<N, E> & SVGProps<SVGGElement>
  ) => {
    const {
      id,
      graph,
      edgeCurves,
      edgeStyles,
      edgeLabels,
      nodeShapes,
      nodeStyles,
      nodeLabels,
      ...rest
    } = props;

    const { nodeOffset, spreadMatrix } = useInteraction();

    const nodes: NodeDef[] = useMemo(
      () =>
        getNodes(graph).map((node) => {
          const position = { x: node.x, y: node.y };
          const shape = nodeShapes[node.id];
          const style = nodeStyles[node.id];
          const labels = nodeLabels ? nodeLabels[node.id] : undefined;
          return {
            id: node.id,
            position,
            shape,
            style,
            labels
          };
        }),
      [graph, nodeShapes, nodeStyles, nodeLabels]
    );

    const edges: EdgeDef[] = useMemo(
      () =>
        getEdges(graph)
          .map((edge) => {
            const source = getNode(graph, edge.source);
            const target = getNode(graph, edge.target);
            if (!source || !target) return undefined;
            const sourceShape = nodeShapes[source.id];
            const targetShape = nodeShapes[target.id];
            const sourceOffset = nodeOffset(source.id);
            const targetOffset = nodeOffset(target.id);
            const path = buildPath(
              edge,
              source,
              sourceShape,
              sourceOffset,
              target,
              targetShape,
              targetOffset,
              spreadMatrix
            );
            const curve = edgeCurves[edge.id];
            const style = edgeStyles[edge.id];
            const labels = edgeLabels ? edgeLabels[edge.id] : undefined;
            return {
              id: edge.id,
              path,
              curve,
              style,
              labels
            };
          })
          .filter(isDefined),
      [graph, spreadMatrix, edgeCurves, edgeStyles, edgeLabels, nodeOffset]
    );

    const arrows: ArrowDef[] = extractArrowHeads(Object.values(edgeStyles));

    return (
      <g id={id} {...rest}>
        <Defs arrowHeads={arrows} />
        <NodesGroup nodes={nodes} />
        <EdgesGroup edges={edges} />
      </g>
    );
  }
);

export { GraphGroup };
