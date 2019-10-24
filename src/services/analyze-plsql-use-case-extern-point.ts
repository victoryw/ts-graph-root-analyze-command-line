import {Deps, PlsqlName,Node} from "../providers/deps";
import {GraphAnalyze} from "../providers/graph-analyze";

class PlsqlUseCaseExternPointAnalyzor {
  plsqls: PlsqlName[] = [];

  constructor() {
    this.plsqls.push(new PlsqlName("PKG_LIFE_WITHDRAW_BILL", "P_INSERT_BATCH_WITHDRAW_BILL"));
  }

  async justDo(ServerUrl: string, plsqls: PlsqlName[]): Promise<PlSqlRoot[]> {
    const deps = await Deps.fetchOfSqls(ServerUrl, this.plsqls);
    const rootH = deps.map(dep => {
      const analyzer = new GraphAnalyze(dep.Deps);
      return analyzer.getRoots().map(root => {
        return {root: root, plsql: dep.plSql};
      });
    });

    return [].concat(...rootH);

  }
}

export type PlSqlRoot = {root: Node} & { plsql: PlsqlName };

export {PlsqlUseCaseExternPointAnalyzor};

