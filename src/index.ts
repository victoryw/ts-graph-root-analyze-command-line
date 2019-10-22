import * as program from 'commander'

program.command('analyze').action(() => {
  console.log(1);
})

program.parse(process.argv);