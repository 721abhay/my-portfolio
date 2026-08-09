# Quick Start: Adding Your Content

## 🎓 Add a Certificate (2 minutes)

1. Save your certificate image in `public/certificates/`
2. Open `components/certificates-section.tsx`
3. Find line ~28 (the `certificates` array)
4. Replace the placeholder image path:
   ```typescript
   image: "/certificates/your-cert.png",  // Change this
   ```
5. Or add a new certificate by copying an existing entry

## 🚀 Add a Project (3 minutes)

1. Save your project image/video in `public/projects/`
2. Open `components/projects-showcase-section.tsx`
3. Find line ~42 (the `projects` array)
4. Replace the placeholder paths:
   ```typescript
   image: "/projects/your-project.png",
   video: "/projects/your-demo.mp4",      // Optional
   thumbnail: "/projects/your-thumb.png",
   ```
5. Or add a new project by copying an existing entry

## 📝 Update Project/Certificate Details

Just edit the text in the same object:
```typescript
{
  title: "Your Title Here",
  description: "Your description",
  date: "December 2024",
  // ... etc
}
```

## 🎬 Video Tips

- Format: MP4 (H.264 codec)
- Size: Keep under 10MB
- Duration: 30-90 seconds ideal
- Resolution: 1920x1080px

### Compress a video:
```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M output.mp4
```

## 🎨 Customization

### Change section colors:
Edit the gradient classes in the components:
- `bg-gradient-to-r from-primary via-secondary to-primary`

### Change number of columns:
- Certificates: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Projects: `grid-cols-1 lg:grid-cols-2`

### Hide a section:
Comment out in `app/page.tsx`:
```typescript
// <CertificatesSection />
```

## 🔍 Testing

1. Run: `npm run dev`
2. Open: http://localhost:3000
3. Scroll to your new sections
4. Click on items to test modals
5. Test video playback (if added)

## 📚 Full Documentation

- **PORTFOLIO_UPDATE_SUMMARY.md** - Complete overview
- **HOW_TO_ADD_CONTENT.md** - Detailed guide
- **public/certificates/README.md** - Certificate instructions
- **public/projects/README.md** - Project media instructions

## 🆘 Common Issues

**Images not showing?**
- Check file path (case-sensitive!)
- Ensure file is in `public/` folder
- Restart dev server

**Videos not playing?**
- Use MP4 format
- Check file size (under 10MB)
- Verify codec (H.264)

**Layout broken?**
- Clear browser cache (Ctrl+Shift+R)
- Check console for errors (F12)
- Restart dev server

---

**That's it!** Your portfolio is ready to showcase your certificates and projects! 🎉
