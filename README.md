# Javesh Khosla — personal site

Editorial personal introduction site. Content lives in one file so you can update projects without touching the layout.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## How to change projects later

Edit **`src/data/site.ts`**. That is the only file you need for name, bio, links, featured work, smaller experiments, interests, and journey dates.

### Add a featured project

1. Open `src/data/site.ts`.
2. Find `featuredProjects`.
3. Copy one object and paste it inside the array.
4. Fill in the fields:

```ts
{
  id: "my-new-project",          // unique, no spaces
  name: "My New Project",
  category: "AI × Web",
  description: "One sentence about what it actually does.",
  technologies: ["Python", "React"],
  github: "https://github.com/javeshK/repo-name",
  live: "https://example.com",   // optional — delete this line if there is no demo
  flagship: false,               // set true for only one project to make it the large card
}
```

5. Save. With `npm run dev` running, the page updates on its own.

### Move a project to the smaller list

Cut the object from `featuredProjects` and paste it into `otherProjects`.

### Hide a project

Delete its object from the array, or comment it out.

### RakshakAI GitHub link

RakshakAI is not in your public GitHub yet, so `github` is `null` and the card shows “GitHub coming soon”. When the repo is public, set:

```ts
github: "https://github.com/javeshK/your-repo-name",
```

### Email button

In `links`, set:

```ts
email: "you@example.com",
```

Leave it as `""` to keep email off the page.

### Hero video

Replace `public/hero.mp4`. For smooth cursor scrubbing, encode every frame as a keyframe:

```bash
ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 18 -g 1 -keyint_min 1 -x264-params "scenecut=0" -profile:v high -pix_fmt yuv420p -movflags +faststart -an public/hero.mp4
```

Cursor scrubbing is desktop-only. On phones the same video plays as a slow muted loop. If the visitor prefers reduced motion, the video stays on the first frame.

## CursorScrubVideo

React component: `src/components/CursorScrubVideo.tsx`. Same props as the Framer panel spec (`videoFile`, `axis`, `reverse`, `trackingArea`, `smoothing`, `objectFit`, `showPoster`, `borderRadius`).

<!---LeetCode Topics Start-->
# LeetCode Topics
## String
|  |
| ------- |
| [1021-remove-outermost-parentheses](https://github.com/javeshK/javesh-khosla/tree/master/1021-remove-outermost-parentheses) |
## Stack
|  |
| ------- |
| [1021-remove-outermost-parentheses](https://github.com/javeshK/javesh-khosla/tree/master/1021-remove-outermost-parentheses) |
## Bracket Sequences
|  |
| ------- |
| [1021-remove-outermost-parentheses](https://github.com/javeshK/javesh-khosla/tree/master/1021-remove-outermost-parentheses) |
<!---LeetCode Topics End-->