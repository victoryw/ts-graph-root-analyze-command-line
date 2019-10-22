import * as program from 'commander'
import { PlsqlUseCaseExternPointAnalyzor } from './services/analyze-plsql-use-case-extern-point'

program.command('analyze').
  option('-l, --url <dependency service root>', 'dependency service root').
  action(async (options: AnalyzeOption) => {
    console.log(options.url)
    const service = new PlsqlUseCaseExternPointAnalyzor();
    const result = await service.justDo(options.url);
    console.log(result);
  })

program.parse(process.argv);

class AnalyzeOption {
  public url: string
}