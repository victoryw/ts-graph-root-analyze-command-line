import * as assert from "assert";
import {Deps, Edge, isEmptyEdge, Node, PlsqlName} from "../providers/deps";
import {GraphAnalyze} from "../providers/graph-analyze";

import * as _ from "lodash";
import {oc} from "ts-optchain";

class PlsqlUseCaseExternPointAnalyzor {
    private static checkNoLossPlSql(allSqlRoots, adjustPlsqls) {
        const keys = _.chain(allSqlRoots)
            .groupBy((root) => root.plsql.toString())
            .map((value, key) => key)
            .value();
        assert.strictEqual(keys.length, adjustPlsqls.length);
    }

    public async justDo(ServerUrl: string, plsqls: PlsqlName[]): Promise<PlSqlRoot[]> {

        const adjustPlSqls = _.uniqBy(plsqls, (item) => item.toString());
        const deps = await Deps.fetchOfSqls(ServerUrl, adjustPlSqls);
        
        const isSuccess = (dep) => dep.isSuccess && !isEmptyEdge(dep.Deps.edges);
        const apiSuccessDeps = deps.filter(isSuccess);
        const acpiFailureDeps = deps.filter((dep) => !isSuccess(dep));
        const rootH = apiSuccessDeps.map((dep) => {
            const analyzer = new GraphAnalyze(dep.Deps);
            return analyzer.getRoots().map((root) => {
                return {root, plsql: dep.plSql};
            });
        });

        const noRootItems = acpiFailureDeps.map((dep) => {
            return {root: null, plsql: dep.plSql};
        });

        const allSqlRoots = [].concat(...rootH).concat(noRootItems);

        PlsqlUseCaseExternPointAnalyzor.checkNoLossPlSql(allSqlRoots, adjustPlSqls);

        return allSqlRoots;
    }
}



export type PlSqlRoot = { root?: Node } & { plsql: PlsqlName };

export {PlsqlUseCaseExternPointAnalyzor};
