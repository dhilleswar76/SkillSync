# MERN Stack Setup Guide

This guide will help you set up the Student Portal MERN application from scratch.

## Prerequisites Installation

### 1. Node.js Installation

**Windows:**
1. Download the LTS version from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

**Mac:**
```bash
# Using Homebrew
brew install node

# Verify
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### 2. MongoDB Installation

#### Option A: Local MongoDB Installation

**Windows:**
1. Download MongoDB Community Server from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Choose "Complete" installation
4. Install MongoDB as a Service (recommended)
5. Install MongoDB Compass (GUI) if desired
6. Verify installation:
   ```cmd
   mongosh
   ```

**Mac:**
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB
brew services start mongodb-community@6.0

# Verify
mongosh
```

**Linux (Ubuntu):**
```bash
# Import MongoDB GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify
mongosh
```

#### Option B: MongoDB Atlas (Cloud - Recommended for Beginners)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (select Free Tier - M0)
4. Wait for cluster to be created (2-5 minutes)
5. Click "Connect"
6. Add your current IP address to the whitelist
   - Or add `0.0.0.0/0` for development (allows all IPs)
7. Create a database user with username and password
8. Choose "Connect your application"
9. Copy the connection string
10. Replace `<password>` with your database user password

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/student-portal?retryWrites=true&w=majority
```

### 3. Git Installation (Optional but Recommended)

**Windows:**
- Download from [git-scm.com](https://git-scm.com/download/win)
- Run the installer with default settings

**Mac:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

## Project Setup

### Step 1: Install Dependencies

```bash
# From the root directory
cd student-portal

# Install root dependencies (concurrently package)
npm install

# Install all dependencies (frontend + backend)
npm run install-all
```

### Step 2: Configure Backend

```bash
cd student-portal-backend

# Create .env file from example
cp .env.example .env

# Edit .env file with your settings
# Windows: notepad .env
# Mac/Linux: nano .env or vim .env
```

**Required .env settings:**

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/student-portal
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173
```

**If using MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/student-portal?retryWrites=true&w=majority
```

**Optional (for image uploads):**
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Configure Frontend

```bash
cd ../frontend

# Create .env file from example
cp .env.example .env

# Edit .env file
# Windows: notepad .env
# Mac/Linux: nano .env
```

**Required .env settings:**

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Seed the Database (Optional)

This creates sample data for testing:

```bash
cd ../student-portal-backend
npm run seed
```

This creates:
- Admin account (admin@example.com / admin123)
- Student account (student@example.com / student123)
- Sample courses with lessons
- Sample quizzes

### Step 5: Run the Application

#### Option A: Run Both Frontend and Backend Together (Recommended)

```bash
# From the root directory
cd student-portal
npm run dev
```

#### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
cd student-portal-backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6: Access the Application

- **Frontend:** Open browser to `http://localhost:5173`
- **Backend API:** `http://localhost:5000/api`
- **API Documentation:** `http://localhost:5000/api-docs`

**Login with:**
- Email: `admin@example.com`
- Password: `admin123`

Or

- Email: `student@example.com`
- Password: `student123`

## Verification Checklist

- [ ] Node.js installed (v18+)
- [ ] MongoDB installed and running OR MongoDB Atlas configured
- [ ] All npm dependencies installed
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Database seeded with sample data
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can login to the application

## Common Issues and Solutions

### Issue: "Cannot connect to MongoDB"

**Solution:**
- If using local MongoDB, ensure it's running:
  ```bash
  # Windows (check service)
  services.msc
  # Look for MongoDB service
  
  # Mac
  brew services list
  
  # Linux
  sudo systemctl status mongod
  ```
- If using Atlas, verify:
  - Connection string is correct
  - Password doesn't contain special characters (use alphanumeric)
  - IP is whitelisted
  - Database user exists

### Issue: "Port 5000 already in use"

**Solution:**
```bash
# Change PORT in backend .env to 5001 or another free port
# Also update VITE_API_URL in frontend .env to match
```

Or kill the process:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: "ERR_CONNECTION_REFUSED" from frontend

**Solution:**
- Ensure backend is running
- Check VITE_API_URL in frontend .env matches backend URL
- Restart frontend dev server after changing .env

### Issue: "Module not found" errors

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use the convenience script from root
npm run install-all
```

### Issue: "JWT malformed" or authentication errors

**Solution:**
- Clear browser local storage
- Ensure JWT_SECRET is set in backend .env
- Re-login to get a fresh token

## Development Tips

1. **Auto-reload**: Both servers automatically reload on file changes
2. **API Testing**: Use Swagger docs at `http://localhost:5000/api-docs`
3. **Database GUI**: Use MongoDB Compass to view/edit data visually
4. **Browser DevTools**: Use React Developer Tools extension for debugging
5. **Logs**: Check terminal output for error messages

## Next Steps

- Explore the API documentation
- Try creating a course as admin
- Enroll in a course as student
- Customize the UI with Tailwind CSS
- Add new features or endpoints
- Deploy to production

## Need Help?

- Check the main README.md for detailed information
- Review the backend README for API details
- Check MongoDB connection in mongosh: `mongosh` then `show dbs`
- Verify environment variables are loaded: Add `console.log(process.env.MONGO_URI)` in server.js

Happy coding! 🚀
