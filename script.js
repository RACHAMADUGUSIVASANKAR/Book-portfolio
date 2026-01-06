/*  CONSTANTS */
const TURN_DURATION = 500;
const PAGE_INTERVAL = 200;
const OPEN_DELAY = 2100;

/*  PAGE TURN BUTTONS */
const pageTurnBtns = document.querySelectorAll('.nextprev-btn');

pageTurnBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const pageId = btn.dataset.page;
    const page = document.getElementById(pageId);

    if (!page) return;

    const isTurned = page.classList.contains('turn');

    page.classList.toggle('turn');

    setTimeout(() => {
      page.style.zIndex = isTurned ? 2 - index : 2 + index;
    }, TURN_DURATION);
  });
});

/*  CONTACT ME BUTTON */
const pages = document.querySelectorAll('.book-page.page-right');
const contactBtn = document.querySelector('.btn.contact-me');

if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    pages.forEach((page, index) => {
      setTimeout(() => {
        page.classList.add('turn');
        setTimeout(() => {
          page.style.zIndex = 20 + index;
        }, TURN_DURATION);
      }, (index + 1) * PAGE_INTERVAL);
    });
  });
}

/*  BACK PROFILE BUTTON */
let pageNumber = 0;
const totalPages = pages.length;
const backProfileBtn = document.querySelector('.back-profile');

function reverseIndex() {
  pageNumber--;
  if (pageNumber < 0) pageNumber = totalPages - 1;
}

if (backProfileBtn) {
  backProfileBtn.addEventListener('click', () => {
    pages.forEach((_, index) => {
      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
          reverseIndex();
          pages[pageNumber].style.zIndex = 10 + index;
        }, TURN_DURATION);
      }, (index + 1) * PAGE_INTERVAL);
    });
  });
}

/*  OPENING ANIMATION */
const coverRight = document.querySelector('.cover.cover-right');

setTimeout(() => {
  coverRight.classList.add('turn');
}, OPEN_DELAY);

setTimeout(() => {
  coverRight.style.zIndex = -1;
}, OPEN_DELAY + 700);

pages.forEach((_, index) => {
  setTimeout(() => {
    reverseIndex();
    pages[pageNumber].classList.remove('turn');

    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].style.zIndex = 10 + index;
    }, TURN_DURATION);
  }, OPEN_DELAY + (index + 1) * PAGE_INTERVAL);
});

/* CONTACT FORM EMAIL */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_u35uj4h", //service id of emailjs website
      "template_vpcdryc", // templete id of emailjs website
      this
    )
    .then(() => {
      alert("Message sent successfully!");
      contactForm.reset();
    })
    .catch(() => {
      alert("Failed to send message. Try again.");
    });
  });
}
