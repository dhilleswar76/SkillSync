# Quick Start Guide

Get the Student Portal MERN application up and running in 5 minutes!

## Prerequisites

- ✅ Node.js 18+ installed
- ✅ MongoDB running OR MongoDB Atlas account
- ✅ Terminal/Command Prompt

## Quick Setup

### 1️⃣ Install All Dependencies

```bash
npm run install-all
```

### 2️⃣ Configure Backend

```bash
cd student-portal-backend
cp .env.example .env
```

Edit `.env` and set at minimum:
- `MONGO_URI` (your MongoDB connection string)
- `JWT_SECRET` (any random string for development)

### 3️⃣ Configure Frontend

```bash
cd ../frontend
cp .env.example .env
```

Default `.env` values should work (no changes needed for local development).

### 4️⃣ Seed Database (Optional)

```bash
cd ../student-portal-backend
npm run seed
```

### 5️⃣ Run the Application

```bash
cd ..
npm run dev
```

This starts both frontend and backend servers.

### 6️⃣ Access the Application

Open your browser to: **http://localhost:5173**

**Login:**
- Email: `admin@example.com`
- Password: `admin123`

## One-Liner Setup (if MongoDB is running)

```bash
npm run install-all && cd student-portal-backend && cp .env.example .env && npm run seed && cd .. && npm run dev
```

*(You'll still need to edit backend .env with your MONGO_URI)*

## Verify Everything Works

✅ Backend should start on `http://localhost:5000`  
✅ Frontend should open automatically at `http://localhost:5173`  
✅ You can login with the credentials above  
✅ API docs available at `http://localhost:5000/api-docs`  

## Having Issues?

See [SETUP.md](SETUP.md) for detailed installation instructions and troubleshooting.

## URLs Reference

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | React application |
| Backend API | http://localhost:5000/api | REST API endpoints |
| API Docs | http://localhost:5000/api-docs | Swagger documentation |
| MongoDB | mongodb://localhost:27017 | Database (if local) |

## Available Scripts

From root directory:

```bash
npm run dev              # Run both frontend & backend
npm run backend          # Run only backend
npm run frontend         # Run only frontend
npm run install-all      # Install all dependencies
npm run seed             # Seed database with sample data
```

## Default Accounts (after seeding)

**Admin:**
- Email: admin@example.com
- Password: admin123

**Student:**
- Email: student@example.com
- Password: student123

---

**Next Step:** Check out [README.md](README.md) for full documentation and features!
