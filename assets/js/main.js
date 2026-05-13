(function(){
  const VERSION = 'v0.2.0';

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

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function runAIBattle() {
    const roster = [
      { name: 'NEON FOX', hp: 120, atk: 25, ai: 'aggressive' },
      { name: 'IRON OWL', hp: 140, atk: 18, ai: 'balanced' },
      { name: 'VOID LYNX', hp: 110, atk: 28, ai: 'risky' },
      { name: 'CRYSTAL BEAR', hp: 160, atk: 15, ai: 'tank' }
    ];

    const [a, b] = roster.sort(() => Math.random() - 0.5).slice(0, 2).map(bot => ({ ...bot }));
    const log = [];
    let round = 1;

    while (a.hp > 0 && b.hp > 0 && round <= 20) {
      const actionA = aiAction(a, b);
      const actionB = aiAction(b, a);

      resolveAction(a, b, actionA, log, round);
      if (b.hp <= 0) break;
      resolveAction(b, a, actionB, log, round);
      round++;
    }

    const winner = a.hp > 0 && b.hp <= 0 ? a : b.hp > 0 && a.hp <= 0 ? b : (a.hp >= b.hp ? a : b);
    return { a, b, log, winner, rounds: round };
  }

  function aiAction(self, enemy) {
    const hpRatio = self.hp / 160;
    if (self.ai === 'tank' && hpRatio < 0.4) return 'guard';
    if (self.ai === 'risky' && Math.random() < 0.35) return 'special';
    if (self.ai === 'aggressive' && Math.random() < 0.2) return 'special';
    if (self.ai === 'balanced' && enemy.hp < 35 && Math.random() < 0.6) return 'special';
    return Math.random() < 0.22 ? 'guard' : 'attack';
  }

  function resolveAction(self, enemy, action, log, round) {
    if (action === 'guard') {
      self.guarding = true;
      log.push(`R${round}: ${self.name} は防御姿勢をとった`);
      return;
    }

    const base = action === 'special' ? self.atk * 1.4 : self.atk;
    const variance = randomInt(-5, 8);
    let damage = Math.max(5, Math.floor(base + variance));
    if (enemy.guarding) {
      damage = Math.floor(damage * 0.55);
      enemy.guarding = false;
    }
    enemy.hp = Math.max(0, enemy.hp - damage);
    log.push(`R${round}: ${self.name} の${action === 'special' ? '必殺' : '攻撃'} → ${enemy.name} に ${damage} ダメージ (HP:${enemy.hp})`);
  }

  function renderBattleResult(result) {
    const arena = $('#battle-arena');
    if (!arena) return;

    const top = `
      <div class="battle-result-head">
        <p><strong>${result.a.name}</strong> VS <strong>${result.b.name}</strong></p>
        <p>Winner: <span class="winner">${result.winner.name}</span></p>
      </div>
    `;

    const logHtml = result.log.map(line => `<li>${line}</li>`).join('');
    arena.innerHTML = `${top}<ol class="battle-log">${logHtml}</ol>`;
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

    const battleBtn = $('#start-battle-btn');
    if (battleBtn) {
      battleBtn.addEventListener('click', () => {
        const result = runAIBattle();
        renderBattleResult(result);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    hydrateVersionLabels();
    attachEvents();
  });
})();
