export const slideTo = (id: string, offset = 0): void => {
  const element = document.getElementById(id);
  if (element) {
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementTop + offset,
      behavior: 'smooth',
    });
  } else {
    console.warn(`Element with id "${id}" not found.`);
  }
};
