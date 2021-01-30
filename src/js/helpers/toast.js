import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
/**
 *
 * @param {String} text
 * @param {Number} duration
 * @param {String} backgroundColor
 */
const toast = function createNewToast(text, duration, backgroundColor) {
  Toastify({
    offset: {
      x: 10,
      y: 2
    },
    close: true,
    text,
    duration,
    backgroundColor,
    stopOnFocus: false
  }).showToast();
};

export default toast;
