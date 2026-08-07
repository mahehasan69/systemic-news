(function () {
  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }
  const slug = qs('slug');
  const root = document.getElementById('article');
  if (!root) return;

  async function load() {
    try {
      const res = await fetch('news/news.json', {cache: 'no-store'});
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      const item = (data || []).find(i => (i.slug === slug) || (i.title && slug === i.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')));
      if (!item) return showNotFound();
      render(item);
    } catch (err) {
      console.error(err);
      showNotFound();
    }
  }

  function showNotFound() {
    root.querySelector('#article-title').textContent = 'Article not found';
    root.querySelector('#article-body').textContent = 'We could not find the requested article.';
  }

  function render(item) {
    root.querySelector('#article-title').textContent = item.title || 'Untitled';
    root.querySelector('#article-meta').textContent = (item.author ? item.author + ' • ' : '') + (item.date || '');
    const img = root.querySelector('#article-image');
    if (item.image) {
      img.src = item.image;
      img.alt = item.imageAlt || item.title || 'Article image';
    }
    const body = root.querySelector('#article-body');
    if (typeof item.content === 'string') {
      body.innerHTML = item.content;
    } else if (item.content && item.content.html) {
      body.innerHTML = item.content.html;
    } else {
      body.textContent = item.excerpt || item.summary || '';
    }
  }

  load();
})();
