# How to Add Your Certificates and Projects

This guide will help you add your certificates and project media to your portfolio.

## 📁 Folder Structure

Create these folders in your `public` directory:

```
public/
├── certificates/          # Certificate images
│   ├── aws-cert.png
│   ├── fullstack-cert.png
│   └── ml-cert.png
│
└── projects/             # Project images and videos
    ├── autoapply-demo.mp4
    ├── autoapply-thumb.png
    ├── hand-game.png
    ├── hand-game-demo.mp4
    └── hand-game-thumb.png
```

## 🎓 Adding Certificates

1. **Prepare Your Certificate Images**
   - Save your certificate images as PNG or JPG
   - Recommended size: 1920x1080px or similar aspect ratio
   - Name them descriptively (e.g., `aws-certification.png`)

2. **Add to Public Folder**
   ```
   public/certificates/your-certificate-name.png
   ```

3. **Update the Component**
   - Open `components/certificates-section.tsx`
   - Find the `certificates` array (around line 28)
   - Add your certificate:

   ```typescript
   {
     id: "4",
     title: "Your Certificate Title",
     issuer: "Issuing Organization",
     date: "Month Year",
     description: "Brief description of what this certificate represents",
     image: "/certificates/your-certificate-name.png",
     credentialUrl: "https://verify-url.com", // Optional
     downloadUrl: "/certificates/your-certificate-name.pdf", // Optional
     skills: ["Skill 1", "Skill 2", "Skill 3"],
     featured: true, // Set to true for featured certificates
   }
   ```

## 🚀 Adding Projects

1. **Prepare Your Project Media**
   
   **For Images:**
   - Save project screenshots as PNG or JPG
   - Recommended size: 1920x1080px
   
   **For Videos:**
   - Save demo videos as MP4
   - Recommended: 1-2 minutes max, 1920x1080px
   - Keep file size under 10MB for better performance
   - Create a thumbnail image (screenshot from video)

2. **Add to Public Folder**
   ```
   public/projects/your-project-name.png
   public/projects/your-project-demo.mp4
   public/projects/your-project-thumb.png
   ```

3. **Update the Component**
   - Open `components/projects-showcase-section.tsx`
   - Find the `projects` array (around line 32)
   - Add your project:

   ```typescript
   {
     id: "5",
     title: "Your Project Name",
     category: "Full Stack", // Options: "Web App", "Mobile App", "Full Stack", "AI/ML", "Open Source"
     description: "Short one-line description",
     longDescription: "Detailed description of your project, its features, and what makes it special.",
     tags: ["React", "Node.js", "MongoDB"], // Technologies used
     
     // For image-only projects:
     image: "/projects/your-project-name.png",
     
     // For projects with video demos:
     video: "/projects/your-project-demo.mp4",
     thumbnail: "/projects/your-project-thumb.png",
     
     github: "https://github.com/yourusername/project",
     demo: "https://your-project-demo.com",
     date: "Month Year",
     team: "Solo Project", // Optional
     stars: 42, // Optional - GitHub stars
     featured: true, // Set to true for featured projects
     
     highlights: [ // Optional - key features
       "Feature 1",
       "Feature 2",
       "Feature 3",
       "Feature 4"
     ]
   }
   ```

## 🎨 Tips for Best Results

### For Certificates:
- Use high-resolution scans or screenshots
- Crop out unnecessary whitespace
- Ensure text is readable
- Consider adding a border or shadow in your image editor

### For Project Images:
- Use clean, professional screenshots
- Show the most impressive features
- Consider using mockups (laptop/phone frames)
- Ensure good contrast and readability

### For Project Videos:
- Keep it short and focused (30-90 seconds ideal)
- Show key features in action
- Add smooth transitions
- Consider adding background music (optional)
- Compress videos to reduce file size:
  ```bash
  # Using ffmpeg (install first)
  ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M output.mp4
  ```

## 📝 Example: Complete Project Entry

```typescript
{
  id: "coin-circle",
  title: "Coin Circle - Expense Tracker",
  category: "Full Stack",
  description: "Modern expense tracking with AI-powered insights and budget management",
  longDescription: "A comprehensive personal finance management tool that helps users track expenses, set budgets, and visualize spending patterns. Features include real-time expense tracking, category management, budget analytics with beautiful charts, and CSV export functionality.",
  tags: ["React", "Firebase", "Chart.js", "Tailwind CSS", "TypeScript"],
  image: "/projects/coin-circle.png",
  video: "/projects/coin-circle-demo.mp4",
  thumbnail: "/projects/coin-circle-thumb.png",
  github: "https://github.com/721abhay/coin-circle",
  demo: "https://coin-circle.vercel.app",
  date: "November 2024",
  stars: 32,
  featured: true,
  highlights: [
    "Real-time expense tracking with instant updates",
    "Smart budget analytics with visual charts",
    "Category management with custom icons",
    "Export data to CSV for external analysis"
  ]
}
```

## 🔄 After Adding Content

1. **Test locally:**
   ```bash
   npm run dev
   ```

2. **Navigate to your portfolio:**
   - Certificates section: Scroll to "Professional Certifications"
   - Projects section: Scroll to "Project Showcase"

3. **Check that:**
   - Images load correctly
   - Videos play smoothly
   - Links work
   - Modal popups function properly

## 🚨 Troubleshooting

**Images not showing?**
- Check file paths are correct (case-sensitive!)
- Ensure files are in the `public` folder
- Verify image format is supported (PNG, JPG, WEBP)

**Videos not playing?**
- Use MP4 format with H.264 codec
- Check file size (keep under 10MB)
- Test video plays in browser directly

**Layout issues?**
- Clear browser cache
- Restart dev server
- Check console for errors

## 📱 Need Help?

If you encounter any issues, check:
1. Browser console for errors (F12)
2. File paths and naming
3. Image/video formats and sizes

Happy showcasing! 🎉
