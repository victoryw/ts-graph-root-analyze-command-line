import * as assert from "assert";
import {Deps, Node, PlsqlName} from "../providers/deps";
import {GraphAnalyze} from "../providers/graph-analyze";

import * as _ from "lodash";

class PlsqlUseCaseExternPointAnalyzor {
    public async justDo(ServerUrl: string, plsqls: PlsqlName[]): Promise<PlSqlRoot[]> {
        const deps = await Deps.fetchOfSqls(ServerUrl, plsqls);
        const rootH = deps.filter((dep) => dep.isSuccess).map((dep) => {
            const analyzer = new GraphAnalyze(dep.Deps);
            return analyzer.getRoots().map((root) => {
                return {root, plsql: dep.plSql};
            });
        });

        const noRootItems = deps.filter((dep) => !dep.isSuccess).map((dep) => {
            return {root: null, plsql: dep.plSql};
        });
        const allSqlRoots = [].concat(...rootH).concat(noRootItems);
        const keys = _.chain(allSqlRoots)
            .groupBy((root) => `${root.plsql.pkg}.${root.plsql.method}`)
            .map((value, key) => key)
            .value();
        assert.strictEqual(keys.length, plsqls.length);
        return allSqlRoots;
    }
}

export type PlSqlRoot = { root?: Node } & { plsql: PlsqlName };

export {PlsqlUseCaseExternPointAnalyzor};
