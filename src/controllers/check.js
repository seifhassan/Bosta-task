// checkService.js
const jwt = require('jsonwebtoken');
const { sendEmail, timeCalculation } = require('../utils');
const {
  getTokenFromRequest,
  getUserEmailFromRequest,
  getUserByEmail,
  getCheckByURLAndUserId,
  generateCheckReport,
} = require('./helperServices/checkHelper');
const Check = require('../models/Check');
const User = require('../models/User');

class CheckService {
  constructor() {
    this.createCheck = this.createCheck.bind(this);
    this.getChecks = this.getChecks.bind(this);
    this.getReportsByTag = this.getReportsByTag.bind(this);
    this.getCheckReportsByURL = this.getCheckReportsByURL.bind(this);
    this.deleteCheckById = this.deleteCheckById.bind(this);
  }

  async createCheck(req, res, next) {
    try {
      const token = getTokenFromRequest(req, next);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decodedToken.email;

      const user = await getUserByEmail(userEmail, next);

      const check = new Check({
        ...req.body,
        user_id: user.id,
        history: [
          {
            status: 'UP',
            responseTime: 0,
          },
        ],
      });

      await check.save();
      return res.status(201).json({ success: true, data: check });
    } catch (err) {
      return next({ message: err.message });
    }
  }

  async getChecks(req, res, next) {
    try {
      const token = getTokenFromRequest(req, next);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decodedToken.email;

      const user = await getUserByEmail(userEmail, next);

      const checks = await Check.find({ user_id: user.id });

      return res.status(200).json({ success: true, data: checks });
    } catch (err) {
      return next({ success: false, error: err.message });
    }
  }

  async getReportsByTag(req, res, next) {
    try {
      const { tag } = req.params;

      const token = getTokenFromRequest(req, next);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decodedToken.email;

      const user = await getUserByEmail(userEmail, next);

      const checks = await Check.find({ user_id: user.id, tags: tag });

      const reports = checks.map((check) => ({
        checkId: check._id,
        url: check.url,
        history: check.history,
      }));

      return res.status(200).json({ success: true, data: reports });
    } catch (err) {
      return next({ message: err.message });
    }
  }

  async getCheckReportsByURL(req, res, next) {
    try {
      const userEmail = getUserEmailFromRequest(req, next);
      const user = await getUserByEmail(userEmail, next);

      const check = await getCheckByURLAndUserId(req.body.url, user.id, next);
      if (!check) {
        return next({ message: 'Check not found' });
      }
      const reportData = generateCheckReport(check);
      return res.status(200).json({ success: true, data: reportData });
    } catch (err) {
      return next({ message: err.message });
    }
  }

  async deleteCheckById(req, res, next) {
    try {
      const token = getTokenFromRequest(req, next);
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decodedToken.email;

      const user = await getUserByEmail(userEmail, next);

      const check = await Check.findOneAndDelete({ _id: req.params.id, user_id: user.id });
      if (!check) {
        return next({ message: 'Check not found' });
      }

      return res.status(200).json({ success: true, message: 'Check deleted successfully' });
    } catch (err) {
      return next({ message: err.message });
    }
  }
}

const checkService = new CheckService();
module.exports = checkService;
