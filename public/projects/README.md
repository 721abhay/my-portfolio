# Projects Media Folder

Add your project images and videos here.

## Naming Convention
- Images: `project-name.png` or `project-name.jpg`
- Videos: `project-name-demo.mp4`
- Thumbnails: `project-name-thumb.png`

## Current Projects Needed
Based on `components/projects-showcase-section.tsx`:

### Images
1. `autoapply-thumb.png` - AutoApply thumbnail
2. `hand-game.png` - Hand Tracking Game screenshot
3. `hand-game-thumb.png` - Hand Game thumbnail
4. `coin-circle.png` - Coin Circle screenshot
5. `db-backup.png` - Database Backup Utility screenshot

### Videos (Optional)
1. `autoapply-demo.mp4` - AutoApply demo video
2. `hand-game-demo.mp4` - Hand Game demo video

## Video Guidelines
- Format: MP4 (H.264 codec)
- Duration: 30-90 seconds ideal
- Resolution: 1920x1080px recommended
- File size: Keep under 10MB for performance

### Compress Videos
```bash
# Using ffmpeg
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M output.mp4
```

## Image Guidelines
- Format: PNG or JPG
- Resolution: 1920x1080px recommended
- Show your best features
- Use clean, professional screenshots

## How to Add
1. Save your media files in this folder
2. Update paths in `components/projects-showcase-section.tsx`
3. Restart dev server to see changes
