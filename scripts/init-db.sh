#!/bin/bash

echo "🗄️  Initializing BiggWork database..."

# Check if database exists
if psql -lqt | cut -d \| -f 1 | grep -qw biggwork; then
    echo "✅ Database 'biggwork' already exists"
else
    echo "📦 Creating database 'biggwork'..."
    createdb biggwork || {
        echo "❌ Failed to create database. Make sure PostgreSQL is running and you have permissions."
        exit 1
    }
    echo "✅ Database created"
fi

# Run migrations
echo "🔄 Running migrations..."
cd backend
npx prisma migrate dev --name init

echo "✅ Database initialized!"

