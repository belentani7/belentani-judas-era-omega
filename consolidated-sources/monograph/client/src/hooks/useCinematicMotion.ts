import { useEffect } from 'react';

export function useCinematicMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

    if (reduced) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -12% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxNodes.forEach((node) => {
          const speed = Number(node.dataset.parallax ?? 0.12);
          node.style.transform = `translate3d(0, ${Math.round(y * speed * -1)}px, 0)`;
        });
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}
