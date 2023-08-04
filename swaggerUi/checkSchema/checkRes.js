const checkSchema = {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            checkId: {
              type: "string",
            },
            url: {
              type: "string",
            },
            history: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                  },
                  responseTime: {
                    type: "number",
                  },
                },
              },
            },
          },
        },
      },
    },
  }
const createCheckRes = {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      data: checkSchema
    },
  }
  const getCheckRes = {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      data: {
        type: "array",
        items: checkSchema
      },
    },
  }
  const delteCheck = {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      message: {
        type: "string",
      },
    },
  }
  const checkRepoetRes =  {
    type: "object",
    properties: {
      success: {
        type: "boolean",
      },
      data: {
        type: "object",
        properties: {
          availability: { type: "number" },
          outages: { type: "number" },
          downtime: { type: "number" },
          uptime: { type: "number" },
          responseTime: { type: "number" },
          history: {
            type: "array",
            items: {
              type: "object",
              properties: {
                status: { type: "string" },
                responseTime: { type: "number" },
                _id: { type: "string" },
                timestamp: { type: "string", format: "date-time" },
              },
            },
          },
        },
      },
    },
  }
  const GetByTag =checkSchema
 
  module.exports = {createCheckRes ,delteCheck ,checkRepoetRes,GetByTag, getCheckRes};