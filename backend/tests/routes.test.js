import request from 'supertest';
import app from '../server.js'; // Assicurati che questo percorso sia corretto

describe('Auth Routes', () => {
  it('should create a new user on POST /signup', async () => {
    const res = await request(app)
      .post('/signup')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });

  it('should login a user on POST /login', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should logout a user on POST /logout', async () => {
    const res = await request(app)
      .post('/logout');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User logged out successfully');
  });
});

describe('Upload Routes', () => {
  it('should upload a file on POST /', async () => {
    const res = await request(app)
      .post('/')
      .attach('file', 'path/to/your/test/file.txt'); // Assicurati di avere questo file per il test
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'File uploaded successfully');
  });

  it('should download a file on GET /:filename', async () => {
    const filename = 'testfile.txt'; // Assicurati che questo file esista nel server
    const res = await request(app)
      .get(`/${filename}`);
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toEqual('application/octet-stream');
  });
});