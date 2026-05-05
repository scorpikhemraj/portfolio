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
  },
  {
    title: 'Laravel 13.x Second Brain',
    cat: 'Technical Win: Interconnected Documentation',
    body: 'Developed an Obsidian-based "Second Brain" vault for Laravel 13.x. <strong>Impact:</strong> Transformed 100+ pages of linear documentation into a semantic network with wiki-links and architectural maps. Optimized for AI Context (RAG), enabling tools like Cursor and Copilot to have deeper framework knowledge.',
    tags: ['Laravel', 'Obsidian', 'Knowledge Graph', 'AI RAG'],
    link: 'Open Source'
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
  if (!m || !mo) return;

  m.classList.add('open');
  mo.classList.add('open');
  document.body.style.overflow = 'hidden';

  anime({
    targets: m,
    opacity: [0, 1],
    scale: [0.9, 1],
    translateY: ['-55%', '-50%'],
    duration: 600,
    easing: 'easeOutExpo'
  });

  anime({
    targets: mo,
    opacity: [0, 1],
    duration: 400,
    easing: 'linear'
  });
}

function closeMod() {
  const m = document.getElementById('modal');
  const mo = document.getElementById('modal-overlay');
  if (!m || !mo) return;

  anime({
    targets: m,
    opacity: 0,
    scale: 0.95,
    translateY: '-45%',
    duration: 300,
    easing: 'easeInQuad',
    complete: () => {
      m.classList.remove('open');
      mo.classList.remove('open');
      document.body.style.overflow = '';
      // reset transform for next open
      m.style.transform = '';
    }
  });

  anime({
    targets: mo,
    opacity: 0,
    duration: 300,
    easing: 'linear'
  });
}

