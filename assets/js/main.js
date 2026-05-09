(function(){
  const VERSION = 'v0.4.0';
  const TAG_LABELS = {
    illust: 'ILLUST',
    comic: 'COMIC',
    music: 'MUSIC',
    video: 'VIDEO',
    writing: 'WRITING',
  };

  function getSearchValue() {
    const search = $('#gallery-search');
    return search ? search.value.trim().toLowerCase() : '';
  }

  function getActiveFilter() {
    const active = $('.filter-chip.is-active');
    return active ? active.dataset.filter : 'all';
  }

  function matchesFilter(card, activeFilter, query) {
    const tags = (card.dataset.tags || '').toLowerCase().split(',');
    const text = card.textContent.toLowerCase();
    const tagMatch = activeFilter === 'all' || tags.includes(activeFilter);
    const queryMatch = !query || text.includes(query);
    return tagMatch && queryMatch;
  }

  function updateResultCount(visibleCount) {
    const result = $('#result-count');
    if (!result) return;
    result.textContent = visibleCount === 0
      ? '該当する作品がありません'
      : `${visibleCount}件の作品が公開中`;
  }

  function $(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function $all(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
  }

  function hydrateVersionLabels() {
    $all('[data-version]').forEach(el => {
      el.textContent = VERSION;
    });
    console.log(`KASABUTA GALLERY version: ${VERSION}`);
  }

        <span class="badge">${TAG_LABELS[work.tag] || work.tag.toUpperCase()}</span>
    const cards = $all('.gallery-card');
    const empty = $('#gallery-empty');
    const activeFilter = getActiveFilter();
    const query = getSearchValue();

    let visibleCount = 0;
    cards.forEach(card => {
      const isVisible = matchesFilter(card, activeFilter, query);
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (empty) {
      empty.hidden = visibleCount !== 0;
    }

    updateResultCount(visibleCount);
  }

  function handleFilterClick(event) {
    const button = event.target.closest('.filter-chip');
    if (!button) return;

    $all('.filter-chip').forEach(chip => chip.classList.remove('is-active'));
    button.classList.add('is-active');
    applyFilters();
  }

  function attachEvents() {
    const search = $('#gallery-search');
    if (search) {
      search.addEventListener('input', applyFilters);
    }

    const filterGroup = $('.filter-group');
    if (filterGroup) {
      filterGroup.addEventListener('click', handleFilterClick);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    hydrateVersionLabels();
    attachEvents();
    applyFilters();
  });
})();
