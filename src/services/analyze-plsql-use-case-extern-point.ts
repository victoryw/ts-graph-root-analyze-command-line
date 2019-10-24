import {Deps, PlsqlName,Node} from "../providers/deps";
import {GraphAnalyze} from "../providers/graph-analyze";

class PlsqlUseCaseExternPointAnalyzor {
  constructor() {
  }

  async justDo(ServerUrl: string, plsqls: PlsqlName[]): Promise<PlSqlRoot[]> {
    const deps = await Deps.fetchOfSqls(ServerUrl, plsqls);
    const rootH = deps.filter(dep => dep.isSuccess).map(dep => {
      const analyzer = new GraphAnalyze(dep.Deps);
      return analyzer.getRoots().map(root => {
        return {root: root, plsql: dep.plSql};
      });
    });

    return [].concat(...rootH).concat(deps.filter(dep => !dep.isSuccess).map(dep => { return {root: null, plsql: dep.plSql};}));

  }
}

export type PlSqlRoot = {root?: Node} & { plsql: PlsqlName };

export {PlsqlUseCaseExternPointAnalyzor};