/* ══ Fix #3: Mobile drawer ══ */
    function toggleDrawer() {
      const d = document.getElementById('nav-drawer');
      const b = document.getElementById('nav-hamburger');
      if (!d || !b) return;
      const isOpen = d.classList.contains('open');

      if (!isOpen) {
        d.classList.add('open');
        b.classList.add('open');
        document.body.style.overflow = 'hidden';
        anime({
          targets: d,
          translateX: ['100%', '0%'],
          duration: 500,
          easing: 'easeOutExpo'
        });
        anime({
          targets: '.nav-drawer a',
          opacity: [0, 1],
          translateX: [20, 0],
          delay: anime.stagger(60, { start: 200 }),
          duration: 600,
          easing: 'easeOutExpo'
        });
      } else {
        closeDrawer();
      }
    }

    function closeDrawer() {
      const d = document.getElementById('nav-drawer');
      const b = document.getElementById('nav-hamburger');
      if (!d || !b || !d.classList.contains('open')) return;

      anime({
        targets: d,
        translateX: '100%',
        duration: 400,
        easing: 'easeInExpo',
        complete: () => {
          d.classList.remove('open');
          b.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
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

    /* ══ Scroll reveal (Anime.js) ══ */
    // Helper to split text into spans for character animation
    function splitText(selector) {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        text.split('').forEach(char => {
          const span = document.createElement('span');
          span.style.display = 'inline-block';
          span.style.whiteSpace = 'pre';
          span.classList.add('anim-char');
          span.innerText = char;
          el.appendChild(span);
        });
      });
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const title = entry.target.querySelector('.section-title');
          if (title && !title.classList.contains('split-done')) {
            title.classList.add('split-done');
            // Split title into chars
            const originalText = title.innerText;
            title.innerHTML = '';
            originalText.split('').forEach(char => {
              const span = document.createElement('span');
              span.style.display = 'inline-block';
              span.style.whiteSpace = 'pre';
              span.innerText = char;
              title.appendChild(span);
            });

            anime({
              targets: title.querySelectorAll('span'),
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(30),
              duration: 800,
              easing: 'easeOutExpo'
            });
          }

          anime({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1200,
            easing: 'easeOutExpo'
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ══ Hero Timeline ══ */
    window.addEventListener('load', () => {
      const cmdEl = document.querySelector('.t-cmd');
      const cmdText = cmdEl ? cmdEl.textContent : '';
      if (cmdEl) cmdEl.textContent = '';

      const heroTL = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1200
      });

      heroTL
        .add({
          targets: '.hero-title',
          opacity: [0, 1],
          translateY: [30, 0],
          delay: 300
        })
        .add({
          targets: '.hero-sub',
          opacity: [0, 1],
          translateY: [20, 0],
        }, '-=1000')
        .add({
          targets: '.terminal',
          opacity: [0, 1],
          translateY: [20, 0],
        }, '-=1000')
        .add({
          targets: { charCount: 0 },
          charCount: cmdText.length,
          duration: 1000,
          easing: 'linear',
          round: 1,
          update: (anim) => {
            if (cmdEl) cmdEl.textContent = cmdText.substring(0, anim.animations[0].currentValue);
          }
        }, '-=200')
        .add({
          targets: '.terminal .t-line.hidden',
          opacity: [0, 1],
          translateX: [-15, 0],
          delay: anime.stagger(250),
          duration: 800
        }, '-=200')
        .add({
          targets: '.hero-badges .badge',
          opacity: [0, 1],
          scale: [0.8, 1],
          delay: anime.stagger(60)
        }, '-=800')
        .add({
          targets: '.hero-ctas, .scroll-hint',
          opacity: [0, 1],
          translateY: [15, 0],
        }, '-=900');
    });

    /* ══ Skills Stagger ══ */
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: '.skill-card',
            opacity: [0, 1],
            translateY: [25, 0],
            delay: anime.stagger(100),
            duration: 1000,
            easing: 'easeOutExpo'
          });
          anime({
            targets: '.chip',
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: anime.stagger(40, { start: 400 }),
            duration: 800,
            easing: 'easeOutBack'
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) skillsObserver.observe(skillsGrid);

    /* ══ Experience Stagger ══ */
    const expObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          anime({
            targets: '.exp-timeline, .exp-detail',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(150),
            duration: 1000,
            easing: 'easeOutExpo'
          });
          expObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    const expGrid = document.querySelector('.exp-grid');
    if (expGrid) expObserver.observe(expGrid);

    /* ══ Stats Counter ══ */
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat-item').forEach(item => {
            const numEl = item.querySelector('.stat-number');
            if (!numEl) return;
            const finalVal = parseInt(numEl.innerText);
            const suffix = numEl.innerText.replace(/[0-9]/g, '');
            const obj = { value: 0 };
            
            anime({
              targets: obj,
              value: finalVal,
              round: 1,
              duration: 2500,
              easing: 'easeOutExpo',
              update: () => {
                numEl.innerText = obj.value + suffix;
              },
              begin: () => { numEl.style.opacity = 1; }
            });
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    const statsRow = document.querySelector('.stats-row');
    if (statsRow) statsObserver.observe(statsRow);

    /* ══ Project Hover ══ */
    document.querySelectorAll('[data-project]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        anime({
          targets: el,
          translateY: -8,
          scale: 1.01,
          duration: 400,
          easing: 'easeOutQuad'
        });
      });
      el.addEventListener('mouseleave', () => {
        anime({
          targets: el,
          translateY: 0,
          scale: 1,
          duration: 400,
          easing: 'easeOutQuad'
        });
      });
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

    /* ══ Logo Micro-interactions ══ */
    function initLogoAnim() {
      const logo = document.querySelector('.nav-logo');
      if (!logo) return;
      const text = logo.innerText;
      logo.innerHTML = '';
      text.split('').forEach(char => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.display = 'inline-block';
        logo.appendChild(span);
      });

      logo.addEventListener('mouseenter', () => {
        anime({
          targets: '.nav-logo span',
          translateY: [0, -5, 0],
          scale: [1, 1.2, 1],
          delay: anime.stagger(40),
          duration: 500,
          easing: 'easeOutElastic(1, .6)'
        });
      });
    }
    initLogoAnim();

    /* ══ Hero Mesh Background ══ */
    function initHeroMesh() {
      const mesh = document.getElementById('hero-mesh');
      if (!mesh) return;
      const count = 15;
      for (let i = 0; i < count; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const x1 = Math.random() * 1000;
        const y1 = Math.random() * 1000;
        const x2 = x1 + (Math.random() - 0.5) * 300;
        const y2 = y1 + (Math.random() - 0.5) * 300;
        
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'url(#mesh-grad)');
        line.setAttribute('stroke-width', Math.random() * 2 + 1);
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('opacity', Math.random() * 0.5 + 0.1);
        mesh.appendChild(line);

        // Animate drifting
        anime({
          targets: line,
          x1: `+=${(Math.random() - 0.5) * 100}`,
          y1: `+=${(Math.random() - 0.5) * 100}`,
          x2: `+=${(Math.random() - 0.5) * 100}`,
          y2: `+=${(Math.random() - 0.5) * 100}`,
          duration: 10000 + Math.random() * 10000,
          easing: 'easeInOutQuad',
          direction: 'alternate',
          loop: true
        });
      }

      // Mouse interaction
      document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth) * 50;
        const y = (e.clientY / window.innerHeight) * 50;
        anime({
          targets: '.hero-mesh line',
          translateX: x,
          translateY: y,
          duration: 1000,
          easing: 'easeOutQuad'
        });
      });
    }
    initHeroMesh();