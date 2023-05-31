extime = 5;
cancel = false;

ascii = [
    '&#00;','&#01;','&#02;','&#03;','&#04;','&#05;','&#06;','&#;07',
    '&#08;','&#09;','&#10;','&#11;','&#12;','&#13;','&#14;','&#15;',
    '&#16;','&#17;','&#18;','&#19;','&#20;','&#21;','&#22;','&#23;',
    '&#24;','&#25;','&#26;','&#27;','&#28;','&#29;','&#30;','&#31',
    ' ', '!', '"', '#', '$', '%', '&', '\'',
    '(', ')', '*', '+', ',', '-', '.', '/',
    '0', '1', '2', '3', '4', '5', '6', '7',
    '8', '9', ':', ';', '<', '=', '>', '?',
    '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
    'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'L', 'S', 'T', 'U', 'V', 'W',
    'X', 'Y', 'Z', '[', '\\' ,']', '^', '_',
    '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
    'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
    'x', 'y', 'z', '{', '|', '}', '~', ''
];

function waitkey()
{
    var term = document.getElementById("termtxt")
    return new Promise((resolve) => {
        term.addEventListener("keydown", keyhandler);
        function keyhandler(e)
        {
            if(e.key.length == 1)
            {
                term.removeEventListener("keydown", keyhandler)
                resolve(e.key);
            }
        }
    })
}

function waitkeybf()
{
    var term = document.getElementById("termtxt")
    return new Promise((resolve) => {
        term.addEventListener("keydown", keyhandler);
        function keyhandler(e)
        {
            if(e.key.length == 1)
            {
                term.removeEventListener("keydown", keyhandler)
                resolve(e.key);
            }
            else if(e.key == "Enter")
            {
                term.removeEventListener("keydown", keyhandler)
                resolve(ascii[13]);
            }
        }
    })
}

function waitstr()
{
    var term = document.getElementById("termtxt")
    return new Promise((resolve) => {
        var str = ""
        term.addEventListener("keydown", keyhandler);
        function keyhandler(e)
        {
            if(e.key.length == 1)
            {
                str += e.key;
            }
            else if(e.key == "Enter")
            {
                term.removeEventListener("keydown", keyhandler)
                resolve(str);
            }
        }
    })
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run()
{
    select = document.getElementById("prg").value;
    cancel = true;
    switch(select)
    {
        case "js":
            cancel = false;
            await js(file);
            break;
        case "bf":
            cancel = false;
            await brainfk(file);
            break;
        case "thue":
            cancel = false;
            prg = file.join("\n");
            thuep = await thueparse(prg);
            await thue(thuep.rules, thuep.state);
    }
}

/*
async function js(txt)
{
    var term = document.getElementById("termtxt")
    console.oldLog = console.log;
    console.olderr = console.error;

    console.error = function(err)
    {
        term.innerHTML += "ERROR: " + value + "\n"
    }

    console.log = function(value)
    {
        //console.oldLog(value);
        term.innerHTML += value + "\n"
    };
    
    const output = eval('console.log("hello")');
    term.innerHTML = "";
    prg = txt.join("\n");
    out = eval(prg);
}*/

async function brainfk(txt)
{   
    var term = document.getElementById("termtxt")
    term.innerHTML = "";
    
    prg = txt.join("");

    ptr = 0;
    max = 65536
    mem = Array(max).fill(0);
    prgptr = 0;
    braces = []

    while(prgptr < prg.length && !cancel)
    {   
        c = prg[prgptr];

        switch(c)
        {
            case ">":
                if(ptr < max) { ptr++; }
                else {ptr = 0;}
                prgptr++
                break;
            case "<":
                if(ptr > 0) { ptr--; }
                else {ptr = max;}
                prgptr++
                break;
            case "+":
                if(mem[ptr] < 255) { mem[ptr]++; }
                else {mem[ptr] = 0;}
                prgptr++
                break;
            case "-":
                if(mem[ptr] > 0) { mem[ptr]--; }
                else {mem[ptr] = 255;}
                prgptr++
                break;
            case ".":
                term.innerHTML += ascii[mem[ptr]];
                prgptr++
                break;
            case ",":
                char = await waitkeybf();
                mem[ptr] = ascii.indexOf(char);
                prgptr++
                break;

            case "[":
                if(mem[ptr] == 0)
                {   
                    while( prg[prgptr] != "]" && prgptr <= prg.length){
                        prgptr += 1;
                    }
                }
                else
                {
                    braces.push(prgptr);
                    prgptr++;
                }
                break;
            
            case "]":
                if (braces.length > 0){
                    prgptr = braces.pop();
                    //prgptr -= 1;
                } else {
                    prgptr += 1;
                }
                break;
                    
        }
        await sleep(extime);
        console.log(mem[ptr] + " " + prg[prgptr] + " " + prgptr);
    }
}

async function thueparse(code) {
    code = code.split(/\n::=\n/); //Maybe match /\n::=\n
    let rules = code.shift();
    rules = parseRules(rules);
    const state = code.join("\n::=\n");
    return {
        rules: rules,
        state: state
    };
};

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function thue(rules, state) {
    var term = document.getElementById("termtxt")
    term.innerHTML = "";
    let finished = false;

    while (!finished && !cancel) {
        const possibleRules = rules.filter((rule) => {
            return state.includes(rule[0]);
        });
        if (possibleRules.length === 0) {
            break;
        }
        const randomRule = getRandom(possibleRules);

        const matches = [];
        let index = 0;
        while (index >= 0) {
            index = state.indexOf(randomRule[0], index);
            if (index >= 0) {
                matches.push(index);
                index++;
            }
        }

        const randomMatch = getRandom(matches);
        const stateA = state.slice(0, randomMatch);
        const stateB = state.slice(randomMatch + randomRule[0].length);
        let value = "";
        if (randomRule[1][0] === "~") {
            term.innerHTML += randomRule[1].substr(1);
        } else if (randomRule[1] === ":::") {
            value = await waitstr();
        } else {
            value = randomRule[1];
        }
        state = stateA + value + stateB;
        await sleep(extime);
    }
    return state;
};

function parseRules(rules) {
    rules.trim();
    rules = rules.split("\n");
    rules = rules.map((rule) => {
        if (!rule || rule === null) return null;
        rule = rule.split("::=");
        if (rule.length < 2) {
            console.error("Invalid rule", rule);
            return null;
        }
        const result = [];
        result.push(rule.shift());
        result.push(rule.join("::="));
        return result;
    }).filter((rule) => {
        if (!rule) return false;
        else return true;
    });
    return rules;
}