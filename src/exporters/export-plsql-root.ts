import {oc} from "ts-optchain";
import {PlSqlRoot} from "../services/analyze-plsql-use-case-extern-point";
import {RootWithUrl} from "../index";

export const exportPlsqlRoot = (roots: RootWithUrl[]): string => {
    const changeSymbols = "\n";
    const headTitle = `||plsql||method||sqlUrl||rootUrl||${changeSymbols}`;
    const depsRoot = roots.map((root) => {
        return `|${root.plsql.toString()}|${oc(root).root.title("")}|${root.visual.plsql}|${root.visual.root}|${changeSymbols}`;
    });

    return headTitle.concat(...depsRoot);
};
