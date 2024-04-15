const fs = require('fs');
const amount_bits = 6
const buffer_bits = 8-amount_bits

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
    var buffer_index = 0;
    var rep_buffer_index = 0;
    var buffer = new Array(2*buffer_bits); //so as to be able to check sequences 2 times the len on resemblence
    var repeat_buffer = new Array(buffer_bits);

    for (var i = 0; i <= arr.length; i++) {
        buffer[buffer_index] = arr[i];
        buffer_index++;
        if (buffer_index === 2*buffer_bits+1) //things went south
        {

        }
        
    }
    return result;
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