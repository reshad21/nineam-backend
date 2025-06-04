# MERN Stack Authentication App with Shop Management

A full-stack MERN application featuring user authentication, shop management, and dynamic subdomain handling.

## Features

### 🔐 Authentication
- **Signup**: Username, password validation, and shop creation
- **Signin**: Login with "Remember Me" option (30 min vs 7 days)
- **Password Requirements**: 8+ characters, 1 number, 1 special character
- **JWT Token Management**: Secure token storage and verification

### 🏪 Shop Management
- **Shop Creation**: Users must create 3+ shops during signup
- **Global Shop Names**: Unique shop names across all users
- **Shop Dashboard**: Individual pages for each shop
- **Dynamic Subdomains**: Access shops via `shopname.localhost:5173`

### 🌐 Cross-Subdomain Authentication
- **Persistent Sessions**: Authentication works across all subdomains
- **Token Verification**: Automatic token validation on subdomain access
- **Loading States**: Spinner while verifying authentication

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications

## Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

### 1. Clone Repository
\`\`\`bash
git clone <your-repo-url>
cd mern-auth-app
\`\`\`

### 2. Install Dependencies
\`\`\`bash
# Install root dependencies
npm install

# Install all dependencies (root, server, client)
npm run install-all
\`\`\`

### 3. Environment Setup
Create `server/.env` file:
\`\`\`env
MONGODB_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
\`\`\`

### 4. Start Development Servers
\`\`\`bash
# Start both backend and frontend
npm run dev

# Or start individually
npm run server  # Backend only
npm run client  # Frontend only
\`\`\`

### 5. Access Application
- **Main App**: http://localhost:5173
- **Shop Subdomains**: http://shopname.localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - User login
- `GET /api/auth/verify` - Verify JWT token

### Shops
- `GET /api/shops/:shopName` - Get shop information

## Usage Guide

### 1. Create Account
1. Navigate to signup page
2. Enter username and password
3. Add at least 3 unique shop names
4. Submit form to create account

### 2. Sign In
1. Enter username and password
2. Check "Remember Me" for 7-day session
3. Login redirects to dashboard

### 3. Access Shops
1. Click profile icon on dashboard
2. Select shop from dropdown
3. Opens shop in new tab with subdomain URL
4. Authentication persists across subdomains

## Project Structure

\`\`\`
mern-auth-app/
├── server/                 # Backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   └── server.js          # Express server
├── client/                # Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   └── App.jsx        # Main app component
│   └── index.html
└── package.json           # Root package.json
\`\`\`

## Key Features Implementation

### Password Validation
- Minimum 8 characters
- At least 1 number
- At least 1 special character
- Implemented with regex: `/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/`

### Shop Name Uniqueness
- Global validation across all users
- Case-insensitive storage
- Prevents duplicate shop names

### Session Management
- **Regular Login**: 30-minute expiry
- **Remember Me**: 7-day expiry
- JWT tokens with configurable expiration

### Subdomain Handling
- Dynamic subdomain detection
- Cross-subdomain authentication
- Automatic token verification

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure token generation and verification
- **Input Validation**: Server-side validation with express-validator
- **CORS Configuration**: Subdomain-aware CORS setup
- **Protected Routes**: Authentication middleware

## Development Notes

### Subdomain Testing
To test subdomains locally:
1. Ensure your app runs on `localhost:5173`
2. Access shops via `shopname.localhost:5173`
3. Browser treats these as separate domains

### Database Schema
\`\`\`javascript
// User Schema
{
  username: String (unique),
  password: String (hashed),
  shops: [String],
  timestamps: true
}

// Shop Schema
{
  name: String (unique, lowercase),
  owner: ObjectId (ref: User),
  timestamps: true
}
\`\`\`

## Deployment Considerations

### Backend Deployment
- Set environment variables
- Configure MongoDB connection
- Update CORS settings for production domains

### Frontend Deployment
- Update API URLs for production
- Configure subdomain handling for production domain
- Set up DNS for wildcard subdomains

## Troubleshooting

### Common Issues
1. **Subdomain not working**: Ensure using `localhost` not `127.0.0.1`
2. **CORS errors**: Check CORS configuration in server
3. **Token issues**: Verify JWT secret and expiration
4. **MongoDB connection**: Check connection string and database status

### Debug Tips
- Check browser console for errors
- Monitor network requests in DevTools
- Verify JWT tokens at jwt.io
- Check MongoDB collections for data

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## License

This project is licensed under the MIT License.
