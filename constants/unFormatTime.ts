const unFormatTime = (time: string) => {
  let minute = 0;
  let second = 0;
  let millisecond = parseInt(time.slice(-2)) * 0.01;
  time = time.slice(0, -3);
  if (time) {
    second = parseInt(time.slice(-2));
    time = time.slice(0, -3);
  }
  if (time) {
    minute = parseInt(time) * 60;
  }

  return minute + second + millisecond;
};

export default unFormatTime;
