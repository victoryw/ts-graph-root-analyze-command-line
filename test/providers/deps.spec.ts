import * as nock from "nock";
import {Deps, PlsqlName} from "../../src/providers/deps";
import * as should from 'should';

describe('call api deps server to fetchOfSqls the java deps of plsql', ()=> {
    const serverUrl = "http://localhost:8001";
    const plsqlName1 = new PlsqlName("pkg1", "method1");
    const plsqlName2 = new PlsqlName("pkg2", "method2");

    beforeEach(async() => {
        nock.disableNetConnect()
    });

    it('should fetch deps from api server', async () => {
        nock(serverUrl).get(`/plsql/${plsqlName1.pkg}/${plsqlName1.method}/callers`).reply(
            200, {nodes: [{id:1, title:1}] });
        const sqlDeps = await Deps.fetchOfSqls(serverUrl, [plsqlName1]);
        should(sqlDeps[0].isSuccess).be.equal(true);
        should(sqlDeps[0].Deps.nodes[0].id).be.equal(1);
        should(sqlDeps[0].Deps.nodes[0].title).be.equal(1);
        should(sqlDeps[0].plSql.pkg).be.equal('pkg1');
        should(sqlDeps[0].plSql.method).be.equal('method1');
    });

    it('should fetch all deps of plsql collection', async() => {
        nock(serverUrl)
            .get(`/plsql/${plsqlName1.pkg}/${plsqlName1.method}/callers`)
            .reply(200, {nodes: [{id:'1', title:'1'}, {id:'2', title:'2'}], edges: [{a: "2", b:"1"}]});

        nock(serverUrl)
            .get(`/plsql/${plsqlName2.pkg}/${plsqlName2.method}/callers`)
            .reply(200, {nodes: [{id:'1', title:'1'}, {id:'2', title: '2'}], edges: [{a: "2", b:"1"}] });

        const sqlDeps = await Deps.fetchOfSqls(serverUrl, [plsqlName1, plsqlName2]);
        should(sqlDeps[0].isSuccess).be.equal(true);
        should(sqlDeps[0].Deps.nodes[0].id).be.equal('1');
        should(sqlDeps[0].Deps.nodes[0].title).be.equal('1');
        should(sqlDeps[0].Deps.nodes[1].id).be.equal('2');
        should(sqlDeps[0].Deps.nodes[1].title).be.equal('2');
        should(sqlDeps[0].Deps.edges[0].a).be.equal('2');
        should(sqlDeps[0].Deps.edges[0].b).be.equal('1');
        should(sqlDeps[0].plSql.pkg).be.equal('pkg1');
        should(sqlDeps[0].plSql.method).be.equal('method1');

        should(sqlDeps[1].isSuccess).be.equal(true);
        should(sqlDeps[1].Deps.nodes[0].id).be.equal('1');
        should(sqlDeps[1].Deps.nodes[0].title).be.equal('1');
        should(sqlDeps[1].Deps.nodes[1].id).be.equal('2');
        should(sqlDeps[1].Deps.nodes[1].title).be.equal('2');
        should(sqlDeps[1].Deps.edges[0].a).be.equal('2');
        should(sqlDeps[1].Deps.edges[0].b).be.equal('1');
        should(sqlDeps[1].plSql.pkg).be.equal('pkg2');
        should(sqlDeps[1].plSql.method).be.equal('method2');
    });

    it('should fetch deps failed when api down', async () => {
        nock(serverUrl).get(`/plsql/${plsqlName1.pkg}/${plsqlName1.method}/callers`).reply(
            500, 'Server error');
        const sqlDeps = await Deps.fetchOfSqls(serverUrl, [plsqlName1]);
        should(sqlDeps[0].isSuccess).be.equal(false);
        should(sqlDeps[0].Deps).be.null();
    });




    afterEach(async () => {
        nock.cleanAll();
        nock.enableNetConnect();
    })
});