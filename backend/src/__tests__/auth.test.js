jest.mock("../models/User", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

jest.mock("../utils/generateToken", () => jest.fn(() => "test-token"));

const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Auth API", () => {
  it("registers user", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: "user-id-1",
      name: "Test",
      email: "test@test.com",
      phone: undefined,
      role: "student",
    });

    const res = await request(app).post("/api/auth/register").send({
      name: "Test",
      email: "test@test.com",
      password: "123456"
    });

    expect(res.status).toBe(201);
    expect(res.body.token).toBe("test-token");
  });

  it("rejects unsupported OAuth providers", async () => {
    const res = await request(app).post("/api/auth/oauth-login").send({
      provider: "twitter",
      email: "oauth@test.com",
      name: "OAuth Test",
      role: "student",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/provider must be google or github/i);
  });

  it("rejects admin OAuth logins", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app).post("/api/auth/oauth-login").send({
      provider: "google",
      email: "admin@test.com",
      name: "Admin Test",
      role: "admin",
    });

    expect(res.status).toBe(403);
    expect(res.body.message).toMatch(/admin accounts cannot be created through oauth login/i);
  });

  it("rejects malformed OAuth emails", async () => {
    const res = await request(app).post("/api/auth/oauth-login").send({
      provider: "github",
      email: "not-an-email",
      name: "OAuth Test",
      role: "student",
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/oauth email is invalid/i);
  });

  it("exposes the OAuth config endpoint", async () => {
    const res = await request(app).get("/api/auth/oauth-config");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("googleEnabled");
    expect(res.body).toHaveProperty("githubEnabled");
  });

  it("redirects Google OAuth callback with error when missing code", async () => {
    const res = await request(app).get("/api/auth/google/callback");
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/login\?error=/i);
  });

  it("redirects GitHub OAuth callback with error when missing code", async () => {
    const res = await request(app).get("/api/auth/github/callback");
    expect(res.status).toBe(302);
    expect(res.headers.location).toMatch(/login\?error=/i);
  });
});
