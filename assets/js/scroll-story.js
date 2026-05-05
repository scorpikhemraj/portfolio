/**
 * Architectural Request Flow - Scroll-Linked Narrative
 * Uses Anime.js to scrub through a system trace as the user scrolls.
 */

(function() {
    // Wait for everything to load so section positions are accurate
    window.addEventListener('load', () => {
        const svg = document.getElementById('narrative-svg');
        const path = document.getElementById('narrative-path');
        const packet = document.getElementById('narrative-packet');
        
        if (!svg || !path || !packet) return;

        const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'services', 'education', 'contact'];
        let animation;

        function initNarrative() {
            const h = document.documentElement.scrollHeight;
            const w = window.innerWidth;
            svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
            
            // Build dynamic path through section centers
            let d = `M ${w * 0.9} 0`;
            
            sections.forEach((id, i) => {
                const el = document.getElementById(id);
                if (!el) return;
                
                const rect = el.getBoundingClientRect();
                const scrollY = window.pageYOffset;
                
                // Focal points based on section layout
                let targetX = w * 0.5;
                if (id === 'hero') targetX = w * 0.75;
                if (id === 'about') targetX = w * 0.25;
                if (id === 'skills') targetX = w * 0.5;
                if (id === 'experience') targetX = w * 0.6;
                if (id === 'projects') targetX = w * 0.4;
                if (id === 'contact') targetX = w * 0.5;

                const targetY = rect.top + scrollY + (rect.height / 2);
                
                // Add a curve or straight line
                d += ` L ${targetX} ${targetY}`;
            });
            
            d += ` L ${w * 0.5} ${h}`;
            path.setAttribute('d', d);

            // Setup Anime.js path animation
            const pathData = anime.path(path);
            
            // We use cx/cy for the circle instead of transforms for better SVG compatibility
            animation = anime({
                targets: { progress: 0 },
                progress: 100,
                easing: 'linear',
                duration: 1000,
                autoplay: false,
                update: (anim) => {
                    const p = pathData(anim.animations[0].currentValue);
                    packet.setAttribute('cx', p.x);
                    packet.setAttribute('cy', p.y);
                }
            });

            // Initial position
            updateScroll();
        }

        function updateScroll() {
            if (!animation) return;
            const scrollTop = window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
            animation.seek(progress * 1000);
            
            // Dynamic path drawing
            const pathLength = path.getTotalLength();
            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength * (1 - progress);
        }

        initNarrative();
        window.addEventListener('scroll', updateScroll);
        window.addEventListener('resize', () => {
            // Re-init on resize as section positions change
            initNarrative();
        });

        // ══ Data Bursts ══
        // Periodically spawn packets that travel the full path
        function spawnBurst() {
            if (!path) return;
            const burst = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            burst.setAttribute('r', '3');
            burst.setAttribute('fill', 'var(--red)');
            burst.setAttribute('opacity', '0.6');
            burst.setAttribute('filter', 'url(#glow)');
            svg.appendChild(burst);

            const pathData = anime.path(path);
            anime({
                targets: burst,
                translateX: pathData('x'),
                translateY: pathData('y'),
                rotate: pathData('angle'),
                easing: 'linear',
                duration: 12000 + Math.random() * 5000, // Slow drift
                complete: () => {
                    if (burst.parentNode === svg) svg.removeChild(burst);
                }
            });
        }
        
        // Start bursts after a short delay
        setTimeout(() => {
            spawnBurst();
            setInterval(spawnBurst, 5000);
        }, 2000);
    });
})();
