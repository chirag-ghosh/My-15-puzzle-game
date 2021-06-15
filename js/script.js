var rows = 4, cols = 4;
var gridArr = new Array(rows*cols);
var moves = 0;
var time = 0;
var isPaused = true;
var blank;

function showTime() {
    if(!isPaused) {
        document.getElementById("time").innerHTML = time++ +"s";
    }
}

var timeInterval = setInterval("showTime()", 1000);

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
    for(var i = 0; i < 16; i++) {
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
}


function newGame() {
    start();
    updateView();
    document.getElementById("time").innerHTML = time+"s";
}

function clicked(clickedId) {
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

function pause() {
    if(isPaused) {
        isPaused = false;
        document.getElementById("pause").innerHTML = "Pause";
    }
    else {
        isPaused = true;
        document.getElementById("pause").innerHTML = "Resume";
    }
}