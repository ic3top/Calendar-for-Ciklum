import toast from '../helpers/toast';
import formUI from '../form/form';

const { form } = formUI;

class Meeting {
  constructor() {
    // eventName, eventDay, eventTime, members, elementUI
    this.eventsObj = {};
    this.selector = document.querySelector('#selectMember');
  }

  showAll() {
    Object.values(this.eventsObj).forEach(({ elementUI }) => {
      this.showMeeting(elementUI);
    });
  }

  showMeeting(elementUI) {
    this.meetingTemplate(this.eventsObj[elementUI.dataset.id].eventName, elementUI);
  }

  hideMeeting(elementUI) {
    elementUI.removeAttribute('class');
    elementUI.innerHTML = '';
  }

  deleteMeeting(elementToDelete) {
    const isConfirmed = confirm(`Are you sure you want to delete '${elementToDelete.textContent.trim()}' event?`);
    if (isConfirmed) {
      delete this.eventsObj[elementToDelete.dataset.id];
      elementToDelete.removeAttribute('data-id');
      elementToDelete.removeAttribute('class');
      elementToDelete.innerHTML = '';

      toast('Event deleted', 3000, '#20c997');

      localStorage.setItem('events', JSON.stringify(this.eventsObj));
    }
  }

  meetingTemplate(name, cellHTML) {
    const cell = cellHTML;
    const meetingHTML = `
        <div class="table-active d-flex justify-content-between align-items-center">
          <div class="fs-5 fw-bold">${name}</div>
        </div>
      `;
    // btn for deleting the meeting
    const btnDelete = document.createElement('div');
    btnDelete.classList.add('d-flex', 'justify-content-center', 'align-item-center');
    btnDelete.style.cursor = 'pointer';
    btnDelete.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 0 24 24" width="36"><path d="M0 0h24v24H0V0z" fill="none"/>
      <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/>
    </svg>`;
    // event for deleting
    btnDelete.addEventListener('click', () => {
      const closestCell = btnDelete.closest('td');
      this.deleteMeeting(closestCell);
    });

    cell.classList.add('table-success');
    cell.innerHTML = meetingHTML;
    cell.children[0].insertAdjacentElement('beforeend', btnDelete);
    return cell.dataset.id;
  }

  generateNewMeeting({
    eventName,
    eventDay,
    eventTime,
    members,
    id
  }) {
    if (!eventName.trim()) {
      toast('You have entered an incorrect name', 3000, '#dc3545');
      return;
    }

    if (members.length === 0) {
      toast('You have not selected any participants', 3000, '#dc3545');
      return;
    }

    const allCells = [...document.querySelectorAll('td')];
    const exactCell = allCells[eventTime * 5 + Number(eventDay)];

    if (exactCell.dataset.id) {
      toast('You already have an appointment scheduled for this time', 3000, '#dc3545');
      return;
    }

    form.reset();
    formUI.hideWindow();

    // creating new meeting in DOM
    this.meetingTemplate(eventName, exactCell);

    // set the selector to 'show all' and then (after event created) run a function 'showAll'
    this.selector.selectedIndex = 0;

    // 'uniqe' id for every meeting
    if (!id) {
      exactCell.dataset.id = Math.floor(Math.random() * 100000);
      this.eventsObj[exactCell.dataset.id] = {
        eventName,
        eventDay,
        eventTime,
        members,
        elementUI: exactCell,
        id: exactCell.dataset.id
      };
      localStorage.setItem('events', JSON.stringify(this.eventsObj));
      toast('The event was added succesfuly!', 2000, '#20c997');
      this.showAll();
      return;
    }
    exactCell.dataset.id = id;
    this.eventsObj[id].elementUI = exactCell;
  }

  sortingPerMember(memberName) {
    if (memberName === 'all') {
      this.showAll();
      return;
    }
    Object.values(this.eventsObj).forEach(({ members, elementUI }) => {
      if (!members.includes(memberName)) {
        this.hideMeeting(elementUI);
      } else {
        this.showMeeting(elementUI);
      }
    });
  }
}

const meeting = new Meeting();
export default meeting;
