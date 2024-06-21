let timer;
/**
 *
 * @param {function} funcToDebounce function you would like to debunce
 * @param {number} delay time of debounce wait (in ms)
 */
export const debounce = (funcToDebounce, delay) => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    funcToDebounce();
  }, delay);
};
