describe('Message Routes', () => {
  it('should send a message in a chat on POST /send', async () => {
    const res = await request(app)
      .post('/send')
      .send({
        chatId: 'someChatId',
        senderId: 'someSenderId',
        message: 'Hello, World!',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Message sent successfully');
  });

  it('should fetch messages for a chat on GET /messages/:chatId', async () => {
    const chatId = 'someChatId';
    const res = await request(app)
      .get(`/messages/${chatId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('messages');
    expect(Array.isArray(res.body.messages)).toBe(true);
  });
});

describe('Chat Group Routes', () => {
  it('should create a new chat group on POST /create-group', async () => {
    const res = await request(app)
      .post('/create-group')
      .send({
        participants: ['userId1', 'userId2'],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('groupName');
  });

  it('should allow a user to leave a chat group on POST /leave-group/:groupId', async () => {
    const groupId = 'someGroupId';
    const res = await request(app)
      .post(`/leave-group/${groupId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Left group successfully');
  });
});