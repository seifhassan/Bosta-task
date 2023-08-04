const createCheckReq={
    "application/json": {
      schema: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
          },
          url: {
            type: "string",
            required: true,
          },
          protocol: {
            type: "string",
            enum: ["HTTP", "HTTPS", "TCP"],
            required: true,
          },
          path: {
            type: "string",
          },
          port: {
            type: "number",
          },
          timeout: {
            type: "number",
            default: 5000,
          },
          interval: {
            type: "number",
            default: 600000,
          },
          threshold: {
            type: "number",
            default: 1,
          },
          httpHeaders: {
            type: "array",
            items: {
              type: "object",
              properties: {
                key: {
                  type: "string",
                },
                value: {
                  type: "string",
                },
              },
            },
          },
          assert: {
            type: "object",
            properties: {
              statusCode: {
                type: "number",
              },
            },
          },
          tags: {
            type: "array",
            items: {
              type: "string",
            },
          },
          ignoreSSL: {
            type: "boolean",
            default: false,
          },
        },
      },
    },
  }
 const checkReports = {
    type: "object",
    properties: {
      url: {
        type: "string",
        required: true,
      },
    },
  }

module.exports = {createCheckReq ,checkReports};
