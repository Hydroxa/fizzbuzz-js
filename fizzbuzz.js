let values = [
    [3, "Fizz"],
    [13, "Fezz"],
    [5, "Buzz"],
    [7, "Bang"], 
    [11, Bong],
    [17, Reverse]
]

function Bong() {
    return ["Bong", true];
}
function Reverse(input) {
    let parts = getChunks(input, 4).reverse();
    return [parts.join(""), true];
}




const readline = require("readline").createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);
let flags = {};

function fizzbuzz() {
    console.clear();
    console.log("Welcome to FizzBuzz!\n");

    getExcludes();

    readline.question("Enter the upper bound to Fizz: ", bound =>
    {
        var upper = parseInt(bound);

        if (checkErrors(upper)) {
            readline.close();
            return;
        }

        console.log("\n\n");

        for (let i = 1; i <= upper; i++) {
            let output = "";
            output = iterateWords(output, i);

            if (output == "")
                output = i.toString();
            console.log(output);
        }

        console.log("\n\n");

        readline.close();
    });
}

function checkErrors(number) {
    let erred = false;
    if ( number < 1 ) {
        console.log("\nPlease enter a value of 1 or greater\n");
        erred = true;
    }
    if ( number != numbers ) {
        console.log("\nPlease enter a valid number\n");
        erred = true;
    }

    return erred;
}

function getExcludes() {
    let excludes = [];
    for (let key in process.argv) {
        let arg = process.argv[key];
        if (arg.indexOf("--") != -1) {
            if ( arg.indexOf("!") )
                excludes.push(parseInt(arg.slice(3)));
        }
    }

    if (excludes.length > 0)
        console.log("Excluding: " + excludes.join(", ") + "\n\n");

    for (let idx = 0; idx < values.length; idx++)
        flags[values[idx][0]] = excludes.indexOf(values[idx][0]) == -1;
}

function iterateWords(input, number) {
    for (let idx = 0; idx < values.length; idx++) {

        let comparator = values[idx][0];
        let func = values[idx][1];

        if ( flags[comparator] && number % comparator == 0 ) {
            if (typeof func === "string" || func instanceof String)
                input += func;
            else if ( typeof func === "function" ) {
                let result = func(input, number);
                input = result[0];
                if (result[1])
                    break;
            }
        }
    }
    return input;
}

function getChunks(str, size) {
    let chunks = [];
    for (let i = 0; i < str.length; i += size)
        chunks[Math.floor(i / size)] = str.substring(i, i + size);
    return chunks;
}

// Now we run the main function...
fizzbuzz();