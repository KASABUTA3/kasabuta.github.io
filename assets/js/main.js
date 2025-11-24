(function(){
  const VERSION = 'v0.1.0';

  function $(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function createCard({ title, description, author }) {
    const article = document.createElement('article');
    article.className = 'series-card fade-in';
    article.innerHTML = `
      <header>
        <h3>${title}</h3>
        <span class="author">by ${author}</span>
      </header>
      <p>${description}</p>
    `;
    return article;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const author = form.author.value.trim();

    if (!title || !description || !author) return;

    const cards = $('#series-cards');
    const card = createCard({ title, description, author });
    cards.prepend(card);

    form.reset();
    form.title.focus();
  }

  function hydrateVersionLabels() {
    document.querySelectorAll('[data-version]').forEach(el => {
      el.textContent = VERSION;
    });
    console.log(`KASABUTA PORTAL version: ${VERSION}`);
  }

  function attachEvents() {
    const form = $('#series-form');
    if (form) form.addEventListener('submit', handleFormSubmit);
  }

  document.addEventListener('DOMContentLoaded', () => {
    hydrateVersionLabels();
    attachEvents();
  });
})();
