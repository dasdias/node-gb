let colors = require('colors');
let EventEmitter = require("events");
const userDate = process.argv.slice(2);

class TimerEmitter extends EventEmitter {}
const emitter = new TimerEmitter();


for (const item of userDate) {
  const [hour, day, month, year] = item.split('-')
  const dateInFuture = new Date(year, month - 1, day, hour);
  if (isNaN(dateInFuture)) continue;

  start(dateInFuture)
}
function decomposeDate(seconds) {
  const arr = [
    Math.floor(seconds % 60),
    Math.floor((seconds / 60) % 60),
    Math.floor((seconds / (60 * 60)) % 24),
    Math.floor(seconds / (60 * 60 * 24)),
  ];

  return `${colors.green(arr.pop())} ${colors.green('дней')} ${colors.cyan(arr.pop())} ${colors.cyan('часов')} ${colors.magenta(arr.pop())} ${colors.magenta('минут')} ${colors.red(arr.pop())} ${colors.red('секунд')}`;
};

emitter.on('timerStart', ([dateInFuture, timer]) => {
    const dateNow = new Date();
    if (dateNow >= dateInFuture) {
        emitter.emit('timerEnd', timer)
    } else {
      console.log(decomposeDate((dateInFuture - dateNow) / 1000), ' осталось')
    }
})
emitter.on('timerEnd', (timer) => {
  console.log(colors.red('Время вышло'))
    clearInterval(timer)
})



function start(dateInFuture) {
    setInterval(function() {
      emitter.emit('timerStart', [dateInFuture, this])
    }, 1000)
}
