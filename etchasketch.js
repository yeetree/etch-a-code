var file = [''];
var screen = Array(10);
var line = 0;
var editline = 0;
var edit = true;

function clear() {
    file = [''];
    screen = Array(10);
    line = 0;
    editline = 0;
    drawarr();
}

function populate() {
    document.getElementById("bg").addEventListener("keydown", function (e) {
        var keycode = e.key;
        if (e.key.length == 1 && file[editline].length < 28) {
            file[editline] += keycode;
            drawarr();
        }
    })

    tarea = document.getElementById("tarea");
    for (let i = 0; i < 10; i++) {
        row = document.createElement("tr");
        row.innerHTML = "A"
        row.id = "r" + i;
        tarea.append(row)
    }
    document.getElementById("bg").focus();
    drawarr();
}

function drawarr() {
    getscreen();
    for (let i = 0; i < 10; i++) {
        row = document.getElementById("r" + i).innerHTML = screen[i]
    }
}

function getscreen() {
    if (file.length > 9) {
        line = file.length - 10
    }
    for (let i = 0; i < 10; i++) {
        if (file.length < i + line + 1) {
            screen[i] = "\t";
        }
        else {
            screen[i] = file[i + line];
        }
    }
}

function tab() {
    if (file[editline].length < 25) {
        file[editline] += "  "
        drawarr();
    }
    document.getElementById("bg").focus();
}

function newline() {
    file.push("");
    editline++;
    drawarr()
    document.getElementById("bg").focus();
}

function exp() {
    fname = window.prompt("What do you want to save this file as?");
    if (fname != null) {
        var dwn = document.createElement("a")
        dwn.setAttribute('href', "data:text/plain;charset=utf-8,'" + encodeURIComponent(file.join("\n")))
        dwn.setAttribute('download', fname);
        dwn.style.display = 'none';
        document.body.appendChild(dwn);
        dwn.click();
        document.body.removeChild(dwn);
    }
}

function togmode() {
    if (edit) {
        document.getElementById("tog").innerHTML = "Edit";
        document.getElementById("term").removeAttribute("style");
        document.getElementById("bg").removeAttribute("style");
        document.getElementById("bg").setAttribute("style", "display:none; z-index: 0;");
        document.getElementById("term").setAttribute("style", "z-index: 1;");
        document.getElementById("termtxt").focus();
        edit = false;
    }
    else {
        document.getElementById("tog").innerHTML = "Run";
        document.getElementById("term").removeAttribute("style");
        document.getElementById("bg").removeAttribute("style");
        document.getElementById("bg").setAttribute("style", "z-index: 1;");
        document.getElementById("term").setAttribute("style", "display:none; z-index: 0;");
        document.getElementById("bg").focus();
        edit = true;
    }
}