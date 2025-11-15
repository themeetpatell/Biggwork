#!/bin/bash

echo "🚀 Setting up PeopleOS for local development..."

# Check if PostgreSQL is running
if ! pg_isready -q; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    exit 1
fi

# Check if Redis is running
if ! redis-cli ping > /dev/null 2>&1; then
    echo "⚠️  Redis is not running. Starting Redis..."
    # Try to start Redis (adjust based on your setup)
    redis-server --daemonize yes 2>/dev/null || echo "⚠️  Could not start Redis automatically. Please start Redis manually."
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd ../backend
npx prisma generate

# Run database migrations
echo "🗄️  Setting up database..."
echo "Note: If database doesn't exist, create it first:"
echo "  createdb peopleos"
echo ""
read -p "Press enter to continue with migration (or Ctrl+C to cancel)..."
npx prisma migrate dev --name init

echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "  Terminal 1: cd backend && npm run dev"
echo "  Terminal 2: cd frontend && npm run dev"
echo ""
echo "Or use: npm run dev (from root)"

