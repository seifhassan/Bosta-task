const request = require('supertest');
const app = require('../app'); 



const createMockUser = () => {
    const uniqueId = Date.now(); // Use timestamp to ensure uniqueness
    const email = `test-${uniqueId}@example.com`;
    const username = `testuser-${uniqueId}`;
  
    return {
      email,
      password: "abcdefg12", 
      username,
    };
  };


describe('User Routes', () => {
    let jwtToken;
    let signInResponce;
  it('should signup a new user', async () => {
    const userData = createMockUser();
    const response = await request(app)
      .post('/user/signup')
      .send(userData)
      .expect(200); 
      signInResponce = response.body.data;
  });
  it('should fail to signup with invalid data', async () => {
    const invalidUserData = {
     
    };
    const response = await request(app)
      .post('/user/signup')
      .send(invalidUserData)
      .expect(400); 
  });

  it('should verify user email', async () => {
    const verificationData = { id: signInResponce._id };
    const response = await request(app)
      .get('/user/verify')
      .query(verificationData)
      .expect(200); 
  });

  it('should fail to verify email with missing verification id', async () => {
    const response = await request(app)
      .get('/user/verify')
      .expect(400); 
  });

  it('should login a user', async () => {
   const loginReqBody = {
    email: signInResponce.email,
    password: 'abcdefg12',
  }
    const response = await request(app)
      .post('/user/login')
      .send(loginReqBody)
      .expect(200); 

      jwtToken = response.body.token;
  });

  it('should fail to login with invalid data', async () => {
    const invalidLoginData = {
      // Provide invalid data here (e.g., missing required fields or wrong password)
    };
    const response = await request(app)
      .post('/user/login')
      .send(invalidLoginData)
      .expect(400); // Assuming 400 is the expected status code for validation errors or authentication failure
    // Add assertions to check the response body or other relevant data
  });

  it('should logout a user with the stored JWT token as a cookie', async () => {
    
    //expect(jwtToken).toBeDefined();

    const response = await request(app)
      .get('/user/logout')
      .set('Cookie', [`jwt=${jwtToken}`])
      .expect(200);

  });

  it('should fail to logout without a valid jwt cookie', async () => {
    const response = await request(app)
      .get('/user/logout')
      .expect(400); // Assuming 400 is the expected status code for validation errors or authentication failure
    // Add assertions to check the response body or other relevant data
  });
});
