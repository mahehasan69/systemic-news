(function () {
  const where = document.getElementById('news-list');
  if (!where) return;

  async function load() {
    try {
      const res = await fetch('news/news.json', {cache: 'no-store'});
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      render(data || []);
    } catch (err) {
      console.error(err);
      where.innerHTML = '<p>Unable to load news at this time.</p>';
    }
  }

  function slugify(text) {
    return String(text).toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function render(items) {
    if (!items.length) {
      where.innerHTML = '<p>No news available.</p>';
      return;
    }

    const frag = document.createDocumentFragment();
    items.forEach(item => {
      const slug = item.slug || slugify(item.title || 'article');
      const a = document.createElement('a');
      a.href = `article.html?slug=${encodeURIComponent(slug)}`;
      a.className = 'card-link';
      a.setAttribute('aria-label', item.title || 'Read article');

      const card = document.createElement('article');
      card.className = 'card';

      const img = document.createElement('img');
      img.src = item.image || 'assets/images/placeholder.jpg';
      img.alt = item.imageAlt || item.title || 'Article image';

      const body = document.createElement('div');
      body.className = 'card-body';

      const h3 = document.createElement('h3');
      h3.textContent = item.title || 'Untitled';
      const p = document.createElement('p');
      p.textContent = item.excerpt || (item.summary || '').slice(0, 140);
      const read = document.createElement('a');
      read.className = 'read-link';
      read.href = a.href;
      read.textContent = 'Read →';

      body.appendChild(h3);
      body.appendChild(p);
      body.appendChild(read);

      card.appendChild(img);
      card.appendChild(body);
      a.appendChild(card);
      frag.appendChild(a);

      // store slug on item for article lookup
      if (!item.slug) item.slug = slug;
    });

    where.innerHTML = '';
    where.appendChild(frag);
  }

  load();
})();
