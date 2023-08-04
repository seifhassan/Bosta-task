const  {loginReq ,signUpReq} =require("./userSchema/userReq")
const  {logOutRes ,logInRes,signUpRes} = require("./userSchema/userRes")
const  {createCheckReq ,checkReports} = require("./checkSchema/checkReq")
const {createCheckRes ,delteCheck ,checkRepoetRes,GetByTag,getCheckRes} = require("./checkSchema/checkRes")
const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "URL checks", 
    version: "1.0.0",
    description: "RESTful API server that allows authenticated users to monitor URLs", 
  },
  paths: {
    
    "/check": {
      post: {
        summary: "Create a new check",
        tags: ["check"],
        parameters: [
          {
            in: "cookie",
            name: "jwt", // This is the name of the cookie parameter
            schema: {
              type: "string",
            },
            required: true, // Set this to true to make it required in the request
            description: "JWT token in cookie",
          },
        ],
        requestBody: {
          required: true,
          content: createCheckReq
        },
        responses: {
          201: {
            description: "Success",
            content: {
              "application/json": {
                schema: createCheckRes
              },
            },
          },
        },
      },
      get: {
        summary: "Get all checks",
        tags: ["check"],
        parameters: [
          {
            in: "cookie",
            name: "jwt", // This is the name of the cookie parameter
            schema: {
              type: "string",
            },
            required: true, // Set this to true to make it required in the request
            description: "JWT token in cookie",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: getCheckRes
              },
            },
          },
        },
      },
    },
    "/check/{id}": {
      delete: {
        summary: "Delete a check by ID",
        tags: ["check"],

        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            schema: {
              type: "string",
            },
          },
            {
            in: "cookie",
            name: "jwt", // This is the name of the cookie parameter
            schema: {
              type: "string",
            },
            required: true, // Set this to true to make it required in the request
            description: "JWT token in cookie",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: delteCheck
              },
            },
          },
        },
      },
    },
    "/check/reports": {
      get: {
        summary: "Get reports for a check by URL",
        tags: ["check"],
        parameters: [
          {
            in: "cookie",
            name: "jwt", // This is the name of the cookie parameter
            schema: {
              type: "string",
            },
            required: true, // Set this to true to make it required in the request
            description: "JWT token in cookie",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: checkReports
            },
          },
        },
        responses: {
          201: {
            description: "Success",
            content: {
              "application/json": {
                schema: checkRepoetRes
              },
            },
          },
        },
      },
      },
  
    "/check/tags/{tag}": {
      get: {
        summary: "Get reports for checks with a specific tag",
        tags: ["check"],
        parameters: [
          {
            in: "cookie",
            name: "jwt", // This is the name of the cookie parameter
            schema: {
              type: "string",
            },
            required: true, // Set this to true to make it required in the request
            description: "JWT token in cookie",
          },
        ],
        parameters: [
          {
            in: "path",
            name: "tag",
            required: true,
            schema: {
              type: "string",
            },
            description:
              "The tag used to filter the checks and retrieve the reports",
          },
        ],
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: GetByTag
              },
            },
          },
        },
      },
    },
    "/user/signup": {
        "post": {
          "summary": "Sign up a user",
          tags: ["user"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": signUpReq
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": signUpRes
                }
              }
            }
          }
        }
      },
      "/user/login": {
        "post": {
          "summary": "Log in a user",
          tags: ["user"],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": loginReq 
              }
            }
          },
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": logInRes
                }
              }
            }
          }
        }
      },
      "/user/logout": {
        "get": {
          "summary": "Log out a user",
          tags: ["user"],
          parameters: [
            {
              in: "cookie",
              name: "jwt", // This is the name of the cookie parameter
              schema: {
                type: "string",
              },
              required: true, // Set this to true to make it required in the request
              description: "JWT token in cookie",
            },
          ],
          "responses": {
            "200": {
              "description": "Success",
              "content": {
                "application/json": {
                  "schema": logOutRes
                }
              }
            }
          }
        }
    
      }
    },
    
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerOptions;
