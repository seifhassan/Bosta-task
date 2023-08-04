const checkModel= require("../src/models/Check")
const User= require("../src/models/User")
const { timeCalculation ,sendEmail } = require('../src/utils');
const {
  createLogEntry, 
  updateHistoryAndAvailability,
}= require('../src/controllers/helperServices/checkHelper')
var checksMap = new Map();

async function checkUrl() {
    try {
      const { checksMap, allChecks } = await fetchChecks();
  
      for (const check of allChecks) {
        const startTime = Date.now();
        const response = await fetch(check.url);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        await updateCheck(check, response, responseTime, checksMap);
      }
    } catch (error) {
      console.log('Failed:', error.message);
    }
  }

async function fetchChecks() {
    const allChecks = await checkModel.find({});
    allChecks.forEach((check) => {
        const checkIdString = check._id.toString();
        if (!checksMap.has(checkIdString)) {
          checksMap.set(checkIdString, check);
        }
      });
  
    return { checksMap, allChecks };
  }
  async function updateCheck(check, response, responseTime, checksMap) {
    const checkIdString = check._id.toString();
    const CheckFromMap = checksMap.get(checkIdString);
    if (CheckFromMap.interval <= 60000) {
      if (response.ok && responseTime <= check.timeout) {
        updateCheckAndSentEmail(check, 'UP', responseTime,true);
        CheckFromMap.interval = check.interval;
        checksMap.set(checkIdString, CheckFromMap);
      } else {
        if(CheckFromMap.threshold == 1){
          updateCheckAndSentEmail(check, 'DOWN', responseTime,true);
         CheckFromMap.threshold=check.threshold
        }else{
          CheckFromMap.threshold=CheckFromMap.threshold -1 ;
          updateCheckAndSentEmail(check, 'DOWN', responseTime,false);
        }
      }
    } else {
      CheckFromMap.interval = CheckFromMap.interval - 60000;
      checksMap.set(checkIdString, CheckFromMap);
    }
  }
  async function updateCheckAndSentEmail(check, newStatus, newResponseTime,sendEmailStates) {
    try {
      const userDoc = await User.findOne({ _id: check.user_id });
  
     
      if (check.history.length === 0) {
        const newLogEntry = createLogEntry(newStatus, newResponseTime);
        check.history.push(newLogEntry);
      } else {
        const lastStatus = check.history[check.history.length - 1].status;
        const lastResponseTime = check.history[check.history.length - 1].responseTime;
        const newLogEntry = createLogEntry(newStatus, newResponseTime);
  
        const { newHistory, downtime, uptime, availability } = updateHistoryAndAvailability(check, newLogEntry);
        check.history = newHistory;
        check.downtime = downtime;
        check.uptime = uptime;
        check.availability = availability;
  
        
        check.responseTime = timeCalculation.calculateAverageResponseTime(newHistory, lastResponseTime);
        if(sendEmailStates == true){
          console.log('Sending email notification to :',userDoc.email);
          sendEmail.sendStatusChangeNotification(check, userDoc.email);
      }
      }
  
      await check.save();
    
  }catch (err) {
    console.log("err:",err);
  }
  }
  module.exports = checkUrl;
