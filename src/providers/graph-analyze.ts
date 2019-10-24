import {DepGraph} from "dependency-graph";
import {Graph, Node} from "./deps";

export class GraphAnalyze {
    private readonly graph: Graph;
    private readonly depGraph: DepGraph<Node>;

    constructor(graph: Graph) {
        this.graph = graph;
        this.depGraph = new DepGraph();
        graph.nodes.forEach((node) => {
            this.depGraph.addNode(node.id);
            this.depGraph.setNodeData(node.id, node);
        });

        graph.edges.forEach((edge) => {
            this.depGraph.addDependency(edge.b, edge.a);
        });
    }

    public getRoots(): Node[] {
        const roots = this.depGraph.overallOrder(true);
        return roots.map((root) => {
            return this.depGraph.getNodeData(root);
        });
    }
}
