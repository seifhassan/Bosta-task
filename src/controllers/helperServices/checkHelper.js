const User = require('../../models/User');
const asyncWrapper = require('../../middleware');
const jwt = require('jsonwebtoken');
const Check = require('../../models/Check');


const { timeCalculation } = require('../../utils');
const getTokenFromRequest = (req, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return next({ message: 'No token provided' });
    }
    return token;
  };
  function createLogEntry(newStatus, newResponseTime) {
      return {
        status: newStatus,
        responseTime: newResponseTime,
      };
  } 
  const getUserEmailFromRequest = (req, next) => {
      const token = getTokenFromRequest(req, next);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken.email;
  };
  const getUserByEmail = async (email, next) => {
    const promise = User.findOne({ email });
    const [err, user] = await asyncWrapper(promise);
    if (err) {
        return next(err);
    }
    if (!user) {
        return next({ message: 'User not found' });
    }
    return user;
  };
    
  const getCheckByURLAndUserId = async (url, userId, next) => {
      return await Check.findOne({ url, user_id: userId }).exec();
    };
  function updateHistoryAndAvailability(check, newLogEntry) {
      const newHistory = [...check.history, newLogEntry];
      const downtime = timeCalculation.calculateDowntime(newHistory);
      const uptime = timeCalculation.calculateUptime(newHistory, downtime);
      const totalLogsNumber = newHistory.length;
      const totalLogsDownNumber = timeCalculation.countDownStatus(newHistory, downtime);
      const totalUpLogs = totalLogsNumber - totalLogsDownNumber
      const availability =(totalUpLogs / totalLogsNumber) * 100;
    
      return { newHistory, downtime, uptime, availability };
    }
  const generateCheckReport = (check) => {
      const totalLogsNumber = check.history.length;
      const downtime = timeCalculation.calculateDowntime(check.history);
      const outages = timeCalculation.countDownStatus(check.history, downtime);
      const totalUpLogs = totalLogsNumber - outages
      const availability =(totalUpLogs / totalLogsNumber) * 100;
      const uptime = timeCalculation.calculateUptime(check.history,downtime);
      const responseTime = timeCalculation.calculateAverageResponseTime(check.history);
    
      return {
        availability,
        outages,
        downtime,
        uptime,
        responseTime,
        history: check.history,
      };
    };
    module.exports = {
        getTokenFromRequest,
        createLogEntry,  
        getUserEmailFromRequest,
        getUserByEmail,
        getCheckByURLAndUserId,
        updateHistoryAndAvailability,
        generateCheckReport
    };