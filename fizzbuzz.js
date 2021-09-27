// Here, we create our main function.
function fizzbuzz() {
    const readline = require('readline').createInterface(
        {
            input: process.stdin,
            output: process.stdout
        }
    );
    
    console.clear()
    console.log('Welcome to FizzBuzz!\n');

    readline.question('Enter the upper bound to Fizz: ', bound =>
    {
        var upper = parseInt(bound);

        console.log("\n\n");
        // Put your code here...

        let simpleWords = {
            3: 'Fizz', 
            5: 'Buzz', 
            7: 'Bang', 
            11: 'Bong'
        }

        for (let i = 1; i <= upper; i++) {
            var output = ""; //Create build string

            for (var key in simpleWords) { //Do the simple append words
                if (i % key == 0)
                    output += simpleWords[key];
            }

            if (i % 13 == 0) { //13 puts Fezz in front of any B 
                var BIdx = output.indexOf('B');
                if (BIdx == -1)
                    output += "Fezz";
                else
                    output = output.slice(0,BIdx) + "Fezz" + output.slice(BIdx);
            }
            if (i % 17 == 0) { //17 reverses the order of 4 letter words
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