const fetch = require('isomorphic-fetch');
const cron = require('node-cron');
const checkUrl =require('./updateCheck')

module.exports = function () {
    cron.schedule('* * * * *', checkUrl); // Runs every minute

  console.log('URL checker started.');
};