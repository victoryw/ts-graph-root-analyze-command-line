import * as rm from "typed-rest-client/RestClient";

export class Deps {
    public readonly isSuccess: boolean;
    public readonly Deps: Graph;
    public readonly plSql: PlsqlName;

    constructor(isSuccess: boolean, Deps: Graph, plsqlName: PlsqlName) {
        this.isSuccess = isSuccess;
        this.Deps = Deps;
        this.plSql = plsqlName;
    }

    static async fetchOfSqls(ServerUrl: string, plsqlNames:PlsqlName[]) {
        return await Promise.all(
            plsqlNames.map(
                plSqlName => this.fetchSql(ServerUrl, plSqlName)));
    }


    private static async fetchSql(ServerUrl: string, plsqlName) {
        let client = new rm.RestClient('aop', ServerUrl);
        const url = `/plsql/${plsqlName.pkg}/${plsqlName.method}/callers`;
        try {
            let rs = await client.get<Graph>(url);
            return new Deps(rs.statusCode === 200, rs.result, plsqlName);
        } catch (ex) {
            return new Deps(false, null, plsqlName);
        }
    }
}

export class PlsqlName {
    public readonly pkg: string;
    public readonly method: string;

    constructor(pkg: string, method: string) {
        this.pkg = pkg;
        this.method = method;
    }

    toString() {
        return `${this.pkg}.${this.method}`;
    }
}
export type Graph = {nodes: Node[], edges: Edge[]}
export type Edge = {a: string, b : string}

export interface Node {
    id: string;
    title: string;
}