(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Chiudi il menu' : 'Apri il menu');
    });
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const panel = document.getElementById('searchPanel');
  const searchInput = document.getElementById('siteSearch');
  const results = document.getElementById('searchResults');
  const articles = [
    { title: 'La sicurezza informatica: formare i docenti per insegnarla agli alunni', category: 'INNOVAZIONE', url: 'https://www.buonenotizie.it/innovazione/2026/10/23/sicurezza-informatica-formare-i-docenti-per-insegnarla-agli-alunni/shinobisan/', terms: 'scuola tecnologia sicurezza internet digitale' },
    { title: 'Il boom del baskin: alla scoperta della pallacanestro inclusiva', category: 'SPORT', url: 'https://www.buonenotizie.it/misc/sport/2026/10/09/il-boom-del-baskin-alla-scoperta-della-versione-inclusiva-della-pallacanestro/sergio-di-bari/', terms: 'sport inclusione disabilità basket' },
    { title: 'Ecosistemi marini: il CNR ne studia la salute attraverso i suoni', category: 'SOSTENIBILITÀ', url: 'https://www.buonenotizie.it/sostenibilita/2026/10/17/ecosistemi-marini-il-cnr-ne-studia-la-salute-attraverso-i-suoni/shinobisan/', terms: 'mare ambiente oceano natura ricerca' },
    { title: 'Sentirsi soli, ma non da soli: come costruire i legami', category: 'SOCIETÀ', url: 'https://www.buonenotizie.it/societa/2026/10/20/sentirsi-soli-ma-non-da-soli-come-costruire-i-legami/giulia-mastrocicco/', terms: 'solitudine relazioni comunità salute' },
    { title: 'La cucina antispreco conquista tutti', category: 'LIFESTYLE', url: 'https://www.buonenotizie.it/notizie/2026/10/22/la-cucina-antispreco-conquista-tutti-nuove-idee-per-dare-una-seconda-vita-agli-alimenti/majocchi/', terms: 'cibo cucina spreco sostenibilità ricette' }
  ];

  function renderResults(query) {
    const q = query.trim().toLocaleLowerCase('it');
    if (!q) {
      results.innerHTML = '<p class="search-hint">Inizia a digitare per cercare tra gli articoli in evidenza.</p>';
      return;
    }
    const matches = articles.filter(article => `${article.title} ${article.category} ${article.terms}`.toLocaleLowerCase('it').includes(q));
    if (!matches.length) {
      results.innerHTML = '<p class="no-results">Nessun risultato in questa selezione. Prova con un altro termine oppure esplora tutte le categorie sul sito.</p>';
      return;
    }
    results.innerHTML = matches.map(article => `<a class="search-result" href="${article.url}" target="_blank" rel="noreferrer"><span>${article.category}</span><strong>${article.title}</strong></a>`).join('');
  }

  function openSearch() {
    if (!panel) return;
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => searchInput?.focus(), 40);
  }
  function closeSearch() {
    if (!panel) return;
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.search-open').forEach(button => button.addEventListener('click', openSearch));
  document.querySelectorAll('[data-search-close]').forEach(button => button.addEventListener('click', closeSearch));
  searchInput?.addEventListener('input', event => renderResults(event.target.value));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeSearch(); });

  const form = document.getElementById('newsletterForm');
  const message = document.getElementById('formMessage');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (message) message.textContent = 'Grazie! Per attivare le iscrizioni, collega questo modulo al servizio newsletter della redazione.';
  });
})();
