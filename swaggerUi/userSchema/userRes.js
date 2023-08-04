const logOutRes= {
    "type": "object",
    "properties": {
      "message": {
        "type": "string"
      }
    }
  }
  const logInRes ={
    "type": "object",
    "properties": {
      "message": {
        "type": "string"
      },
      "token": {
        "type": "string"
      }
    }
  }
 const signUpRes = {
    "type": "object",
    "properties": {
        "success": {
            "type": "boolean"
        },
        "data": {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "emailVerified": {
                    "type": "boolean"
                },
                "_id": {
                    "type": "string"
                }
            }
        }
    }
};


      module.exports = {logOutRes ,logInRes,signUpRes};