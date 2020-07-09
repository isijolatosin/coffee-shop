//hide preloader when all the images, scripts and links have finished loading

//window event listener
eventListeners();
function eventListeners() {
  const ui = new UI();

  //window preloader
  window.addEventListener('load', function () {
    ui.hidepreloader();
  });
  //nav btn
  document.querySelector('.navBtn').addEventListener('click', function () {
    ui.showNav();
  });
  //video control
  document
    .querySelector('.video_switch')
    .addEventListener('click', function () {
      ui.videoControls();
    });
  //submit form
  document
    .querySelector('.drink-form')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.querySelector('.input-name').value;
      const lastName = document.querySelector('.input-lastname').value;
      const email = document.querySelector('.input-email').value;

      let value = ui.checkEmpty(name, lastName, email);
      if (value) {
        let customer = new Customer(name, lastName, email);
        ui.addCustomer(customer);
        ui.showFeedback('customer has been added to the list', 'success');
        ui.clearEntry();
      } else {
        ui.showFeedback('some form values are empty', 'error');
      }
    });
  //display modal
  const links = document.querySelectorAll('.work-item_icon');
  links.forEach(function (item) {
    item.addEventListener('click', function (e) {
      ui.showModal(e);
    });
  });
  //hide modal
  const closeBtn = document.querySelector('.work-modal_close');
  closeBtn.addEventListener('click', function () {
    ui.closeModal();
  });
}
//contructor function
function UI() {}

//hide preloader
UI.prototype.hidepreloader = function () {
  document.querySelector('.preloader').style.display = 'none';
};
//show nav
UI.prototype.showNav = function () {
  document.querySelector('.nav').classList.toggle('nav-show');
};
//play/pause video
UI.prototype.videoControls = function () {
  let btn = document.querySelector('.video_switch-btn');
  const containBtnSlide = btn.classList.contains('btnSlide');
  if (containBtnSlide) {
    btn.classList.remove('btnSlide');
    document.querySelector('.video_item').play();
  } else {
    btn.classList.add('btnSlide');
    document.querySelector('.video_item').pause();
  }
};
UI.prototype.checkEmpty = function (name, lastname, email) {
  let result;
  if (name === '' || lastname === '' || email === '') {
    result = false;
  } else {
    result = true;
  }
  return result;
};
UI.prototype.showFeedback = function (text, type) {
  const feedback = document.querySelector('.drink-form_feedback');

  if (type === 'success') {
    feedback.classList.add('success');
    feedback.textContent = text;
    this.removeAlert('success');
  } else if (type === 'error') {
    feedback.classList.add('error');
    feedback.textContent = text;
    this.removeAlert('error');
  }
};
//remove alert
UI.prototype.removeAlert = function (type) {
  setTimeout(function () {
    document.querySelector('.drink-form_feedback').classList.remove(type);
  }, 2000);
};
//clear input form
UI.prototype.clearEntry = function () {
  document.querySelector('.input-name').value = '';
  document.querySelector('.input-lastname').value = '';
  document.querySelector('.input-email').value = '';
};
//add customer
UI.prototype.addCustomer = function (customer) {
  const image = [1, 2, 3, 4, 5];
  let random = Math.floor(Math.random() * image.length);
  const div = document.createElement('div');
  div.classList.add('person');
  div.innerHTML = `<img
                src="img/person-${random}.jpeg"
                alt="person"
                class="person_thumbnail"
              />
              <h4 class="person_name">${customer.name}</h4>
              <h4 class="person_last-name">${customer.lastname}</h4>`;
  document.querySelector('.drink-card_list').appendChild(div);
};
// show modal
UI.prototype.showModal = function (e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('work-item_icon')) {
    let id = e.target.parentElement.dataset.id;
    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal_item');

    modal.classList.add('work-modal-show');
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
  }
};
//close modal
UI.prototype.closeModal = function () {
  const modal = document.querySelector('.work-modal');
  modal.classList.remove('work-modal-show');
};
// customer constructor function
function Customer(name, lastname, email) {
  (this.name = name), (this.lastname = lastname), (this.email = email);
}
