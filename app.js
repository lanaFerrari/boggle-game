class Game {
    constructor(board) {
        this._points = 0;
        this._userWord = "";
        this._userWords = [];
        this._allPossibleWords = [];
        this._randomLetters = [];
        this._box = box;
        this._board = board;
        this._offsetX = 0;
        this._offsetY = 0;
        this._active = false;
        this.generateLetters();
        this.populateBoard();
        this.addClickListener();
        this.addMouseMove();
        this.addMouseUp()
        this.getAllPossibleWords();
    }

    generateLetters() {
        for (let index = 0; index < 16; index++) {
            const alphabet = (`abcdefghijklmnopqrstuvwxyz`.toUpperCase()).split("");
            let randomLetter = (alphabet[Math.round(Math.random() * alphabet.length)]);
            if (randomLetter !== undefined) {
                this._randomLetters.push(randomLetter);
            } else {
                this._randomLetters.push("A");
            }
        }
    }

    populateBoard() {
        const length = [...this._box].length

        for (let index = 0; index < length; index++) {
            const element = [...this._box][index];
            element.innerText = `${this._randomLetters[index]}`
        }
    }


    // Get letters and save into a word
    // Check if the data array contains the word 
    // if yes - add to listOfWords and display in .words_list
    // if yes - add one point and display .points
    // else - erase word 
    addClickListener() {
        // console.log(this._box);
        // console.log(this._board._element);
        this._board._element.addEventListener('mousedown', (e) => {
            e.preventDefault()
            this._offsetX = e.offsetX;
            this._offsetY = e.offsetY;
            this._active = true;
            // console.log(e)
            console.log("first coordenates", this._offsetX, this._offsetY)
            console.log("mousedown", e.target.innerText, this._active);
            return e.offsetX;
            this._offsetY = e.offsetY;
        })
        return this._active

        this._offsetX
        this._offsetY
        // console.log(this._board.element);

    }

    addMouseMove() {

        this._board._element.addEventListener('mousemove', (e) => {
            // e.preventDefault()
            console.log("hello", this._active);
            // if (this._active) {
            console.log("prev coordenates", this._offsetX, this._offsetY)
            this._offsetX = e.offsetX;
            this._offsetY = e.offsetY;
            console.log("new coordenates", this._offsetX, this._offsetY)
            // }

            console.log("mousemove", e.target.innerText, this._active);
            // this._userWord += item.innerText;
            // console.log("word", this._userWord);
        })

    }

    addMouseUp() {

        this._board._element.addEventListener('mouseup', (e) => {
            e.preventDefault()

            if (this._active) {
                console.log("prev coordenates inside mouseup", this._offsetX, this._offsetY)
                this._offsetX = 0
                this._offsetY = 0
                this._active = false;
                console.log("new coordenates inside mouseup", this._offsetX, this._offsetY, this._active)
            }



            // console.log(this._board.element);
        })
    }

    getAllPossibleWords() {
        let lettersToString = this._randomLetters.join("");
        fetch(`https://api.codebox.org.uk/boggle/${lettersToString}`, {
                "method": "GET",
            })
            .then((response) => response.json())
            .then((data) => {
                this._allPossibleWords = data;
                console.log(this._allPossibleWords)
            });
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

const box = document.querySelectorAll(".box");
const board = new Board(document.querySelector(".board"), box);
const game = new Game(board);


//Update Score
const updateScore = (points) => {
    const display = document.querySelector(".points");
    display.innerText = points;
};