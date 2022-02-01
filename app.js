class Game {
    constructor(board) {
        this._points = 0;
        this._userWord = "";
        this._userWords = [];
        this._allPossibleWords = [];
        this._randomLetters = [];
        this._box = box;
        this._board = board;
        this.generateLetters();
        this.populateBoard();
        this.addClickListener();
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
            console.log("Elemnt", element)
        }
    }


    // Get letters and save into a word
    // Check if the data array contains the word 
    // if yes - add to listOfWords and display in .words_list
    // if yes - add one point and display .points
    // else - erase word 
    addClickListener() {
        this._board.element.addEventListener('click', (e) => {
            e.preventDefault();


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
                // console.log(this._allPossibleWords)
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