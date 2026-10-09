document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const langButton = document.querySelector('.lang-switch');
  if (langButton) {
    langButton.addEventListener('click', () => {
      const isRussian = document.documentElement.lang === 'ru';
      document.documentElement.lang = isRussian ? 'en' : 'ru';
      langButton.textContent = isRussian ? '🇷🇺 RU' : '🇬🇧 EN';
      document.querySelectorAll('[data-en][data-ru]').forEach((element) => {
        element.textContent = isRussian ? element.dataset.en : element.dataset.ru;
      });
    });
  }
});