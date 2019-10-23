import {Deps, PlsqlName} from "../providers/deps";

class PlsqlUseCaseExternPointAnalyzor {
  plsqls: PlsqlName[] = [];

  constructor() {
    this.plsqls.push(new PlsqlName("PKG_LIFE_WITHDRAW_BILL", "P_INSERT_BATCH_WITHDRAW_BILL"));
  }

  async justDo(ServerUrl: string): Promise<string[]> {
    const dep = await Deps.fetchOfSqls(ServerUrl, this.plsqls);
    return [];
  }
}


export {PlsqlUseCaseExternPointAnalyzor};

