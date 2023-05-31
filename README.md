# Etch-A-Code
#### The semi-permanant IDE!
---
### What is Etch-A-Code?
Etch-a-code is an IDE based off of an Etch-A-Sketch! It's like any other IDE, but with a few catches,
When you type a character or go to a new line, you can't go back. If you want to change something, you have to clear the whole thing! Like an Etch-A-Sketch!

If you want to, you can save your code by exporting it. However, you cannot import code. (please do not write a code-importer that just types it all in, that would be cheating!!!)

Like other IDEs, you can run code in it too!
Click on the "Run" button at the top, select your language, and it's good to go!
Currently, it has support for BrainF**k and Thue, and I'll be adding more soon!

Unlike other online esoteric programming language runners, this IDE actually has keyboard input! No more typing your input into a lazy box below the console, you can type it straight in!

This used to have JavaScript, but it was tricky getting it to work in the custom console,
and it was causing lots of problems, so I ditched it to make this the ultimate IDE for esoteric programming languages.
---
### TODO / Current Problems
For some reason, you have to click "Run" twice to get your BrainF**k program to run properly,
I haven't tested this for Thue.

I need to make the step-time adjustable. If there is no step time, it will run fast, but will
get caught in infinite loops and crash, but if too high, simple programs will take ages to run.

And I want to add more programming languages, but it's difficult because I'm implementing them in pure, top-level JavaScript.