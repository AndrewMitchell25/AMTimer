export let timerDelay = 1000;

export const formatTime = (time: number) => {
  let minute = "";
  let second = "";
  let milisecond = "";

  if (Math.floor((time / 60000) % 60) >= 1) {
    minute = ("" + Math.floor((time / 60000) % 60)).slice(-2);
    second = ("0" + Math.floor((time / 1000) % 60)).slice(-2);
  } else {
    second = ("" + Math.floor((time / 1000) % 60)).slice(-2);
  }

  milisecond = ("0" + ((time / 10) % 100)).slice(-2);

  return `${minute ? minute + ":" : ""}${second}.${milisecond}`;
};
