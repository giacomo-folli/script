import mongoose from "mongoose";
import supertest from "supertest";
import dropAllCollections from "./test-setup.js";
import configServer from "../utils/configServer.js";

const app = configServer();

let lucaUserToken;
let lucaChats, lucaAndAnnaChat;
let luca, anna;
beforeAll(async () => {
  const url = process.env.MONGO_DB_URI;
  await mongoose.connect(url, {
    dbName: "script_test",
  });

  await dropAllCollections();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Automatic Tests", () => {
  describe("Auth Routes", () => {
    it("should create a new user on POST /signup", async () => {
      const res = await supertest(app).post("/api/auth/signup").send({
        fullName: "anna",
        username: "anna",
        password: "password",
        confirmPassword: "password",
        gender: "female",
      });

      const res_1 = await supertest(app).post("/api/auth/signup").send({
        fullName: "luca",
        username: "luca",
        password: "password",
        confirmPassword: "password",
        gender: "male",
      });

      expect(res.statusCode).toEqual(201);
      expect(res_1.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      expect(res_1.body).toHaveProperty("_id");

      anna = res.body;
      luca = res_1.body;
    });

    it("should logout a user on POST /logout", async () => {
      const res = await supertest(app).post("/api/auth/logout");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Logged out succesfully!");
    });

    it("should login a user on POST /login", async () => {
      const res = await supertest(app).post("/api/auth/login").send({
        username: "luca",
        password: "password",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("_id");

      lucaUserToken = res.get("Set-Cookie")[0]?.split(";")[0].slice(4);
    });
  });

  describe("User Routes", () => {
    it("should get a list of users", async () => {
      const res = await supertest(app)
        .get("/api/users")
        .set("Cookie", `jwt=${lucaUserToken}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("should add a contact", async () => {
      const contactId = anna._id;
      const res = await supertest(app)
        .get(`/api/users/addContact/${contactId}`)
        .set("Cookie", `jwt=${lucaUserToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("contacts");
      expect(res.body.contacts[0]).toContain(anna._id);
    });

    it("should list user chats", async () => {
      const res = await supertest(app)
        .get("/api/users/contacts")
        .set("Cookie", `jwt=${lucaUserToken}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);

      lucaChats = res.body;
    });
  });

  describe("Message Routes", () => {
    it("should send a message", async () => {
      lucaAndAnnaChat = lucaChats.filter(
        (chat) =>
          chat.participants.some((p) => p._id === anna._id) &&
          chat.participants.some((p) => p._id === luca._id) &&
          chat.participants.length === 2
      )[0];

      const res = await supertest(app)
        .post(`/api/messages/send/${lucaAndAnnaChat?._id}`)
        .set("Cookie", `jwt=${lucaUserToken}`)
        .send({ message: "Hello, this is a test message!" });

      const res_1 = await supertest(app)
        .post(`/api/messages/send/${lucaAndAnnaChat?._id}`)
        .set("Cookie", `jwt=${lucaUserToken}`)
        .send({ message: "Hello, this is the second message!" });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty(
        "message",
        "Hello, this is a test message!"
      );
      expect(res_1.body).toHaveProperty(
        "message",
        "Hello, this is the second message!"
      );
    });

    it("should retrieve messages in a conversation", async () => {
      const res = await supertest(app)
        .get(`/api/messages/${lucaAndAnnaChat._id}`)
        .set("Cookie", `jwt=${lucaUserToken}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("Group Routes", () => {
    test("mock test", () => {
      expect(1).toBe(1);
    });

    // it("should create a new group", async () => {
    //   const res = await supertest(app)
    //     .post("/api/groups")
    //     .set("Cookie", `jwt=${userToken}`)
    //     .send({
    //       name: "Test Group",
    //       description: "A group created for testing purposes",
    //     });

    //   expect(res.statusCode).toEqual(201);
    //   expect(res.body).toHaveProperty("_id");
    //   expect(res.body.name).toEqual("Test Group");
    // });

    // it("should add a user to a group", async () => {
    //   const groupId = "groupId"; // Use an actual group ID from your database
    //   const userId = "userId"; // Use an actual user ID from your database
    //   const res = await supertest(app)
    //     .post(`/api/groups/${groupId}/addUser`)
    //     .set("Cookie", `jwt=${userToken}`)
    //     .send({ userId });

    //   expect(res.statusCode).toEqual(200);
    //   expect(res.body).toHaveProperty(
    //     "message",
    //     "User added to group successfully"
    //   );
    // });

    // it("should get a list of groups for a user", async () => {
    //   const res = await supertest(app)
    //     .get("/api/groups")
    //     .set("Cookie", `jwt=${userToken}`);

    //   expect(res.statusCode).toEqual(200);
    //   expect(Array.isArray(res.body)).toBe(true);
    // });
  });
});
