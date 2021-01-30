import formUI from './form';

const { modal } = formUI;

formUI.btn.addEventListener('click', () => {
  modal.style.display = 'block';
});

formUI.btnCloser.addEventListener('click', () => {
  formUI.hideWindow();
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    formUI.hideWindow();
  }
});

const onSubmitHandler = function getInfoOnFormSubmit() {
  const eventName = formUI.getEventName();
  const eventDay = formUI.getEventDay();
  const eventTime = formUI.getEventTime();
  const members = formUI.getMembers();

  const newMeeting = {
    eventName,
    eventDay,
    members,
    eventTime
  };

  return newMeeting;
};
export default onSubmitHandler;
