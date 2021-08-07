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
    this.data;
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
    this.data;
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

  _playerOneWin = ({ username }) => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "PLAYER WIN";
    this.resultContainer.appendChild(this.resultText);
    this.gamesResult = `${username} Win`;
    this.logger(`Result : ${username} Win, great ! :)`);
    return this.gamesResult;
  };

  _playerTwoWin = ({ username }) => {
    this.resultContainer.classList.remove("draw");
    this.resultContainer.classList.add("versus_result");
    this.resultText.innerHTML = "COM WIN";
    this.resultContainer.appendChild(this.resultText);
    this.gamesResult = `${username} Win`;
    this.logger(`Result : ${username} Win, awesome ! :)`);
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
    const p1_batu = playerOne.choice === "batu";
    const p1_kertas = playerOne.choice === "kertas";
    const p1_gunting = playerOne.choice === "gunting";

    const p2_batu = playerTwo.choice === "batu";
    const p2_kertas = playerTwo.choice === "kertas";
    const p2_gunting = playerTwo.choice === "gunting";

    if (
      (p1_batu && p2_batu) ||
      (p1_kertas && p2_kertas) ||
      (p1_gunting && p2_gunting)
    ) {
      return this._drawResult();
    } else if (
      (p1_batu && p2_gunting) ||
      (p1_kertas && p2_batu) ||
      (p1_gunting && p2_kertas)
    ) {
      return this._playerOneWin(playerOne.data);
    } else if (
      (p1_batu && p2_kertas) ||
      (p1_kertas && p2_gunting) ||
      (p1_gunting && p2_batu)
    ) {
      return this._playerTwoWin(playerTwo.data);
    }
  };
}

class Game extends Rules {
  constructor(gamesResult) {
    super(gamesResult);
    this.resetResult = document.getElementById("reset");
    this.id = document.querySelector("#game").dataset.id;
    this.#initiation();
  }

  #initiation() {
    this.p1 = new Player_1();
    this.p2 = new Player_2();
    this.p1.data = document.querySelector("#player").dataset;
    this.p2.data = document.querySelector("#player-2").dataset;

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

  sendData() {
    const { id: id_1, username: username_1 } = this.p1.data;
    const { id: id_2, username: username_2 } = this.p2.data;
    2;
    sendReq("PUT", gameHistory(this.id), {
      player_one: username_1,
      player_two: username_2,
      result: this.gamesResult,
      times: times.now(),
    });

    sendReq("PUT", updateWin(id_1));
    sendReq("PUT", updateLose(id_1));

    // sendReq("PUT", updateWin(id_2));
    // sendReq("PUT", updateLose(id_2));
  }

  result = () => {
    setTimeout(() => {
      if (this.p1 && this.p2) {
        this.decision(this.p1, this.p2);
      }
      this.p1.choice = null;
      this.p2.choice = null;

      this.sendData();
    }, 400);
  };
}

const game = new Game();
game.play();
/*
--------------------------------------
  Bismillah lulus Binar Academy
  Copyright of Sami Kalammallah
--------------------------------------
*/
