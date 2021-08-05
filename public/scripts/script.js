// Abstract Class
class Player {
  constructor() {
    this.batu = document.getElementsByClassName("batu");
    this.kertas = document.getElementsByClassName("kertas");
    this.gunting = document.getElementsByClassName("gunting");
    this.score = [];
    this.choice;
  }
}

const Computer = (Base) =>
  class extends Base {
    randomPick = (max) => Math.floor(Math.random() * max);
  };

// Inheritance
class Player_1 extends Player {
  constructor(batu, kertas, gunting, score, choice) {
    super(batu, kertas, gunting, score, choice);
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
  constructor(batu, kertas, gunting, score, choice) {
    super(batu, kertas, gunting, score, choice);
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
    this.gamesResult = "Not decided yet!";
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

  _playerOneWin = (player = "Player") => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "PLAYER WIN";
    this.resultContainer.appendChild(this.resultText);
    this.gamesResult = `${player} Win`;
    this.logger(`Result : ${player} Win, great ! :)`);
    return this.gamesResult;
  };

  _playerTwoWin = (player = "Com") => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    this.gamesResult = `${player} Win`;
    this.logger(`Result : ${player} Win, YOU lose :(`);
    return this.gamesResult;
  };

  _drawResult = () => {
    this.resultContainer.classList.add("versus_result");
    this.resultContainer.classList.add("draw");
    this.resultText.innerHTML = "DRAW";
    this.resultContainer.appendChild(this.resultText);
    this.gamesResult = `Draw`;
    this.logger("Result : Draw, GG !");
    return this.gamesResult;
  };

  decision = (playerOne, playerTwo) => {
    if (
      (playerOne === "batu" && playerTwo === "batu") ||
      (playerOne === "kertas" && playerTwo === "kertas") ||
      (playerOne === "gunting" && playerTwo === "gunting")
    ) {
      return this._drawResult();
    } else if (
      (playerOne === "batu" && playerTwo === "gunting") ||
      (playerOne === "kertas" && playerTwo === "batu") ||
      (playerOne === "gunting" && playerTwo === "kertas")
    ) {
      return this._playerOneWin();
    } else if (
      (playerOne === "batu" && playerTwo === "kertas") ||
      (playerOne === "kertas" && playerTwo === "gunting") ||
      (playerOne === "gunting" && playerTwo === "batu")
    ) {
      return this._playerTwoWin();
    }
  };
}

class Game extends Rules {
  constructor(gamesResult) {
    super(gamesResult);
    this.resetResult = document.getElementById("reset");
    this.#initiation();
  }

  #initiation() {
    this.p1 = new Player_1();
    this.p2 = new Player_2();
    this._defaultState();
    this.resetButton();
  }

  getUserPick = (choice) => {
    this.p1.choice = choice;
    this.logger(`Player choose: ${choice}`);
    return this.p1.choice;
  };

  getComPick = (choice) => {
    this.p2.choice = choice;
    this.logger(`Com choose: ${choice}`);
    return this.p2.choice;
  };

  setPlayerOneListener = () => {
    this.p1.batu[0].onclick = () => {
      this.getUserPick("batu");
      this.p1.batu[0].classList.add("active_choice");
      this.p1.kertas[0].classList.remove("active_choice");
      this.p1.gunting[0].classList.remove("active_choice");
      this.removePlayerListener();
      this.comDecideResult();
    };

    this.p1.kertas[0].onclick = () => {
      this.getUserPick("kertas");
      this.p1.batu[0].classList.remove("active_choice");
      this.p1.kertas[0].classList.add("active_choice");
      this.p1.gunting[0].classList.remove("active_choice");
      this.removePlayerListener();
      this.comDecideResult();
    };

    this.p1.gunting[0].onclick = () => {
      this.getUserPick("gunting");
      this.p1.batu[0].classList.remove("active_choice");
      this.p1.kertas[0].classList.remove("active_choice");
      this.p1.gunting[0].classList.add("active_choice");
      this.removePlayerListener();
      this.comDecideResult();
    };
  };

  setPlayerTwoListener(choice) {
    switch (choice) {
      case "batu":
        this.getComPick("batu");
        this.p2.batu[1].classList.add("active_choice");
        this.p2.kertas[1].classList.remove("active_choice");
        this.p2.gunting[1].classList.remove("active_choice");
        break;
      case "kertas":
        this.getComPick("kertas");
        this.p2.batu[1].classList.remove("active_choice");
        this.p2.kertas[1].classList.add("active_choice");
        this.p2.gunting[1].classList.remove("active_choice");
        break;
      case "gunting":
        this.getComPick("gunting");
        this.p2.batu[1].classList.remove("active_choice");
        this.p2.kertas[1].classList.remove("active_choice");
        this.p2.gunting[1].classList.add("active_choice");
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
    setTimeout(() => {
      if (this.p1.choice && this.p2.choice) {
        this.decision(this.p1.choice, this.p2.choice);
      }
      this.p1.choice = null;
      this.p2.choice = null;

      console.log(game.gamesResult);
    }, 400);
  };

  comDecideResult() {
    switch (this.p2.randomPick(3)) {
      case 2:
        this.setPlayerTwoListener("batu");
        this.result();
        break;
      case 1:
        this.setPlayerTwoListener("kertas");
        this.result();
        break;
      case 0:
        this.setPlayerTwoListener("gunting");
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
    this.setPlayerOneListener();
  }
}

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

const game = new Game();
game.play();
/*
--------------------------------------
  Bismillah lulus Binar Academy
  Copyright of Sami Kalammallah
--------------------------------------
*/
