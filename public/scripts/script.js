// Abstract Class
class Player {
  constructor() {
    this.batu = document.getElementsByClassName("batu");
    this.kertas = document.getElementsByClassName("kertas");
    this.gunting = document.getElementsByClassName("gunting");
  }
}

const Computer = (Base) =>
  class extends Base {
    randomPick = (max) => Math.floor(Math.random() * max);
  };

// Inheritance
class Player_1 extends Player {
  constructor(batu, kertas, gunting) {
    super(batu, kertas, gunting);
    this.#initiation();
  }

  // Encapsulation
  #initiation() {
    this.batu[0].id = "batu-player";
    this.kertas[0].id = "kertas-player";
    this.gunting[0].id = "gunting-player";
  }
}

// Polymorphism
class Player_2 extends Computer(Player) {
  constructor(batu, kertas, gunting) {
    super(batu, kertas, gunting);
    this.#initiation();
  }

  #initiation() {
    this.batu[1].id = "batu-com";
    this.kertas[1].id = "kertas-com";
    this.gunting[1].id = "gunting-com";
  }
}

class Rules {
  constructor() {
    this.resultText = document.createElement("H1");
    this.resultContainer = document.getElementById("vs_result");
    this.user_choice;
    this.com_choice;
  }

  logger = (text) => {
    console.log("----------");
    console.log(text);
  };

  _defaultState = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.remove("versus_result");
    this.resultText.innerHTML = "VS";
    this.resultContainer.appendChild(this.resultText);
  };

  _winResult = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "PLAYER WIN";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : PLAYER Win, great ! :)");
  };

  _loseResult = () => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : COM Win, YOU lose :(");
  };

  _drawResult = () => {
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.add("draw");
    this.resultText.innerHTML = "DRAW";
    this.resultContainer.appendChild(this.resultText);
    this.logger("Result : Draw, GG !");
  };

  decision = (userChoice, botChoice) => {
    if (
      (userChoice === "batu" && botChoice === "batu") ||
      (userChoice === "kertas" && botChoice === "kertas") ||
      (userChoice === "gunting" && botChoice === "gunting")
    ) {
      return this._drawResult();
    } else if (
      (userChoice === "batu" && botChoice === "gunting") ||
      (userChoice === "kertas" && botChoice === "batu") ||
      (userChoice === "gunting" && botChoice === "kertas")
    ) {
      return this._winResult();
    } else if (
      (userChoice === "batu" && botChoice === "kertas") ||
      (userChoice === "kertas" && botChoice === "gunting") ||
      (userChoice === "gunting" && botChoice === "batu")
    ) {
      return this._loseResult();
    }
  };
}

class Game extends Rules {
  constructor(user_choice, com_choice) {
    super(user_choice, com_choice);
    this.resetResult = document.getElementById("reset");
    this.#initiation();
  }

  #initiation() {
    this.user = new Player_1();
    this.com = new Player_2();
    this._defaultState();
    this.resetButton();
  }

  getUserPick = (choice) => {
    this.user_choice = choice;
    this.logger(`Player choose: ${this.user_choice}`);
    return this.user_choice;
  };

  getComPick = (choice) => {
    this.com_choice = choice;
    this.logger(`Com choose: ${this.com_choice}`);
    return this.com_choice;
  };

  setPlayerListener = () => {
    this.user.batu[0].onclick = () => {
      this.getUserPick("batu");
      this.user.batu[0].classList.add("active_choice");
      this.user.kertas[0].classList.remove("active_choice");
      this.user.gunting[0].classList.remove("active_choice");
      this.removePlayerListener();
      this.decideResult();
    };

    this.user.kertas[0].onclick = () => {
      this.getUserPick("kertas");
      this.user.batu[0].classList.remove("active_choice");
      this.user.kertas[0].classList.add("active_choice");
      this.user.gunting[0].classList.remove("active_choice");
      this.removePlayerListener();
      this.decideResult();
    };

    this.user.gunting[0].onclick = () => {
      this.getUserPick("gunting");
      this.user.batu[0].classList.remove("active_choice");
      this.user.kertas[0].classList.remove("active_choice");
      this.user.gunting[0].classList.add("active_choice");
      this.removePlayerListener();
      this.decideResult();
    };
  };

  setComListener(choice) {
    switch (choice) {
      case "batu":
        this.getComPick("batu");
        this.com.batu[1].classList.add("active_choice");
        this.com.kertas[1].classList.remove("active_choice");
        this.com.gunting[1].classList.remove("active_choice");
        break;
      case "kertas":
        this.getComPick("kertas");
        this.com.batu[1].classList.remove("active_choice");
        this.com.kertas[1].classList.add("active_choice");
        this.com.gunting[1].classList.remove("active_choice");
        break;
      case "gunting":
        this.getComPick("gunting");
        this.com.batu[1].classList.remove("active_choice");
        this.com.kertas[1].classList.remove("active_choice");
        this.com.gunting[1].classList.add("active_choice");
        break;
      default:
        break;
    }
  }

  removePlayerListener = () => {
    document.getElementsByClassName("batu")[0].disabled = true;
    document.getElementsByClassName("kertas")[0].disabled = true;
    document.getElementsByClassName("gunting")[0].disabled = true;
  };

  result = () => {
    setInterval(() => {
      if (this.user_choice && this.com_choice) {
        this.decision(this.user_choice, this.com_choice);
      }
      this.user_choice = null;
      this.com_choice = null;
    }, 400);
  };

  decideResult() {
    switch (this.com.randomPick(3)) {
      case 2:
        this.setComListener("batu");
        this.result();
        break;
      case 1:
        this.setComListener("kertas");
        this.result();
        break;
      case 0:
        this.setComListener("gunting");
        this.result();
        break;
      default:
        break;
    }
  }

  resetButton() {
    this.resetResult.onclick = () => {
      this.logger("Game restarted !");
      this._defaultState();
      document.querySelectorAll(".choice").forEach((userButton) => {
        userButton.classList.remove("active_choice");
        userButton.disabled = false;
      });
    };
  }

  play() {
    this.logger("Lets play traditional games!");
    this.setPlayerListener();
  }
}

const game = new Game();
game.play();

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

const times = new DateTimes();
const gameHistory = "http://localhost:8080/v2/games";

async function sendReq(method, url = "", data) {
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// sendReq("POST", gameHistory, {
//   player_one: "sami",
//   player_two: "com",
//   result: "sami win",
//   times: times.now(),
// }).then((data) => console.log("Success : ", data));

/*
--------------------------------------
  Bismillah lulus Binar Academy
  Copyright of Sami Kalammallah
--------------------------------------
*/
