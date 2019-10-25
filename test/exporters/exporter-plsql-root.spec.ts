import {PlsqlName} from "../../src/providers/deps";
import {exportPlsqlRoot} from "../../src/exporters/export-plsql-root";
import should = require("should");
import {RootWithUrl} from "../../src";

describe('when translate the plsql', () => {
    it('should translate plsqlRoot to confluence table', () => {
        const plsqlName = new PlsqlName('pkg', 'method');
        const root: RootWithUrl[] = [
            {
                plsql: plsqlName,
                root: {id: 'id', title: 'title'},
                visual: {
                    plsql: plsqlName.toString(),
                    root: 'id.title'
                }
            }];

        const formattedString = exportPlsqlRoot(root);
        const expectedString = `||plsql||method||sqlUrl||rootUrl||\n|pkg.method|title|pkg.method|id.title|\n`;
        should(formattedString).be.equal(expectedString);
    });

    it('should return root title as default when dep no root', ()=> {
        const plsqlName1 = new PlsqlName('pkg', 'method');
        const root = [
            {
                root: null,
                plsql: plsqlName1,
                visual: {
                    plsql: plsqlName1.toString(),
                    root: ''
                }
            }];

        const formattedString = exportPlsqlRoot(root);
        const expectedString = `||plsql||method||sqlUrl||rootUrl||\n|pkg.method||pkg.method||\n`;
        should(formattedString).be.equal(expectedString);
    })
});