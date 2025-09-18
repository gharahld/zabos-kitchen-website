#!/bin/bash

# Production Build Script for Zabo's Kitchen Website
# This script prepares the website for production deployment

echo "🚀 Starting production build for Zabo's Kitchen Website..."

# Set production environment
export NODE_ENV=production

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Install dependencies (ensure latest)
echo "📦 Installing dependencies..."
npm ci --only=production

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build for production
echo "🏗️ Building for production..."
npm run build

# Check build size
echo "📊 Build size analysis:"
du -sh dist/

# Verify build files
echo "✅ Verifying build files..."
if [ -d "dist" ]; then
    echo "✅ Build directory created successfully"
    ls -la dist/
else
    echo "❌ Build failed - no dist directory found"
    exit 1
fi

# Check for critical files
echo "🔍 Checking for critical files..."
required_files=("index.html" "assets")
for file in "${required_files[@]}"; do
    if [ -e "dist/$file" ]; then
        echo "✅ $file found"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo "🎉 Production build completed successfully!"
echo "📁 Build files are ready in the 'dist' directory"
echo "🌐 You can now deploy the 'dist' folder to your hosting service"

# Optional: Start preview server
read -p "Would you like to start the preview server? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting preview server..."
    npm run preview
fi


