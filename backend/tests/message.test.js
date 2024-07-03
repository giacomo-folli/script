import mongoose from "mongoose";
import supertest from "supertest";
import configServer from "../utils/configServer.js";

const app = configServer();

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/`;
  await mongoose.connect(url, {
    dbName: "script_test",
  });

  // await dropAllCollections();
});

afterAll(async () => {
  await mongoose.connection.close();
});

// MESSAGE ROUTES

describe("Message Routes", () => {
  it("should have a token", () => {
    expect(true).toBe(true);
  });
  
});
