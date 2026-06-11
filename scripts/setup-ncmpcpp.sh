#!/bin/bash
# ============================================
# ncmpcpp Now Playing Sync - Setup Script
# ============================================
# This script sets up the ncmpcpp sync for Termux

echo "🎵 Setting up ncmpcpp Now Playing Sync..."

# Check if required packages are installed
echo "Checking dependencies..."

if ! command -v mpc &> /dev/null; then
    echo "❌ mpc not found. Installing..."
    pkg install mpd mpc -y
fi

if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg not found. Installing..."
    pkg install ffmpeg -y
fi

if ! command -v python &> /dev/null; then
    echo "❌ python not found. Installing..."
    pkg install python -y
fi

if ! command -v pip &> /dev/null; then
    echo "❌ pip not found. Installing..."
    pkg install python-pip -y
fi

# Install requests library
echo "Installing Python dependencies..."
pip install requests

# Make the sync script executable
chmod +x scripts/ncmpcpp-sync.py

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Usage:"
echo "  1. Start MPD: mpd"
echo "  2. Start ncmpcpp: ncmpcpp"
echo "  3. Run sync script: python scripts/ncmpcpp-sync.py"
echo ""
echo "💡 Tip: Add to your ~/.bashrc or ~/.zshrc:"
echo "  alias ncmpcpp='python ~/aguita.site/scripts/ncmpcpp-sync.py & ncmpcpp'"
echo ""
echo "🌐 Your music will now appear on your website in real-time!"
