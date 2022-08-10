'use strict'

var day = document.querySelector('.day');
var goal = document.querySelector('.goal');
var left = document.querySelector('.left')
var addButton = document.querySelector('.add-button');
var clearButton = document.querySelector('.clear-button')
var drop = document.querySelector('#change');
var input = document.querySelector('.input');


function getDay() {
    let date = new Date();
    let today = date.getDay();
    let days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[today];
}
function getTime() {
    function addZero(num) {
        if (num >= 0 && num <= 9) {
            return '0' + num;
        } else {
            return num;
        }
    }
    let date = new Date();
    let time = addZero(date.getHours()) + ':' + addZero(date.getMinutes());
    return time;
}
function createDoneImg () {
    let done = document.createElement('img');
    done.setAttribute('src', 'cat.png');
    done.classList.add('done-img');
    document.querySelector('.container').appendChild(done);
}

day.innerHTML = 'Day: ' + getDay();

function addGlassInDrop() {
    let a = 0;
    let counter = 0;
    
    function change(delta) {
    drop.classList.add('change-bg');
    return drop.style.width = `${a += delta}%`;
    }
    function getNumberOfGlasses() {
        let numberOfGlasses = Math.round((25 * input.value)/200);
        goal.innerHTML = 'Goal: ' + numberOfGlasses + ' glasses';
        return numberOfGlasses;
    }
    addButton.addEventListener('click', function () {
        if (input.value == 0 || input.value == undefined) {
            alert('Enter correct weight');
        } else {
            counter++;
            change((100 / getNumberOfGlasses()));
            let leftGlasses = getNumberOfGlasses() - counter;
            left.innerHTML = 'Left: ' + leftGlasses + ' glasses';
            let timeGlass = document.createElement('div');
            timeGlass.classList.add('count-glass');
            timeGlass.innerHTML = counter + ' glass: ' + getTime();
            document.querySelector('.glasses').appendChild(timeGlass);
            if (drop.style.width == (100 + '%')) {
                addButton.disabled = true;
                createDoneImg();
                setTimeout(function () {
                    document.querySelector('img').style.display = 'none';
                }, 3000);
            }
        }
        

    })
    clearButton.addEventListener('click', function () {
        a = 0;
        counter = 0;
        drop.style.width = 0;
        goal.innerHTML = '';
        left.innerHTML = '';
        input.value = '';
        document.querySelector('.glasses').innerHTML = '';
    })
}

addGlassInDrop();

