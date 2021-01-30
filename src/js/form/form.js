class FormUI {
  constructor() {
    // modal window control
    this.modal = document.getElementById('modalWindow');
    this.btn = document.getElementById('btnAdd');
    this.btnCloser = document.getElementById('modalClose');

    // form
    this.form = document.forms.addEventForm;
    this.inputName = this.form.elements.eventName;
    this.inputDay = this.form.elements.eventDay;
    this.inputTime = this.form.elements.eventTime;
    this.checkBoxes = [...this.form.querySelectorAll('.form-check-input')];
  }

  getEventName() {
    return this.inputName.value;
  }

  getEventDay() {
    return this.inputDay.value;
  }

  getEventTime() {
    return this.inputTime.value;
  }

  getMembers() {
    const members = [];
    this.checkBoxes.forEach((box) => {
      if (box.checked === true) {
        members.push(box.id);
      }
    });

    return members;
  }

  hideWindow() {
    this.modal.style.display = 'none';
  }
}

const formUI = new FormUI();
export default formUI;
