# Systemic News

This repo is a small static news demo. I applied a minimal redesign on the `redesign` branch to make the site responsive, improve accessibility, and harden the JS that loads articles.

What changed (high level)
- Responsive grid layout for news cards (assets/css/style.css)
- Improved article layout (assets/css/article.css)
- Safer fetching and rendering of news.json (assets/js/app.js, assets/js/article.js)
- Minor semantic/metadata improvements to index.html and article.html

How to preview
- Easiest: use a local static server from the project root. For example with Python 3:

  python -m http.server 8000

  Then open http://localhost:8000 in your browser.

Next steps you might want
- Moderate redesign: add responsive srcset images, lazy-loading, and a small nav/footer polish.
- Full rewrite: convert to a static site generator (Eleventy) or a React/Vue app and generate article pages from news/news.json.

If you'd like, I can open a PR from `redesign` to your default branch with these changes and a detailed description.
