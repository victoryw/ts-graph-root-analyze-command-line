import {GraphAnalyze} from "../../src/providers/graph-analyze";
import {Deps, Edge, Graph, Node} from "../../src/providers/deps";
import should = require("should");

describe('when analyze graph', () => {
    let graph1: Graph;
    let graph2: Graph;
    let node1: Node;
    let node2: Node;
    let node3: Node;
    let edge1: Edge;
    let edge2: Edge;

    before(()=>{
        node1 = new NodeInTest('1', '1');
        node2 = new NodeInTest('2', '2');
        node3 = new NodeInTest('3', '3');
        edge1 = {a: node1.id, b: node2.id};
        edge2 = {a: node3.id, b: node2.id};
        graph1 = {nodes: [node1, node2], edges: [edge1]};
        graph2 = {nodes: [node1, node2, node3], edges:[edge1, edge2]};
    });

    it('should get the root', () => {
        const analyzer = new GraphAnalyze(graph1);
        const roots = analyzer.getRoots();
        should(roots.length).be.equal(1);
        should(roots[0]).be.equal(node1);
    });

    it('should get the multiple roots', () => {
        const analyzer = new GraphAnalyze(graph2);
        const roots = analyzer.getRoots();
        should(roots.length).be.equal(2);
        should(roots).be.containEql(node1);
        should(roots).be.containEql(node3);
    });
});

class NodeInTest implements Node {
    id: string;
    title: string;


    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
}

