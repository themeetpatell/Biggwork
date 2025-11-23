#!/bin/bash

echo "🚀 Deploying BiggWork..."

# Check Node.js version
node_version=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$node_version" -lt 20 ]; then
    echo "❌ Node.js 20+ required. Current version: $(node --version)"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd backend
npx prisma generate
cd ..

# Check if database exists
echo "🗄️  Checking database..."
if ! psql -lqt | cut -d \| -f 1 | grep -qw biggwork; then
    echo "⚠️  Database 'biggwork' not found. Creating..."
    createdb biggwork || {
        echo "❌ Failed to create database. Please create it manually:"
        echo "   createdb biggwork"
        exit 1
    }
fi

# Run migrations
echo "🔄 Running migrations..."
cd backend
npx prisma migrate deploy || npx prisma migrate dev --name init
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start development:"
echo "  npm run dev"
echo ""
echo "Or start separately:"
echo "  Terminal 1: cd backend && npm run dev"
echo "  Terminal 2: cd frontend && npm run dev"

