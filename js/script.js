var rows = 4, cols = 4;
var gridArr = new Array(rows*cols);
var moves = 0;
var time = 0;
var isPaused = false;
var gameOver = false;
var blank;

function showTime() {
    if(!isPaused) {
        document.getElementById("time").innerHTML = time++ +"s";
    }
}

var timeInterval = setInterval("showTime()", 1000);

function createGame() {
    rows = document.getElementById("gameForm").elements["row"].value;
    cols = document.getElementById("gameForm").elements["column"].value;
    document.getElementsByClassName("selection-div")[0].style.opacity = "0";
    document.getElementsByClassName("selection-div")[0].style.visibility = "hidden";

    var gamespace = document.getElementsByClassName("game-grid-div")[0];
    for(var i = 0 ; i < rows ; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.className = "row";
        for(var j = 0; j < cols; j++) {
            var colDiv = document.createElement("div");
            colDiv.className = "column";
            var cardDiv = document.createElement("div");
            cardDiv.className = "game-card";
            cardDiv.id = i*cols+j;
            //cardDiv.onclick = "clicked(this.id)";
            cardDiv.setAttribute('onclick', 'clicked(this.id)');
            colDiv.appendChild(cardDiv);
            rowDiv.appendChild(colDiv);
        }
        gamespace.appendChild(rowDiv);
    }
    
}

function start() {
    for(var i = 0; i <rows*cols; i++) {
        var added = 0;
        while(added == 0) {
            var temp = Math.floor(Math.random()*rows*cols);
            var present = 0;
            for(var j = 0; j < i; j++) {
                if(gridArr[j] == temp) {
                    present = 1;
                    break;
                }
            }
            if(present == 0) {
                gridArr[i] = temp;
                added = 1;
            }
        }
    }
    moves = 0;
    time = 0;
    isPaused = false;
    timeInterval;
    console.log(gridArr);
}

function updateView() {
    document.getElementById("move").innerHTML = moves;
    for(var i = 0; i < rows*cols; i++) {
        document.getElementById(i).innerHTML = gridArr[i];
        document.getElementById(i).style.visibility = "visible";
        if(gridArr[i] == 0) {
            document.getElementById(i).style.visibility = "hidden";
            blank = i;
        }
        if(gridArr[i] == i+1) {
            document.getElementById(i).style.backgroundColor = "green";
        }
        else {
            document.getElementById(i).style.backgroundColor = "#f96d00";
        }
    }
    isOver();
}

function isOver() {
    var temp = 0;
    for(var i = 0 ; i < rows*cols-1 ; i++) {
        if(gridArr[i] != (i+1)) {
            temp = 1;
            break;
        }
    }
    if(temp == 0) {
        isPaused = true;
        gameOver = true;
        document.getElementById("timewin").innerHTML = time++ +"s";
        document.getElementById("movewin").innerHTML = moves;
        document.getElementsByClassName("win-div")[0].style.visibility = "visible";
        document.getElementsByClassName("win-div")[0].style.opacity = "1";
    }
}


function newGame() {
    if(gameOver == true) {
        document.getElementsByClassName("win-div")[0].style.visibility = "hidden";
        document.getElementsByClassName("win-div")[0].style.opacity = "0";
        gameOver = false;
        isPaused = false;
    } 
    start();
    // uncomment the below line to see the winning section.
    //gridArr = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15);
    updateView();
    document.getElementById("time").innerHTML = time+"s";
}

function clicked(clickedId) {
    if(!isPaused) {
        if(Math.floor(clickedId/cols) == Math.floor(blank/cols)) {
            if(clickedId > blank) {
                moves += clickedId-blank;
                for(var i = blank; i < clickedId; i++) {
                    gridArr[i] = gridArr[i+1];
                }
                gridArr[clickedId] = 0;
            }
            else {
                moves += blank - clickedId;
                for(var i = blank; i > clickedId; i--) {
                    gridArr[i] = gridArr[i-1];
                }
                gridArr[clickedId] = 0;
            }
        }
        if(clickedId%cols == blank%cols) {
            var blankRow = Math.floor(blank/cols);
            var clickRow = Math.floor(clickedId/cols);
            var temp = clickedId%cols;
            if(clickedId > blank) {
                moves += clickRow - blankRow;
                for(var i = blankRow; i < clickRow; i++) {
                    gridArr[i*cols+temp] = gridArr[(i+1)*cols+temp];
                }
                gridArr[clickRow*cols+temp] = 0;
            }
            else {
                moves += blankRow - clickRow;
                for(var i = blankRow; i > clickRow; i--) {
                    gridArr[i*cols+temp] = gridArr[(i-1)*cols+temp];
                }
                gridArr[clickRow*cols+temp] = 0;
            }
        }
        updateView();
    }
    
}

function pause() {
    if(gameOver == false) {
        if(isPaused) {
            isPaused = false;
            document.getElementById("pause").innerHTML = "Pause";
        }
        else {
            isPaused = true;
            document.getElementById("pause").innerHTML = "Resume";
        }
    }
}