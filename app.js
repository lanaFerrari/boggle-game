class Game {
    constructor(allBoard) {
        this._points = 0;
        this._userWord = "";
        this._letters = [];
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
        this._board._element.addEventListener("mousedown", (event) => {
            this.addMouseMove(true);
        });
    };

    addMouseMove = (active) => {
        this._active = active;
        this._board._element.addEventListener("mousemove", (event) => {
            if (this._active) {
                this._letters.push({
                    id: event.target.id,
                    letter: event.target.innerText,
                });

                let boxes = [...event.target.classList]

                if (boxes[0] === 'box') {
                    event.target.classList.add("active");
                }

                return boxes;
            }
        })
        this.addMouseUp(boxes);
        this.filterLetters(this._letters);
    }

    addMouseUp = (boxesList) => {
        if (boxesList) {
            let boxes = [...boxesList]

            const filteredBoxes = boxes.map(item => {
                let classes = [...item.classList];

                if (classes.includes('active')) {
                    item.classList.remove("active");
                }
            })
        }

        this._board._element.addEventListener("mouseup", (event) => {

            this._board._element.removeEventListener("mousemove", this.addMouseMove());
            this._active = false;
            this.checkIfUserWordMatches()
        })
    }

    filterLetters = (arr) => {
        let newArr = [];
        let uniq = {};
        const filteredArr = arr.filter(obj => !uniq[obj.id] && (uniq[obj.id] = true));

        for (let i = 0; i < filteredArr.length; i++) {
            const element = filteredArr[i];
            newArr.push(element.letter);
        }

        const cleanArr = newArr.filter(letter => letter.length === 1)
        this._userWord = cleanArr.join('');
    }

    getAllPossibleWords() {
        let lettersToString = this._randomLetters.join("");
        fetch(`https://api.codebox.org.uk/boggle/${lettersToString}`, {
                "method": "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                this._allPossibleWords = data;
                console.log(data);
            });
    }

    checkIfUserWordMatches() {
        if (this._allPossibleWords.includes(this._userWord) && !this._userWords.includes(this._userWord)) {
            this._userWords.push(this._userWord);
            this._points++;
        }
        this.updateResult();

        this._userWord = "";
        this._letters = [];
    }

    updateResult() {
        if (this._points && this._userWords) {
            this._userPointsDisplay.innerText = this._points;
            this._userWordsDisplay.innerText = this._userWords;
        }
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
const userWordsDisplay = document.querySelector(".words-list")
const userPointsDisplay = document.querySelector(".points")
const board = new Board(allBoard, boxes, userPointsDisplay, userWordsDisplay);
const game = new Game(board);