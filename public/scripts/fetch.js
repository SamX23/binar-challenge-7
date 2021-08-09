class DateTimes {
  constructor() {
    this.d = new Date();
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  }

  times = () => {
    let hours = this.d.getHours();
    let minutes = this.d.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  now = () =>
    `${this.d.getDate()} ${
      this.months[this.d.getMonth()]
    } ${this.d.getFullYear()} - ${this.times()}`;
}

const SRC = window.location.origin;
const times = new DateTimes();

const gameHistory = (id) => `${SRC}/room/update/${id}`;
const updateWin = (id) => `${SRC}/user/update/win/${id}`;
const updateLose = (id) => `${SRC}/user/update/lose/${id}`;
const updateScore = (id) => `${SRC}/user/update/score/${id}`;

async function sendReq(method, url = "", data) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}
