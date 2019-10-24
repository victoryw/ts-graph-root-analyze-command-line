import {oc} from "ts-optchain";
import {PlSqlRoot} from "../services/analyze-plsql-use-case-extern-point";

export const exportPlsqlRoot = (roots: PlSqlRoot[]): string => {
    const changeSymbols = "\n";
    const headTitle = `||plsql||method||${changeSymbols}`;
    const depsRoot = roots.map((root) => {
        return `|${root.plsql.toString()}|${oc(root).root.title("")}|${changeSymbols}`;
    });

    return headTitle.concat(...depsRoot);
};
