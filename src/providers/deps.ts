import * as rm from "typed-rest-client/RestClient";

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
export interface Graph {nodes: Node[]; edges: Edge[]; }
export interface Edge {a: string; b: string; }

export interface Node {
    id: string;
    title: string;
}
