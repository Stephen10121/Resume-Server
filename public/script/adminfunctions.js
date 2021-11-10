function checkInputValidity(input) {
    if (input == "") {
        return false
    } else {
        return true
    }
}

function connectId() {
    const idInput = document.getElementById("machineId");
    const idSubmit = document.getElementById("connectId");
    const idNotSubmit = document.getElementById("disconnectId");
    if (checkInputValidity(idInput.value) == true) {
        idInput.style.display = "none";
        idSubmit.style.display = "none";
        idNotSubmit.innerHTML = `Connected to ${idInput.value}. Disconnect`;
        idNotSubmit.style.display = "block";
    } else {
        alert("Empty Field.");
    }
}

function disconnectId() {
    const idInput = document.getElementById("machineId");
    const idSubmit = document.getElementById("connectId");
    const idNotSubmit = document.getElementById("disconnectId");
    idInput.style.display = "inline-block";
    idSubmit.style.display = "inline-block";
    idNotSubmit.innerHTML = `Connected to ${idInput.value}. Disconnect`;
    idNotSubmit.style.display = "none";
}

function setPerc(percentage) {
    let perc = prevperc;
    let jeff = setInterval(()=> {
        if (perc==percentage) {
            prevperc = perc;
            clearInterval(jeff);
        }
        textPerc.innerHTML = `${perc}%`;
        roundPerc.style.strokeDashoffset = map_range(perc);
        if (percentage<perc) {
            perc--;
        } else {
            perc++;
        }
    }, 10);
}

function map_range(value) {
    return 189 + (0 - 189) * (value - 0) / (100 - 0);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function customCommand() {
    console.log("Custom Command");
}