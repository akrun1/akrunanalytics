#!/bin/bash

# Start Netlify functions server in the background
echo "Starting Netlify functions server..."
npx netlify-lambda serve netlify/functions &
NETLIFY_PID=$!

# Give it a moment to start
sleep 2

# Start Vite dev server
echo "Starting Vite development server..."
npm run dev

# When Vite exits, kill the Netlify functions server
kill $NETLIFY_PID
