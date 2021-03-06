import * as rm from "typed-rest-client/RestClient";
import {oc} from "ts-optchain";

export class Deps {

    static async fetchOfSqls(ServerUrl: string, plsqlNames: PlsqlName[]) {
        return Promise.all(
            plsqlNames.map(
                (plSqlName) => this.fetchSql(ServerUrl, plSqlName)));
    }

    private static async fetchSql(ServerUrl: string, plsqlName) {
        const client = new rm.RestClient("aop", ServerUrl);
        const url = `/plsql/${plsqlName.pkg}/${plsqlName.method}/callers`;
        try {
            const rs = await client.get<Graph>(url);
            return new Deps(rs.statusCode === 200, rs.result, plsqlName);
        } catch (ex) {
            return new Deps(false, null, plsqlName);
        }
    }
    public readonly isSuccess: boolean;
    public readonly Deps: Graph;
    public readonly plSql: PlsqlName;

    constructor(isSuccess: boolean, Deps: Graph, plsqlName: PlsqlName) {
        this.isSuccess = isSuccess;
        this.Deps = Deps;
        this.plSql = plsqlName;
    }
}

export class PlsqlName {
    public readonly pkg: string;
    public readonly method: string;

    constructor(pkg: string, method: string) {
        this.pkg = pkg;
        this.method = method;
    }

    public toString() {
        return `${this.pkg}.${this.method}`;
    }
}

export class Graph {
    nodes: Node[];
    edges: Edge[];


    constructor(nodes: Node[], edges: Edge[]) {
        this.nodes = nodes;
        this.edges = edges;
    }

    ignoreNonSupportNode(titles: string[]) {
        if (this.nodes) {
            this.nodes = this.nodes.filter(node => {
                return titles.some(title => {
                    return title === node.title
                })
            })
        }
    }
}

export const isEmptyEdge = (edges: Edge[]) => oc(edges).length(0) === 0;

export interface Edge {
    a: string;
    b: string;
}


export const getClass: (node: Node) => string = (node: Node) => {
    return node.title.split('.').filter((element, index, array) => {
        return array.length !== index + 1;
    }).join('.')
};

export const getMethod = (node: Node) => {
    const strings = node.title.split('.');
    return strings[strings.length - 1];
};


export interface Node {
    id: string;
    title: string;
}
