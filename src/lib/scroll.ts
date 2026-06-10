// Smooth-scroll to a section element by id, accounting for the sticky header (~80px).
export const scrollToSection = (id: string) => {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  } else {
    // Fallback: section not yet in the DOM (section-switcher) → smooth-scroll to top.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
