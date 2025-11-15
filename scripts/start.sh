#!/bin/bash

echo "🚀 Starting PeopleOS..."

# Kill any existing processes
lsof -ti:3000,3001 | xargs kill -9 2>/dev/null
sleep 1

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    echo "Creating backend/.env..."
    cat > backend/.env << EOF
PORT=3001
NODE_ENV=development
DATABASE_URL="postgresql://peopleos:peopleos@localhost:5432/peopleos?schema=public"
CORS_ORIGIN="http://localhost:3000"
EOF
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "Creating frontend/.env.local..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > frontend/.env.local
fi

# Start backend
echo "Starting backend on port 3001..."
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend
sleep 3

# Start frontend
echo "Starting frontend on port 3000..."
cd frontend
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ PeopleOS is starting..."
echo "📊 Backend PID: $BACKEND_PID"
echo "📊 Frontend PID: $FRONTEND_PID"
echo ""
echo "🌐 Access at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait

