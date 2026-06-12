// Smooth-scroll to a section element by id, accounting for the sticky header (~80px).
// Support retry polling during page transitions so it scrolls to the correct element once mounted.
export const scrollToSection = (id: string, retryCount = 0) => {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(id);
  if (element) {
    const offset = 80;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  } else if (retryCount < 5) {
    setTimeout(() => scrollToSection(id, retryCount + 1), 100);
  } else {
    // Fallback: section not yet in the DOM (section-switcher) → smooth-scroll to top.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
