/* ══ Theme Management ══ */
function initTheme() {
  if (localStorage.getItem('theme') === 'light') {
    document.documentElement.classList.add('light-mode');
  }
}
function toggleTheme() {
  const isLight = document.documentElement.classList.toggle('light-mode');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
initTheme();

/* ── Project Details Data ── */
const projects = [
  {
    title: 'Enjay CRM Platform',
    cat: 'Technical Win: 60% Query Reduction',
    body: 'Designed and developed core RESTful APIs for a multi-tenant CRM. <strong>Impact:</strong> Optimized N+1 queries using Eloquent eager loading and Redis caching, reducing average latency from 2.3s to 340ms. Scaled to handle 100M+ transactions monthly while maintaining 99.9% uptime for 2,000+ active users.',
    tags: ['Laravel', 'MySQL', 'Redis', 'Docker'],
    link: 'Private / NDA'
  },
  {
    title: 'Field Tracking System',
    cat: 'Technical Win: 1.8s to 200ms Load Time',
    body: 'Real-time GPS-based field workforce tracking. <strong>Impact:</strong> Implemented WebSockets for live dashboard updates and Redis for high-frequency attendance data. Reduced initial page load from 1.8s to 200ms, enabling real-time monitoring of 500+ field agents simultaneously.',
    tags: ['Laravel', 'WebSockets', 'Redis', 'MySQL'],
    link: 'Live'
  },
  {
    title: 'ERP & Payment Integrations',
    cat: 'Technical Win: Zero-Failure Rate',
    body: 'Led the integration of complex external services including Stripe, Tally ERP, and custom marketing tools. <strong>Impact:</strong> Developed a robust webhook handling system with exponential backoff retries, ensuring 100% data consistency across 50k+ monthly financial transactions.',
    tags: ['Laravel', 'Stripe', 'ERP', 'Tally'],
    link: 'Private / NDA'
  },
  {
    title: 'AI Workflow Automation',
    cat: 'Technical Win: 200+ Hours Saved Monthly',
    body: 'Engineered AI-driven automation pipelines using n8n and OpenAI. <strong>Impact:</strong> Replaced manual data entry and classification processes with automated agents. Currently saving the internal operations team over 200 man-hours every month.',
    tags: ['n8n', 'Python', 'AI APIs', 'OpenAI'],
    link: 'Internal'
  }
];

function openArt(idx) {
  const p = projects[idx];
  const mc = document.getElementById('modal-content');
  if (!mc) return;
  mc.innerHTML = `
    <button class="modal-close" onclick="closeMod()">✕</button>
    <div class="blog-tag">${p.cat}</div>
    <h2>${p.title}</h2>
    <div class="proj-meta">
      ${p.tags.map(t => `<span class="badge" style="margin-right:8px">${t}</span>`).join('')}
    </div>
    <div class="abody">${p.body}</div>
    <div class="modal-cta">
      <a href="#contact" class="btn-primary btn-teal" onclick="closeMod()">Discuss This Project →</a>
    </div>
  `;
  const m = document.getElementById('modal');
  const mo = document.getElementById('modal-overlay');
  if (m) m.classList.add('open');
  if (mo) mo.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMod() {
  const m = document.getElementById('modal');
  const mo = document.getElementById('modal-overlay');
  if (m) m.classList.remove('open');
  if (mo) mo.classList.remove('open');
  document.body.style.overflow = '';
}

/* ══ Fix #3: Mobile drawer ══ */
    function toggleDrawer() {
      const d = document.getElementById('nav-drawer');
      const b = document.getElementById('nav-hamburger');
      const open = d.classList.toggle('open');
      b.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    }
    function closeDrawer() {
      document.getElementById('nav-drawer').classList.remove('open');
      document.getElementById('nav-hamburger').classList.remove('open');
      document.body.style.overflow = '';
    }
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

    /* ══ Custom Cursor ══ */
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const clabel = document.getElementById('cursor-label');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
      clabel.style.left = mx + 'px'; clabel.style.top = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('[data-project]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('project-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('project-hover'));
    });

    /* ══ Navbar scroll ══ */
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
    });

    /* ══ Scroll reveal ══ */
    const obs = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    /* ══ Terminal line delays ══ */
    document.querySelectorAll('.t-line.hidden').forEach((el, i) => {
      el.style.animationDelay = (0.5 + i * 0.4) + 's';
    });

    /* ══ Experience switcher ══ */
    const expData = [
      {
        title: 'Team Lead &amp; Senior Backend Engineer',
        company: 'Enjay IT Solutions Ltd.',
        period: 'Feb 2025 – Present · 1 yr 1 mo',
        bullets: [
          '<strong>Leadership &amp; Mentorship:</strong> Leading the API development team, conducting code reviews, and mentoring junior developers on Laravel best practices.',
          '<strong>DevOps &amp; Infrastructure:</strong> Managing production environments and containerization using Docker for zero-downtime deployments.',
          '<strong>AI &amp; Automation:</strong> Pioneering integration of AI workflows using n8n to automate complex internal business processes.',
          '<strong>Product Strategy:</strong> Collaborating with stakeholders to translate requirements into technical roadmaps for the CRM product.'
        ]
      },
      {
        title: 'Senior API Developer',
        company: 'Enjay IT Solutions Ltd.',
        period: 'Jun 2022 – Feb 2026 · 3 yrs 9 mos',
        bullets: [
          '<strong>API Architecture:</strong> Designed and developed scalable RESTful APIs for the core CRM platform, serving thousands of requests.',
          '<strong>Third-Party Integrations:</strong> Led integration of Payment Gateways, ERPs, and Marketing tools into the Enjay ecosystem.',
          '<strong>Performance Optimization:</strong> Refactored legacy codebases to improve API response times and database efficiency.'
        ]
      },
      {
        title: 'Laravel Developer',
        company: 'Enjay Network Solutions',
        period: 'Dec 2020 – Jun 2023 · 2 yrs 7 mos · Bhilad, Gujarat',
        bullets: [
          '<strong>Development:</strong> Built new web application modules from scratch using Laravel and MySQL.',
          '<strong>Full Stack Execution:</strong> Handled end-to-end development ensuring seamless backend and frontend integration.'
        ]
      }
    ];
    function loadExp(idx) {
      const d = expData[idx];
      document.getElementById('exp-title').innerHTML = d.title;
      document.getElementById('exp-company').textContent = d.company;
      document.getElementById('exp-period').textContent = d.period;
      document.getElementById('exp-bullets').innerHTML = d.bullets.map(b => `<li>${b}</li>`).join('');
      document.querySelectorAll('.exp-item').forEach((el, i) => el.classList.toggle('active', i === idx));
    }
    document.querySelectorAll('.exp-item').forEach((el, i) => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', () => loadExp(i));
    });

    /* ══ Fix #2: Email reveal — stored base64, decoded on click ══
       Email is NOT in HTML source. Decoded only when user clicks.  */
    const _e = atob('a2hlbXJhanBhdGlsOTk3QGdtYWlsLmNvbQ==');
    let emailRevealed = false;
    function revealEmail(evt) {
      evt.preventDefault();
      if (!emailRevealed) {
        document.getElementById('email-display').textContent = _e;
        document.getElementById('email-link').href = 'mailto:' + _e;
        emailRevealed = true;
      }
    }

    /* ══ Fix #3: Contact form ══ */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      let lastSubmit = 0;
      const RATE_LIMIT_MS = 60000;
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const form = this;
        const name = document.getElementById('f-name');
        const email = document.getElementById('f-email');
        const msg = document.getElementById('f-msg');
        const btn = document.getElementById('form-submit');
        const honeypot = form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value !== '') return;

        const now = Date.now();
        if (now - lastSubmit < RATE_LIMIT_MS) {
          const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSubmit)) / 1000);
          btn.textContent = `Wait ${wait}s…`;
          setTimeout(() => { btn.textContent = 'Send Message →'; }, RATE_LIMIT_MS - (now - lastSubmit));
          return;
        }

        let valid = true;
        const setErr = (field, errId, show) => {
          if (!field || !document.getElementById(errId)) return;
          field.classList.toggle('error', show);
          document.getElementById(errId).classList.toggle('show', show);
          if (show) valid = false;
        };

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErr(name, 'err-name', name.value.trim().length < 2);
        setErr(email, 'err-email', !emailRe.test(email.value.trim()));
        setErr(msg, 'err-msg', msg.value.trim().length < 20);

        if (!valid) return;

        btn.disabled = true;
        btn.textContent = 'Sending…';
        lastSubmit = Date.now();

        setTimeout(() => {
          form.style.display = 'none';
          const success = document.getElementById('form-success');
          if (success) success.classList.add('show');
        }, 1200);
      });
    }

    // Keyboard support for modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeMod();
        closeDrawer();
      }
    });