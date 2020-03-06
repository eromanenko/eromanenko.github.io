initDate();
initShowMore();
initSpoilers();

function initShowMore() {
  const buttons = document.querySelectorAll('.show-more__btn');
  Array.from(buttons).forEach(buttonEl => {
    const list = buttonEl.previousElementSibling;
    if (!list.classList.contains('show-more-off')) return;

    const elements = list.querySelectorAll('li')
    const maxDefaultShow = buttonEl.dataset.maxLi;

    if (elements.length > maxDefaultShow) {
      buttonEl.hidden = false;
      buttonEl.addEventListener('click', _ => {
        list.classList.remove('show-more-off');
        buttonEl.hidden = true;
      })
    }
  })
}

function initSpoilers() {
  const spoilerLinks = document.querySelectorAll('.spoil-link');
  Array.from(spoilerLinks).forEach(linkEl => {
    const content = linkEl.nextElementSibling;
    if (!content.classList.contains('spoil-content')) return;

    linkEl.addEventListener('click', _ => content.hidden = !content.hidden);
  })
}

function initDate() {
  const currentYear = (new Date).getFullYear();
  const dates = {
    'js--years-production': currentYear - 2013,
    'js--years-js': currentYear - 2011,
    'js--years-html': currentYear - 2008
  }
  Object.keys(dates).forEach(dateSelector => {
    const elems = document.querySelectorAll(`.${dateSelector}`);
    Array.from(elems).forEach(elem => {
      elem.textContent = dates[dateSelector];
    });
  })
}
