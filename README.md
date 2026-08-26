# Kamso Nondi — Cinematographer & Director Portfolio

A world-class, cinematic, and editorial portfolio website for **Kamso Nondi**, Director & Cinematographer based in Lagos, Nigeria.

---

## 🎬 How to Add Your Own Videos & Images

### 1. Adding Video Files

You can add your video files (MP4/WebM) directly to the project or link external CDN/Vimeo/Cloudflare video URLs:

- **Local files**: Place your video files in `public/videos/` (e.g. `public/videos/showreel.mp4`, `public/videos/project-1.mp4`).
- **Referencing in Code**: In `data/projects.ts` or `data/profile.ts`, set `heroVideo: "/videos/my-video.mp4"` or use your full video URL (e.g. `https://your-cdn.com/reel.mp4`).

### 2. Adding About / Portrait Photos

- **Local files**: Place your portrait and on-location photos in `public/images/` (e.g. `public/images/portrait.jpg`, `public/images/studio.jpg`).
- **Referencing in Code**: In `data/profile.ts`, update:
  - `portraitUrl: "/images/portrait.jpg"`
  - `studioImageUrl: "/images/studio.jpg"`

### 3. Updating Projects

Edit `data/projects.ts` to add, remove, or modify projects:

- Title, Client, Category (`Commercial`, `Narrative`, `Music Video`, `Fashion`, `Documentary`)
- Camera package & lens specifications
- Stills and frame captures
- `featured: true` to showcase on the homepage

---

## 🚀 Running the Project

```bash
# Run local development server
npm run dev

# Build production bundle
npm run build

# Start production server
npm start
```
