#!/bin/bash

echo "🗄️  Initializing PeopleOS database..."

# Check if database exists
if psql -lqt | cut -d \| -f 1 | grep -qw peopleos; then
    echo "✅ Database 'peopleos' already exists"
else
    echo "📦 Creating database 'peopleos'..."
    createdb peopleos || {
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

