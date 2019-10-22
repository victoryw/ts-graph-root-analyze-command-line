import * as rm from 'typed-rest-client/RestClient'
class PlsqlUseCaseExternPointAnalyzor {
  plsqls: PlsqlName[] = [];
  constructor() {
    this.plsqls.push(new PlsqlName("PKG_LIFE_WITHDRAW_BILL", "P_INSERT_BATCH_WITHDRAW_BILL"));
  }

  async justDo(ServerUrl: string): Promise<string[]> {
    let client = new rm.RestClient('aop', ServerUrl);


    const url = `/plsql/${this.plsqls[0].pkg}/${this.plsqls[0].method}/callers`;
    let rs = await client.get<Graph>(url);
    console.log(rs.result.nodes[0].id);
    return [];
  }
}

class PlsqlName {
  public readonly pkg: string;
  public readonly method: string;

  constructor(pkg: string, method: string) {
    this.pkg = pkg;
    this.method = method;
  }
}
interface Graph {
  nodes: Node[]
}

interface Node {
  id: string;
  title: string;
}

export { PlsqlUseCaseExternPointAnalyzor };

