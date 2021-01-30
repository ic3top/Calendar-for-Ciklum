import '../sass/style.scss';
import onSubmitHandler from './form/events';
import formUI from './form/form';
import meeting from './table/newMeeting';

const { selector } = meeting;
const { form } = formUI;

// takes events from local storage
meeting.eventsObj = JSON.parse(localStorage.getItem('events')) || {};

document.addEventListener('DOMContentLoaded', () => {
  Object.values(meeting.eventsObj).forEach((event) => {
    meeting.generateNewMeeting(event);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newMeeting = onSubmitHandler();
    meeting.generateNewMeeting(newMeeting);
  });

  selector.addEventListener('change', () => {
    meeting.sortingPerMember(meeting.selector.value);
  });
});
