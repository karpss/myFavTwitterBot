/**
 * Cron job script from https://github.com/wahengchang/nodejs-cron-job-must-know/blob/master/cronNodeScript.js
 */
const cron = require('node-cron')

//exceute every 3 hours
cron.schedule('* * 3 * * *', function(){
  const shell = require('./child_helper');

  const commandList = [
    "node app.js",
    "npm run script"
  ]

  shell.series(commandList , function(err){
    //    console.log('executed many commands in a row');
    console.log('done')
  });
});