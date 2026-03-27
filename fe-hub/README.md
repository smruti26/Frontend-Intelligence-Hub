# Frontend Architecture Hub

> Interactive Visual Learning Platform for Frontend Architects — React 19 + Redux Toolkit + Webpack 5

## 🚀 Deployment (Vercel)

This project is configured for Vercel via `vercel.json`.

**Vercel settings (auto-detected from vercel.json):**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Framework: None (custom Webpack)

All routes rewrite to `/index.html` (SPA mode).

## 💻 Local Development

```bash
npm install
npm start        # → http://localhost:3000
```

## 🏗 Production Build

```bash
npm run build    # outputs to /dist
```

## 📁 Project Structure

```
fe-hub/
├── vercel.json          # Vercel deployment config
├── public/index.html    # HTML template
├── src/
│   ├── app/App.tsx      # Root component
│   ├── panels/          # 20 content panels
│   ├── features/        # Redux slices
│   └── utils/           # Bridge.js animations
├── webpack/
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
└── dist/                # Build output (auto-generated)
```

## 🛠 Tech Stack

- React 19 + TypeScript
- Redux Toolkit (state management)
- Webpack 5 (bundler)
- Custom canvas animation engine (bridge.js)
