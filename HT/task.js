const fs = require('fs');
const max_sequence = 9

function readFile(filename) {
    const file = fs.readFileSync(path.join(process.cwd(), filename), "utf8");
    return JSON.parse(file);
}

function getElementByType(input, type) //encoded||decoded
{
    return input.filter(function(input){ if (input.type === type){return input.content}});
}

function to_binary(input) { //get binary from string 
    var output = "";
    for (var i = 0; i < input.length; i++) {
        output += input[i].charCodeAt(0).toString(2);
    }
    return output
}

function to_string(input) { //get string from 
    var output = "";
    input.split(' ').map(function(bin) {
        output += String.fromCharCode(parseInt(bin, 2));
    });
    return output;
}

function rle_encode(input) {
    var result = [];
    var arr = getElementByType(input, "decoded"); //get normal string from.json
    var curr_counter = 1;
    var prev_element = arr[0]; //consider the [0] checked
    for (var i = 1; i <= arr.length; i++) {
        if (arr[i] == prev_element && curr_counter < max_sequence) {
            curr_counter++;
        }
        else {
            result.push(curr_counter);
            result.push(prev_element);
            prev_element = arr[i];
            curr_counter = 1;
        }
    }
    return prettyPrint(result);
}

function prettyPrint(rleData) {
    return [...rleData].join("");
}

function rle_decode(filename){
    var result = "";
    for (var i = 0; i < data.length - 1; i++) {
        var n = data[i];
        var letter = data[i + 1];
        result += letter.repeat(n); // coercion to number
        i++;
    }
    return result;
}

function main(){
    rle_encode("test.json");
}

alert(main())