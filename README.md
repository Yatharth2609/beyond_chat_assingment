# BeyondChats - AI Chatbot Setup Platform

Here is my submission for Node Frontend Assingment for the role of Front End Web Developer at BeyondChats. All the details about the project has been explained below. The project is hosted on Vercel and can be accessed [here](https://beyond-chat-assingment.onrender.com/). The project is built using Next.js, Tailwind CSS, and TypeScript.

## 🚀 Features

### User Authentication
- Email/Password registration and login
- Google OAuth integration
- JWT-based authentication
- Protected routes with authentication middleware
- Session persistence

### Organization Setup
- Company profile creation
- Website URL validation
- Automatic meta-description fetching
- Multi-step setup wizard with progress tracking

### Website Scraping
- Automatic website content detection
- Real-time scraping status updates
- Page-by-page scraping progress
- Detailed content analysis display

### Chatbot Integration
- Multiple integration methods:
  - Direct code snippet
  - Email instructions to developer
- Live chatbot testing
- Integration status monitoring

### User Interface
- Modern, responsive design
- Animated transitions using Framer Motion
- Progress indicator for setup steps
- Interactive navigation
- Mobile-friendly layout
- Success celebration with confetti effects

## 🛠️ Technologies Used

### Frontend
- **Next.js 13** with App Router
- **React 18** with Server Components
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Canvas Confetti** for celebrations

### Backend
- **Next.js API Routes**
- **Prisma** as ORM
- **SQLite** database
- **JWT** for authentication
- **bcryptjs** for password hashing

### Authentication
- **@react-oauth/google** for Google Sign-In
- **jsonwebtoken** for JWT handling

## 🚀 Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm or yarn
- Google OAuth credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/beyondchats.git
cd beyondchats
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with:
```
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

## 🔒 Authentication Flow

1. **Registration**
   - User signs up with email/password or Google OAuth
   - Password is hashed using bcryptjs
   - JWT token is generated and stored in localStorage

2. **Sign In**
   - User credentials are verified
   - New JWT token is generated
   - User is redirected to setup wizard

3. **Protected Routes**
   - withAuth HOC checks for valid JWT
   - Unauthorized users are redirected to sign in
   - Step progress is tracked in localStorage

## 🧭 Setup Wizard Flow

1. **Registration** (Step 1)
   - User creates account
   - Email verification (optional)
   - Progress saved

2. **Organization Setup** (Step 2)
   - Company details
   - Website URL
   - Auto-fetch description

3. **Website Scraping** (Step 3)
   - Automatic content detection
   - Progress monitoring
   - Page analysis

4. **Chatbot Integration** (Step 4)
   - Integration method selection
   - Code snippet or email
   - Testing options

5. **Success** (Step 5)
   - Completion celebration
   - Social sharing options
   - Next steps guidance

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Animated transitions between steps
- Progress tracking with visual indicator
- Error handling with user feedback
- Loading states and animations
- Modern navbar with mobile menu
- Modal system for notifications

## 🔐 Security Features

- Password hashing
- JWT-based authentication
- Protected API routes
- Secure session management
- OAuth 2.0 integration
- Input validation and sanitization
