import {PlsqlName} from "../../src/providers/deps";
import {exportPlsqlRoot} from "../../src/exporters/export-plsql-root";
import should = require("should");

describe('when translate the plsql', () => {
    it('should translate plsqlRoot to confluence table', () => {
        const root = [
            {
                root: {id: 'id', title: 'title'},
                plsql: new PlsqlName('pkg', 'method')
            }];

        const formattedString = exportPlsqlRoot(root);
        const expectedString = `||plsql||method||\n|pkg.method|title|\n`;
        should(formattedString).be.equal(expectedString);
    });

    it('should return root title as default when dep no root', ()=> {
        const root = [
            {
                root: null,
                plsql: new PlsqlName('pkg', 'method')
            }];

        const formattedString = exportPlsqlRoot(root);
        const expectedString = `||plsql||method||\n|pkg.method||\n`;
        should(formattedString).be.equal(expectedString);
    })
});