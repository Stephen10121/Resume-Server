const textPerc = document.getElementById("perc");
const roundPerc = document.getElementById("progress-circle");

function map_range(value) {
    return 189 + (0 - 189) * (value - 0) / (100 - 0);
}

function setPerc(percentage) {
    let perc = 1;
    let jeff = setInterval(()=> {
        if (perc==percentage) {
            clearInterval(jeff);
        }
        textPerc.innerHTML = `${perc}%`;
        roundPerc.style.strokeDashoffset = map_range(perc);
        perc++;
    }, 10);
}

setPerc(50);

//189 0
//0 100