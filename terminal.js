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

async function run()
{
    select = document.getElementById("prg").value;
    if(select == "js")
    {
        await js(file);
    }
    else if(select == "bf")
    {
        await brainfk(file)
    }

}

async function js(txt)
{
    var term = document.getElementById("termtxt")
    term.innerHTML = "";
    prg = txt.join("\n");
    out = eval(prg);
    term.innerHTML ="Check the Debug Console, this feature is not implemented for JavaScript yet."
}

async function brainfk(txt)
{   
    var term = document.getElementById("termtxt")
    term.innerHTML = "";
    
    prg = txt.join("");

    ptr = 0
    max = 65536
    mem = Array(max).fill(0);
    prgptr = 0;
    braces = []

    ascii = [
        '<NUL>','<SOH>','<STX>','<ETX>','<EOT>','<ENQ>','<ACK>','<BEL>',
        '<BS>' ,'<HT>' ,'<LF>' ,'<VT>' ,'<NP>' ,'<CR>' ,'<SO>' ,'<SI>' ,
        '<DLE>','<DC1>','<DC2>','<DC3>','<DC4>','<NAK>','<SYN>','<ETB>',
        '<CAN>','<EM>' ,'<SUB>','<ESC>','<FS>' ,'<GS>' ,'<RS>' ,'<US>' ,
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
        'x', 'y', 'z', '{', '|', '}', '~', 'DEL'
    ];

    while(prgptr < prg.length)
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
                char = await waitkey();
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
        console.log(mem[ptr] + " " + prg[prgptr]);
    }
}
