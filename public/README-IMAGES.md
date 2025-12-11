# How to Add Images to Your Lashes by Brooke App

## 📸 Where to Put Your Images

All images should be placed in the `/public` folder. Here's the structure:

```
public/
├── hero.jpg                  # Main hero image on landing page
└── lashes/                   # Gallery images for each lash style
    ├── classic.jpg
    ├── hybrid.jpg
    ├── russian.jpg
    ├── mega.jpg
    └── wet.jpg
```

## 🖼️ Image Requirements

### Hero Image (`/public/hero.jpg`)
- **Recommended size**: 1080 x 1920px (portrait)
- **Format**: JPG or PNG
- **Subject**: Close-up of beautiful lashes or full face/eyes
- **Orientation**: Portrait/vertical
- **File size**: Keep under 500KB for fast loading

### Gallery/Lash Style Images (`/public/lashes/*.jpg`)
- **Recommended size**: 800 x 1200px (portrait) or 1:1.5 ratio
- **Format**: JPG or PNG
- **Subject**: Close-up of each specific lash style
- **Orientation**: Portrait/vertical
- **File size**: Keep under 300KB each

## 📹 Optional: Add Videos

If you want to add videos for the gallery:

1. Place video files in `/public/lashes/`
2. Supported formats: MP4 (recommended), WebM
3. Recommended: 720p or 1080p, max 10 seconds, under 5MB

Example:
```
public/lashes/
├── classic.jpg
├── classic.mp4
├── hybrid.jpg
├── hybrid.mp4
etc...
```

## 🎨 Image Tips

**For Best Results:**
1. Use high-quality, well-lit photos
2. Keep consistent lighting/style across all images
3. Use vertical/portrait orientation
4. Focus on the lashes themselves
5. Compress images before uploading (use tinypng.com or similar)

**Recommended Composition:**
- Hero image: Full face or eyes with lashes, showing your work
- Classic: Natural, individual lashes
- Hybrid: Mix of volume and classic
- Russian Volume: Fluffy, full lashes
- Mega Volume: Maximum drama and volume
- Wet Look Wispy: Textured, editorial style

## 🚀 How to Add Images

### Option 1: Using File Manager (Easiest)
1. Open your project folder
2. Navigate to the `public` folder
3. Add `hero.jpg` directly in the public folder
4. Create a `lashes` subfolder if it doesn't exist
5. Add your lash style images (classic.jpg, hybrid.jpg, etc.)

### Option 2: Using Command Line
```bash
# Navigate to your project
cd lashes-by-brooke

# Copy your hero image
cp /path/to/your/image.jpg public/hero.jpg

# Copy gallery images
cp /path/to/classic.jpg public/lashes/classic.jpg
cp /path/to/hybrid.jpg public/lashes/hybrid.jpg
# ... etc
```

### Option 3: Using GitHub (if images are already online)
1. Go to your GitHub repository
2. Navigate to the `public` folder
3. Click "Add file" > "Upload files"
4. Drag and drop your images
5. Commit the changes

## 🔧 Temporary Placeholder Images

If you don't have images ready yet, you can use temporary placeholder images from Unsplash:

Just add these URLs temporarily, but replace with real images before launch!

## ✅ After Adding Images

1. The app will automatically display your images
2. Refresh your browser to see the changes
3. Check that all images load properly
4. Verify the images look good on mobile devices

## 🐛 Troubleshooting

**Images not showing?**
- Check file names match exactly (case-sensitive!)
- Ensure files are in the correct folders
- Refresh your browser (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
- Check the browser console for errors

**Images look blurry?**
- Use higher resolution images
- Make sure images are at least 800px wide

**Images loading slowly?**
- Compress images using tinypng.com or similar
- Aim for under 300-500KB per image
- Convert to modern formats like WebP (optional)

---

Need help? Check the Next.js documentation on images: https://nextjs.org/docs/app/building-your-application/optimizing/images
