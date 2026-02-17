const request = require("supertest");
const app = require("../src/app");

describe("Auth API", () => {
  it("registers user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@test.com",
      password: "123456"
    });
    expect(res.body.token).toBeDefined();
  });
});
