// TODO
// DOESNT WORK ON WEBSITES THAT USE THINGS LIKE REACT O NEXT WHERE THE PAGE DOESNT RELOAD

const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, span, p, a, li, input, button, parentDiv, i, select");

const reals = [];

const words = ["site", "late", "and"];
let filterType = 0;
// 0: just the string
// 1: all words containing the string
let censorType = 0;
// 0: asterisks
// 1: boxes
// 2: just remove
// 3: custom string
let customCensorString = "";

let parentDiv = document.createElement("div");
parentDiv.className = "sieveParentDiv sieveLexendDeca";

let div = document.createElement("div");
div.className = "sieveDiv";
div.style.display = "none";

let h1 = document.createElement("h1");
h1.className = "sieveTitle";
t = document.createTextNode("Sieve");
h1.appendChild(t);
div.appendChild(h1);

let filterD = document.createElement("div");
filterD.className = "sieveSubDiv";
let dSpan1 = document.createElement("span");
dSpan1.className = "sieveSubDivText";
t = document.createTextNode("Filter type: ");
dSpan1.appendChild(t);
filterD.appendChild(dSpan1);
let filterDropdown = document.createElement("select");
filterDropdown.className = "sieveDropdown";
let filterOption1 = document.createElement("option");
filterOption1.text = "Just the string";
filterOption1.value = 0;
filterDropdown.add(filterOption1);
let filterOption2 = document.createElement("option");
filterOption2.text = "All words containing the string";
filterOption2.value = 1;
filterDropdown.add(filterOption2);
filterD.appendChild(filterDropdown);
div.appendChild(filterD);

let censorD = document.createElement("div");
censorD.className = "sieveSubDiv";
let dSpan2 = document.createElement("span");
dSpan2.className = "sieveSubDivText";
t = document.createTextNode("Censor type: ");
dSpan2.appendChild(t);
censorD.appendChild(dSpan2);
let censorDropdown = document.createElement("select");
censorDropdown.className = "sieveDropdown";
let censorOption1 = document.createElement("option");
censorOption1.text = "Asterisks";
censorOption1.value = 0;
censorDropdown.add(censorOption1);
let censorOption2 = document.createElement("option");
censorOption2.text = "Boxes";
censorOption2.value = 1;
censorDropdown.add(censorOption2);
let censorOption3 = document.createElement("option");
censorOption3.text = "Completely remove";
censorOption3.value = 2;
censorDropdown.add(censorOption3);
let censorOption4 = document.createElement("option");
censorOption4.text = "Replace each char with custom char";
censorOption4.value = 3;
censorDropdown.add(censorOption4);
let censorOption5 = document.createElement("option");
censorOption5.text = "Replace with custom string";
censorOption5.value = 4;
censorDropdown.add(censorOption5);
censorD.appendChild(censorDropdown);
let censorInput = document.createElement("input");
censorInput.className = "sieveInput";
censorInput.style.display = "none";
censorInput.placeholder = "Enter custom string";
censorD.appendChild(censorInput);
div.appendChild(censorD);

let buttonD = document.createElement("div");
buttonD.className = "sieveSubDiv";
let saveBtn = document.createElement("button");
saveBtn.className = "sieveSaveButton";
let saveSpan = document.createElement("span");
t = document.createTextNode("Save changes");
saveSpan.appendChild(t);
saveBtn.appendChild(saveSpan);
buttonD.appendChild(saveBtn);
div.appendChild(buttonD);

parentDiv.appendChild(div);

let btn = document.createElement("button");
btn.className = "sieveButton";
let span = document.createElement("span");
t = document.createTextNode("");
span.appendChild(t);
btn.appendChild(span);
parentDiv.appendChild(btn);
document.querySelector("body").appendChild(parentDiv);

btn.addEventListener("click", function () {
    if (div.style.display == "none") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
});

filterDropdown.addEventListener("change", function () {
    filterType = filterDropdown.value;
});

censorDropdown.addEventListener("change", function () {
    censorType = censorDropdown.value;

    if (censorType == 3 || censorType == 4) {
        censorInput.style.display = "flex";
    } else {
        censorInput.style.display = "none";
    }
    if (censorType == 3) censorInput.placeholder = "Enter custom character";
});

censorInput.addEventListener("input", function () {
    customCensorString = censorInput.value;
});

saveBtn.addEventListener("click", function () {
    if (censorType == 3 && censorInput.value.length > 1) alert("Your custom character must only be one character.");
    else {
        let i = 0;
        elements.forEach(function (el) {
            if (el.tagName == "INPUT" || el.tagName == "SELECT") {
                el.value = reals[i];
            } else {
                el.innerHTML = reals[i];
            }
            i++;
        });
        doIt();
    }
});

function doIt() {
    elements.forEach(function (el) {
        if (el.tagName == "INPUT" || el.tagName == "SELECT") {
            reals.push(el.value);
            el.value = filter(el.value);
        } else {
            reals.push(el.innerHTML);
            el.innerHTML = filter(el.innerHTML);
        }
    });
}

doIt();

function filter(text) {
    for (i = 0; i < words.length; i++) {
        let regEx;
        if (filterType == 0) {
            regEx = new RegExp(words[i], "gi");
        } else if (filterType == 1) {
            regEx = new RegExp("([^\\s<>]+(" + words[i] + ")[^\\s<>]+|(" + words[i] + ")[^\\s<>]+|[^\\s<>]+(" + words[i] + ")|(" + words[i] + "))", "gi");
        }

        let replaceMask;
        if (censorType == 0) {
            replaceMask = asteriskIze(words[i]);
        } else if (censorType == 1) {
            replaceMask = boxIze(words[i]);
        } else if (censorType == 2) {
            replaceMask = "";
        } else if (censorType == 3) {
            replaceMask = customCharIze(words[i]);
        } else if (censorType == 4) {
            replaceMask = customCensorString;
        }

        if (text.includes(words[i])) text = text.replace(regEx, replaceMask);
    }

    return text;
}

function asteriskIze(text) {
    let censoredText = "";
    for (j = 0; j < text.length; j++) {
        censoredText += "*";
    }

    return censoredText;
}

function boxIze(text) {
    let censoredText = "";
    for (j = 0; j < text.length; j++) {
        censoredText += "█";
    }

    return censoredText;
}

function customCharIze(text) {
    let censoredText = "";
    for (j = 0; j < text.length; j++) {
        censoredText += customCensorString;
    }

    return censoredText;
}