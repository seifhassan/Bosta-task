const Joi = require("joi");

const checkValidator = {
  createCheck: {
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
      body: Joi.object().keys({
        name: Joi.string().required(),
        url: Joi.string().required(),
        protocol: Joi.string().valid('HTTP', 'HTTPS', 'TCP').required(),
        path: Joi.string(),
        port: Joi.number(),
        timeout: Joi.number().default(5000),
        interval: Joi.number().default(600000),
        threshold: Joi.number().default(1),
        httpHeaders: Joi.array().items(
          Joi.object({
            key: Joi.string().required(),
            value: Joi.string().required(),
          })
        ),
        assert: Joi.object({
          statusCode: Joi.number().required(),
        }),
        tags: Joi.array().items(Joi.string()),
        ignoreSSL: Joi.boolean().default(false),
    }),
  },
  getChecks: {
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
  },
  getCheckReportsByURL:{
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    body: Joi.object().keys({
      url: Joi.string().required(),
    }),
  },
  deleteCheckById:{
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    query: Joi.object().keys({
      id: Joi.string().required(),
    }),
  },
  getReportsByTag:{
    cookies: Joi.object().keys({
      jwt: Joi.string().required(),
    }),
    parms: Joi.object().keys({
      tag: Joi.string().required(),
    }),
  },
};


module.exports = {
  checkValidator,
};
