#!/bin/bash

echo "🚀 Starting PeopleOS development servers..."

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "⚠️  backend/.env not found. Creating from template..."
    cat > backend/.env << EOF
PORT=3001
NODE_ENV=development
CORS_ORIGIN="http://localhost:3000"
JWT_SECRET=dev-secret-key-change-in-production
EOF
    echo "✅ Created backend/.env"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "⚠️  frontend/.env.local not found. Creating from template..."
    cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
    echo "✅ Created frontend/.env.local"
fi

# Check if dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Start backend and frontend concurrently
echo "Starting backend and frontend..."
npm run dev
