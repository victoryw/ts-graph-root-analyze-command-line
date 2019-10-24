import {PlsqlName} from "../../src/providers/deps";
import * as nock from "nock";
import {PlsqlUseCaseExternPointAnalyzor} from "../../src/services/analyze-plsql-use-case-extern-point";
import should = require("should");

describe('when query the analyze plsql extern point', ()=> {
    const serverUrl = 'http://localhost:8001';
    beforeEach(async() => {
        nock.disableNetConnect()
    });

    it('should return the roots by plsql name', async () => {
        const plsqlName = new PlsqlName("PKG1",
            "METHOD1");
        nock(serverUrl)
            .get(`/plsql/${plsqlName.pkg}/${plsqlName.method}/callers`)
            .reply(200, {nodes: [{id:'1', title:'1'}, {id:'2', title:'2'}], edges: [{a: "1", b:"2"}]});

        const service = new PlsqlUseCaseExternPointAnalyzor();
        const result = await service.justDo(serverUrl, [plsqlName]);
        should(result.length).be.equal(1);
        should(result[0].root.id).be.equal('1');
        should(result[0].root.title).be.equal('1');
        should(result[0].plsql.pkg).be.equal(plsqlName.pkg);
        should(result[0].plsql.method).be.equal(plsqlName.method);
    });

    afterEach(async () => {
        nock.cleanAll();
        nock.enableNetConnect();
    })
});