import supertest from "supertest";
import User from "../models/user.model";

/**
 *
 * @param {Express} app to test
 * @returns the auth token
 */
export const extractToken = async (app) => {
  let res;
  const user = await User.findOne({ username: "anna" });
  if (user) {
    res = await supertest(app).post("/api/auth/login").send({
      username: "anna",
      password: user.password,
    });
  } else {
    res = await supertest(app).post("/api/auth/signup").send({
      fullName: "anna",
      username: "anna",
      password: "password",
      confirmPassword: "password",
      gender: "male",
    });
  }

  const token = res.get("Set-Cookie");
  console.log("Token:", token);
  if (token && token.length > 0) return token[0]?.split(";")[0].slice(4);
  else throw new Error("No token found");
};
