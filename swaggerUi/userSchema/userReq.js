const loginReq = {
    "type": "object",
    "properties": {
      "email": {
        "type": "string"
      },
      "password": {
        "type": "string"
      }
    }
  }
  const signUpReq ={
    "type": "object",
    "properties": {
      "username": {
        "type": "string"
      },
      "email": {
        "type": "string"
      },
      "password": {
        "type": "string"
      }
    }
  }


  module.exports = {loginReq ,signUpReq };