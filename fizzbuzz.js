function fizzbuzz() {
    //Get the readline class
    const readline = require("readline").createInterface(
        {
            input: process.stdin,
            output: process.stdout
        }
    );

    console.clear()

    var excludes = []; //Get any excluded rules
    for (var key in process.argv) {
        var arg = process.argv[key];
        if (arg.indexOf("--") != -1) {
            if ( arg.indexOf("!") )
                excludes.push(parseInt(arg.slice(3)))
        }
    }

    console.log("Welcome to FizzBuzz!\n");
    if (excludes.length > 0)
        console.log("Excluding: " + excludes.join(", ") + "\n\n");

    readline.question("Enter the upper bound to Fizz: ", bound =>
    {
        var upper = parseInt(bound);

        if ( upper < 1 ) {
            console.log("Please enter a value of 1 or greater")
            readline.close()
        }
        console.log("\n\n");

        let simpleWords = {
            3: "Fizz", 
            5: "Buzz",
            7: "Bang", 
            11: "Bong"
        }
        let flags = {
            3: excludes.indexOf(3) == -1,
            5: excludes.indexOf(5) == -1,
            7: excludes.indexOf(7) == -1,
            11: excludes.indexOf(11) == -1,
            13: excludes.indexOf(13) == -1,
            17: excludes.indexOf(17) == -1
        }

        for (let i = 1; i <= upper; i++) {
            var output = ""; //Create build string

            for (var key in simpleWords) { //Do the simple append words
                if ( flags[key] && i % key == 0 )
                    output += simpleWords[key];
            }

            if ( flags[13] && i % 13 == 0) { //13 puts Fezz in front of any B 
                var BIdx = output.indexOf("B");
                if (BIdx == -1)
                    output += "Fezz";
                else
                    output = output.slice(0,BIdx) + "Fezz" + output.slice(BIdx);
            }
            if ( excludes.indexOf(17) && i % 17 == 0) { //17 reverses the order of 4 letter words
                var parts = getChunks(output, 4);
                output = "";
                for (var o = parts.length - 1; o >= 0; o--)
                    output += parts[o];
            }

            if (output == "")
                output = i.toString();
            console.log(output);
        }

        console.log("\n\n");

        readline.close();
    });
}

function getChunks(str, size) {
    var chunks = []
    for (var i = 0; i < Math.ceil(str.length / size); i++)
        chunks.push("");
    for (var i = 0; i < str.length; i++)
        chunks[Math.floor(i / 4)] += str[i];
    return chunks
}

// Now we run the main function...
fizzbuzz();