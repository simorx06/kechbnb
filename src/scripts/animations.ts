/**
 * Scroll-reveal + counter animations
 * Drop-in, no dependencies. Works with Astro static output.
 */

// ── Scroll reveal ────────────────────────────────────────────────
export function initScrollReveal() {
  if (typeof window === 'undefined') return;

  // Respect reduced-motion
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.transform = 'none';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const delay = el.dataset.delay ?? '0';
        setTimeout(() => {
          el.classList.add('is-visible');
        }, parseFloat(delay) * 1000);
        observer.unobserve(el);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

// ── Counter animation ─────────────────────────────────────────────
export function initCounters() {
  if (typeof window === 'undefined') return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const raw   = el.dataset.target ?? '0';
        const prefix = el.dataset.prefix ?? '';
        const suffix = el.dataset.suffix ?? '';
        const duration = 1800;
        const start = performance.now();

        // Parse numeric portion
        const numeric = parseFloat(raw.replace(/[^0-9.]/g, ''));
        const isFloat = raw.includes('.');

        if (reduced) {
          el.textContent = prefix + raw + suffix;
          observer.unobserve(el);
          return;
        }

        function tick(now: number) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * numeric;
          el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current).toString()) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach(el => observer.observe(el));
}

// ── Staggered children reveal ─────────────────────────────────────
export function initStaggerReveal() {
  if (typeof window === 'undefined') return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const container = entry.target as HTMLElement;
        const children = container.querySelectorAll<HTMLElement>('[data-stagger-child]');
        const baseDelay = parseFloat(container.dataset.staggerDelay ?? '0.09');

        children.forEach((child, i) => {
          if (reduced) {
            child.style.opacity = '1';
            child.style.transform = 'none';
            return;
          }
          setTimeout(() => child.classList.add('is-visible'), i * baseDelay * 1000);
        });

        observer.unobserve(container);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('[data-stagger]').forEach(el => observer.observe(el));
}

// ── Init all ──────────────────────────────────────────────────────
export function initAnimations() {
  initScrollReveal();
  initCounters();
  initStaggerReveal();
}
