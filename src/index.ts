#!/usr/bin/env ts-node

import * as program from 'commander'
import { PlsqlUseCaseExternPointAnalyzor } from './services/analyze-plsql-use-case-extern-point'
import {PlsqlName} from "./providers/deps";
import {exportPlsqlRoot} from "./exporters/export-plsql-root";

program.command('analyze').
  option('-l, --url <dependency service root>', 'dependency service root').
  action(async (options: AnalyzeOption) => {
    const service = new PlsqlUseCaseExternPointAnalyzor();
    const plsqls = [new PlsqlName('PKG_FI_ARAP_OFFSET','P_CANCEL_PREOFFSET'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INSERT_BATCH_WITHDRAW_BILL'),
      new PlsqlName('PKG_PAYMENT_DISTRIBUTE','P_WITHDRAW_BILL'),
      new PlsqlName('PKG_LIFE_NEWBIZ_APPRO_INC','P_APPROVAL_INSERT_SEND_BACK'),
      new PlsqlName('PKG_LIFE_PAY_PUB','P_WITHDRAW_BILL'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INS_OR_UPD_WD_BILL_CLAIM'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INS_OR_UPD_WD_BILL_CLAIM'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INS_OR_UPD_BILL_NEW_INSPECT'),
      new PlsqlName('PKG_LIFE_NEWBIZ_APPRO_GRP_INC','P_APPROVAL_RETURN_FEE_TRANSFER'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INSERT_WITHDRAW_BILL_BAT_ID'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INSERT_WITHDRAW_BILL_BAT'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INS_OR_UPD_WD_BILL_4_INSPECT'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INS_OR_UPD_BILL_NEW_INSPECT'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INS_OR_UPD_WD_INS_BILL'),
      new PlsqlName('PKG_LIFE_CLAIM_INSPECT','P_DEAL_INS_BILL_NO_CLMINFO'),
      new PlsqlName('PKG_LIFE_CLAIM_INSPECT','P_DEAL_INS_BILL_NO_CLMINFO'),
      new PlsqlName('PKG_PAYMENT_PUB_INCOME','P_CREATE_WITHDRAW_BILL'),
      new PlsqlName('PKG_LIFE_PS_ROLLBACK_INCOME','P_CANCEL_FEE'),
      new PlsqlName('PKG_LIFE_NEWBIZ_APPRO_GRP_INC','P_APPROVAL_INSERT_OVER_MANAGE'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INS_OR_UPD_WD_BILL_4_INSPECT'),
      new PlsqlName('PKG_LIFE_CLAIM_BATCH','P_INSERT_BATCH_WITHDRAW_BILL'),
      new PlsqlName('PKG_LIFE_WITHDRAW_BILL','P_INS_OR_UPD_WD_INS_BILL'),
      new PlsqlName('PKG_LIFE_CLAIM_ADVANCE_PAY','P_SAVE_ADVANCE_PAY'),
      new PlsqlName('PKG_LIFE_CUSTOMER_MERGE','P_CUSTOMER_MERGE'),
      new PlsqlName('PKG_LIFE_CLAIM_STD','P_VOTE_CLOSED_BATCH'),
      new PlsqlName('PKG_LIFE_NEWBIZ_SPECIAL_OPT','RETURNCARDPOLICYCASH'),
      new PlsqlName('PKG_LIFE_CLAIM_STD','P_VOTE_CLOSED_CASE'),
      new PlsqlName('PKG_FI_REFUND_PUB','P_CREATE_WITHDRAW_BILL'),
      new PlsqlName('PKG_LIFE_PAY_ONTIME','P_ONTIME_GENERATE_INSTALMENT')];
    const result = exportPlsqlRoot(await service.justDo(options.url, plsqls));
    console.log(result);
  });

program.parse(process.argv);

class AnalyzeOption {
  public url: string;
}
