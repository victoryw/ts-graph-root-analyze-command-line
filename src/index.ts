#!/usr/bin/env ts-node

import * as program from 'commander'
import { PlsqlUseCaseExternPointAnalyzor } from './services/analyze-plsql-use-case-extern-point'
import {PlsqlName} from "./providers/deps";
import {exportPlsqlRoot} from "./exporters/export-plsql-root";

program.command('analyze').
  option('-l, --url <dependency service root>', 'dependency service root').
  action(async (options: AnalyzeOption) => {
    console.log(options.url)
    const service = new PlsqlUseCaseExternPointAnalyzor();
    const plsqls = [new PlsqlName("PKG_LIFE_WITHDRAW_BILL", "P_INSERT_BATCH_WITHDRAW_BILL")];
    const result = exportPlsqlRoot(await service.justDo(options.url, plsqls));
    console.log(result);
  });

program.parse(process.argv);

class AnalyzeOption {
  public url: string
}