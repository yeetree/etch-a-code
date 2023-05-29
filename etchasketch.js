var file = [''];
var screen = Array(10);
var line = 0;
var editline = 0;

function clear()
{
    file = [''];
    screen = Array(10);
    line = 0;
    editline = 0;
    drawarr();
}

function populate()
{
    tarea = document.getElementById("tarea");
    for(let i=0; i<10; i++)
    {
        row = document.createElement("tr");
        row.innerHTML="A"
        row.id = "r" + i;
        tarea.append(row)
    }
    drawarr();
}

function drawarr()
{
    getscreen();
    for(let i=0; i<10; i++)
    {
        row = document.getElementById("r" + i).innerHTML = screen[i]
    }
}

function getscreen()
{
    if(file.length > 9)
    {
        line = file.length-10
    }
    for(let i=0; i<10; i++)
    {
        if(file.length < i + line + 1)
        {
            screen[i] = "\t";
        }
        else
        {
            screen[i] = file[i + line];
        }
    }
}

document.onkeydown = function(e)
{
    var keycode = e.key;
    if(e.key.length == 1 && file[editline].length < 28)
    { 
        file[editline] += keycode;
        drawarr();
    }
}

function tab() {
    if(file[editline].length < 25)
    {
        file[editline] += "  "
        drawarr();
    }
}

function newline()
{
    file.push("");
    editline++;
    drawarr()
}

function exp()
{
    fname = window.prompt("What do you want to save this file as?");
    if(fname != null)
    {
        var dwn = document.createElement("a")
        dwn.setAttribute('href', "data:text/plain;charset=utf-8,'" + encodeURIComponent(file.join("\n")))
        dwn.setAttribute('download', fname);
        dwn.style.display = 'none';
        document.body.appendChild(dwn);
        dwn.click();
        document.body.removeChild(dwn);
    }
}