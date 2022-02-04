class Game {
    constructor(allBoard) {
        this._points = 0;
        this._userWord = "";
        this.__letters = [];
        this._userWords = [];
        this._allPossibleWords = [];
        this._randomLetters = [];
        this._boxes = boxes;
        this._board = allBoard;
        this._active = false;
        this._userPointsDisplay = userPointsDisplay;
        this._userWordsDisplay = userWordsDisplay;
        this.generateLetters();
        this.populateBoard();
        this.addMouseDown();
        this.addMouseUp();
        this.getAllPossibleWords();
    }

    generateLetters() {
        for (let index = 0; index < 16; index++) {
            const alphabet = (`abcdefghijklmnopqrstuvwxyz`.toUpperCase()).split("");
            let randomLetter = (alphabet[Math.round(Math.random() * alphabet.length)]);
            if (randomLetter !== undefined) {
                this._randomLetters.push(randomLetter);
            } else {
                this._randomLetters.push("O");
            }
        }
    }

    populateBoard() {
        const length = [...this._boxes].length

        for (let index = 0; index < length; index++) {
            const element = [...this._boxes][index];
            element.innerText = `${this._randomLetters[index]}`
        }
    }

    addMouseDown = () => {
        this._active = true;
        // console.log(this._boxes);
        // console.log(this._board._element)
        this._board._element.addEventListener("mousedown", (event) => {
            // console.log(event.target.innerText);
            if (this._active) {
                this.addMouseMove();
            }
        });
    };

    addMouseMove = () => {
        this._board._element.addEventListener("mousemove", (event) => {
            // console.log("mousemov", event.target.innerText);
            this.__letters.push(event.target.innerText);
        })
        // console.log("letters out", this.__letters);
        this.filterLetters(this.__letters);
    }

    addMouseUp = () => {
        this._board._element.addEventListener("mouseup", (event) => {
            // console.log("mouseUp", event.target.innerText);
            this._board._element.removeEventListener("mousemove", this.addMouseMove());
            this._active = false;

            this.checkIfUserWordMatches()
        })
    }

    filterLetters = (arr) => {
        let newArr = []
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];

            if (arr[i] !== arr[i + 1]) {
                newArr.push(item);
            }
        }

        this._userWord = newArr.join('');
        // console.log("User word", this._userWord)
    }

    getAllPossibleWords() {
        let lettersToString = this._randomLetters.join("");
        fetch(`https://api.codebox.org.uk/boggle/${lettersToString}`, {
                "method": "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                this._allPossibleWords = data;
                console.log(data)
            });
    }

    checkIfUserWordMatches() {
        // console.log("active", this._active);
        // console.log("word", this._userWord);
        // console.log("Includes?", this._allPossibleWords.includes(this._userWord));

        if (this._allPossibleWords.includes(this._userWord)) {
            this._userWords.push(this._userWord);
            this._points++;
        }
        this.updateResult();

        this._userWord = "";
        this.__letters = [];
    }

    updateResult() {
        console.log(this._points, this._userWords)
        this._userPointsDisplay.innerText = this._points;
        this._userWordsDisplay.innerText = this._userWords;


        //Update Score
        // const updateScore = (points) => {
        //     const display = document.querySelector(".points");
        //     display.innerText = points;
        // };

    }
}

class Board {
    constructor(element) {
        this._element = element;
    }

    get element() {
        return this._element;
    }
}

const allBoard = document.querySelector(".board");
const boxes = document.querySelectorAll(".box");
const userWordsDisplay = document.querySelector(".words_list")
const userPointsDisplay = document.querySelector(".points")
const board = new Board(allBoard, boxes, userPointsDisplay, userWordsDisplay);
const game = new Game(board);