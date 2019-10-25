#!/usr/bin/env ts-node

import * as program from "commander";
import {exportPlsqlRoot} from "./exporters/export-plsql-root";
import {getClass, getMethod, PlsqlName} from "./providers/deps";
import {PlSqlRoot, PlsqlUseCaseExternPointAnalyzor} from "./services/analyze-plsql-use-case-extern-point";

program.command("analyze")
    .option("-l, --url <dependency service root>", "dependency service root")
    .option("-v, --visual <dependency visual root>", "dependency visual root")
    .action(async (options: AnalyzeOption) => {
        const service = new PlsqlUseCaseExternPointAnalyzor();
        const plsqls = [];
        const ignoreJavaMethodNames = [''];
        const roots = await service.justDo(options.url, plsqls, ignoreJavaMethodNames);
        const result = exportPlsqlRoot(attachToUrl(options.visual, roots));

        console.log(result);
    });

program.parse(process.argv);

class AnalyzeOption {
    public url: string;
    public visual: string;
}

export type RootWithUrl = PlSqlRoot & { visual: { plsql: string; root: string } }

function attachToUrl(visualUrl: string, plsqlRoots: PlSqlRoot[]): RootWithUrl[] {
    return plsqlRoots.map(root => {
        return {
            plsql: root.plsql,
            root: root.root,
            visual: {
                plsql: `${visualUrl}/plsql/${root.plsql.pkg}/${root.plsql.method}/callers`,
                root: root.root ?
                    `${visualUrl}/method/${getClass(root.root)}/${getMethod(root.root)}/invokes` :
                    ''
            }
        }
    });
}

