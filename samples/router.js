const parameters = require('..')
const { spawn } = require('child_process')
const util = require('util');

parameters({
  commands: {
    'list': {
      main: 'input',
      route: async function({params, stderr, stdout}){
        const ls = spawn('ls', ['-lh', ...params.input])
        ls.stderr.pipe(stderr)
        ls.stdout.pipe(stdout)
      }
    }
  }
}).route()
