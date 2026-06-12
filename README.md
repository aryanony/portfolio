# Aaryan Gupta — Portfolio Website

**Production-grade personal brand portfolio**
Technical Project Manager | HealthTech & SaaS | Jaipur, India

---

## Quick Start

```bash
# Option 1: Open directly in browser (no build step needed)
open index.html

# Option 2: Local server (recommended — needed for SW and fetch)
npx serve .
# or
python3 -m http.server 8000
# then open http://localhost:8000
```

---

## Deployment (Cloudflare Pages — Recommended)

1. Push this folder to a GitHub repo
2. Go to Cloudflare Pages → Create project → Connect GitHub
3. Build command: *(leave blank — static site)*
4. Output directory: `/` (root)
5. Deploy → your site is live on global CDN with auto HTTPS

**Alternative: Netlify**
Drag-and-drop the entire folder to [netlify.com/drop](https://netlify.com/drop)

---

## Customisation

### Update your details
Edit `data/config.json` — all dynamic values (domain, email, stats, links) are loaded from here.

### Replace placeholder photo
Drop your professional headshot at:
`assets/images/profile/aaryan-gupta-tpm.jpg`
Then update the `hero-photo-placeholder` div in `index.html` to an `<img>` tag.

### Add your Calendly link
In `data/config.json`, update:
```json
"calendly": "https://calendly.com/YOUR_USERNAME/30min"
```

### Add GA4 tracking
In `index.html`, replace `G-XXXXXXXXXX` with your real GA4 Measurement ID.

### Resume PDF
Place your resume at:
`assets/resume/aaryan-gupta-tpm-resume.pdf`

---

## File Structure

```
portfolio/
├── index.html              ← Main homepage (all sections)
├── 404.html                ← Custom 404 page
├── offline.html            ← PWA offline fallback
├── robots.txt              ← SEO/crawler config
├── sitemap.xml             ← XML sitemap
├── manifest.webmanifest    ← PWA manifest
├── sw.js                   ← Service worker
├── _headers                ← Cloudflare/Netlify headers
├── _redirects              ← Redirect rules
├── data/
│   └── config.json         ← All dynamic site variables
└── assets/
    ├── css/
    │   └── main.css        ← Complete design system
    ├── js/
    │   └── main.js         ← All JS interactions
    └── images/
        └── favicon.svg
```

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| LCP | < 1.8s |
| CLS | < 0.05 |
| INP | < 100ms |
| Total page weight | < 300KB |

---

## SEO Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify domain in GSC
- [ ] Create Google Business Profile (Jaipur)
- [ ] Add real GA4 Measurement ID
- [ ] Replace placeholder OG image at `assets/images/og/og-aaryan-gupta.jpg`
- [ ] Create Wikidata entity
- [ ] Submit to Crunchbase + Clutch.co

---

*Built with Vanilla HTML + CSS + JS | Zero frameworks | Maximum performance*
*Aaryan Gupta · aryanrajk63@gmail.com · aaaryangupta.com*
