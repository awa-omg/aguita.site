#!/usr/bin/env python3
"""
ncmpcpp Now Playing Sync for Supabase
Monitors ncmpcpp/MPD and syncs now playing data to Supabase in real-time
"""

import subprocess
import json
import base64
import os
import time
import sys
import requests
from pathlib import Path

# Supabase configuration
SUPABASE_URL = "https://fpnndflqpwgxbhjbtaas.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwbm5kZmxxcHdneGJoamJ0YWFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTEyNzE5OCwiZXhwIjoyMDk2NzAzMTk4fQ.R9phi-dj4L5ZLZk-sMitX1BGO5r3pjqT7wtnG8eVbS0"

def check_dependencies():
    """Check if required tools are available"""
    try:
        subprocess.run(["mpc", "--version"], capture_output=True, check=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Error: mpc not found. Please install mpd and mpc.")
        sys.exit(1)
    
    try:
        subprocess.run(["ffmpeg", "-version"], capture_output=True, check=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        print("Warning: ffmpeg not found. Cover art extraction will be disabled.")
        return False
    
    return True

def get_mpc_status():
    """Get current MPD status"""
    try:
        result = subprocess.run(
            ["mpc", "status", "-f", "%title%\n%artist%\n%album%\n%time%"],
            capture_output=True,
            text=True,
            timeout=5
        )
        
        if result.returncode != 0:
            return None
        
        lines = result.stdout.strip().split('\n')
        if len(lines) < 3:
            return None
        
        title = lines[0] if lines[0] else "Unknown"
        artist = lines[1] if len(lines) > 1 else "Unknown"
        album = lines[2] if len(lines) > 2 else None
        
        # Parse duration
        duration = None
        if len(lines) > 3 and lines[3]:
            try:
                time_parts = lines[3].split(':')
                if len(time_parts) == 2:
                    duration = int(time_parts[0]) * 60 + int(time_parts[1])
            except:
                pass
        
        # Get playing status
        status_result = subprocess.run(
            ["mpc", "status"],
            capture_output=True,
            text=True,
            timeout=5
        )
        
        is_playing = "[playing]" in status_result.stdout
        
        # Get current file path
        file_result = subprocess.run(
            ["mpc", "current", "-f", "%file%"],
            capture_output=True,
            text=True,
            timeout=5
        )
        file_path = file_result.stdout.strip()
        
        return {
            "title": title,
            "artist": artist,
            "album": album,
            "duration": duration,
            "is_playing": is_playing,
            "file_path": file_path
        }
    except Exception as e:
        print(f"Error getting MPC status: {e}")
        return None

def extract_cover(file_path):
    """Extract cover art from audio file using ffmpeg"""
    if not file_path:
        return None
    
    try:
        # Try to find the file in common music directories
        music_dirs = [
            os.path.expanduser("~/Music"),
            os.path.expanduser("~/music"),
            "/data/data/com.termux/files/home/Music",
            "/sdcard/Music",
        ]
        
        full_path = None
        for music_dir in music_dirs:
            test_path = os.path.join(music_dir, file_path)
            if os.path.exists(test_path):
                full_path = test_path
                break
        
        if not full_path:
            return None
        
        # Extract cover with ffmpeg
        cover_path = "/tmp/ncmpcpp_cover.jpg"
        subprocess.run(
            [
                "ffmpeg", "-i", full_path,
                "-an", "-vcodec", "copy",
                "-f", "image2", "-vframes", "1",
                cover_path, "-y"
            ],
            capture_output=True,
            timeout=10
        )
        
        if os.path.exists(cover_path):
            with open(cover_path, "rb") as f:
                return base64.b64encode(f.read()).decode("utf-8")
    except Exception as e:
        print(f"Error extracting cover: {e}")
    
    return None

def sync_to_supabase(data):
    """Sync now playing data to Supabase"""
    try:
        url = f"{SUPABASE_URL}/rest/v1/now_playing"
        headers = {
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "resolution=merge-duplicates"
        }
        
        # Upsert data
        response = requests.post(
            url,
            headers=headers,
            json=data,
            timeout=10
        )
        
        if response.status_code not in [200, 201, 204]:
            print(f"Error syncing to Supabase: {response.status_code} - {response.text}")
            return False
        
        return True
    except Exception as e:
        print(f"Error syncing to Supabase: {e}")
        return False

def main():
    print("ncmpcpp Now Playing Sync started...")
    print(f"Supabase URL: {SUPABASE_URL}")
    
    if not check_dependencies():
        print("Missing dependencies. Exiting.")
        sys.exit(1)
    
    print("Dependencies OK. Starting sync loop...")
    
    last_data = None
    
    while True:
        try:
            status = get_mpc_status()
            
            if status:
                cover = extract_cover(status.get("file_path"))
                
                data = {
                    "title": status["title"],
                    "artist": status["artist"],
                    "album": status.get("album"),
                    "duration": status.get("duration"),
                    "position": 0,
                    "cover_base64": cover,
                    "is_playing": status["is_playing"],
                    "listen_url": f"https://music.youtube.com/search?q={status['artist']}+{status['title']}",
                    "updated_at": "NOW()"
                }
                
                # Only sync if data changed
                if data != last_data:
                    if sync_to_supabase(data):
                        print(f"Synced: {status['artist']} - {status['title']}")
                        last_data = data
            
            time.sleep(1)
        
        except KeyboardInterrupt:
            print("\nStopping sync...")
            break
        except Exception as e:
            print(f"Error in main loop: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
