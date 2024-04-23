const fs = require('fs');
const { stringify } = require('querystring');
const amount_bits = 6
const buffer_bits = (8-amount_bits);
const buffer_len = 2**buffer_bits;

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

function to_string(input) { //get string from bin
    var output = "";
    input.map(function(bin) {
        output += String.fromCharCode(parseInt(bin, 2));
    });
    return output;
}

function get_service_byte(amount, len){ //returns a binary string for a char
    var service_byte ="";
    service_byte+=(to_binary(amount))
    for (var seq_b=0; seq_b<(8-amount_bits);seq_b++){service_byte.shift()}
    service_byte+=(to_binary(len)).slice(amount_bits,8)
    return service_byte;
}

function rle_encode(input) {
    var result = [];
    var arr = getElementByType(input, "decoded"); //get normal string from.json
    var curr_counter = 0;
    var buffer_index = 0;
    var buffer = new Array(2*buffer_bits); //so as to be able to check sequences 2 times the len on resemblence
    var repeat_buffer = new Array(buffer_bits);
    var rep_buffer_length=0;
    var service_byte="";

    for (var i = 0; i <= arr.length; i++) {
        buffer[buffer_index] = arr[i];
        buffer_index++;
        if (rep_buffer_length=== 0){
            if (buffer_index === 2*buffer_bits) //buffer full
            {
                find_rep:{
                    for (var len=1; len < buffer_bits+1; len++){
                        if (buffer.slice(0,len) === buffer.slice(len,len+len)){
                            repeat_buffer = new Array(len);
                            for (j=0;j<len;j++){repeat_buffer[j]=buffer.shift();} //first sequence gone
                            for (k=0;k<len;k++){buffer.shift();} //second gone
                            buffer_index -= 2*len;
                            curr_counter+=2;
                            rep_buffer_length = repeat_buffer.length; //take in the len of curr_rep_buffer
                            break find_rep;
                        }
                    }
                    service_byte = get_service_byte(1,1);
                    result.push(to_string(service_byte));
                    result.push(buffer.shift());
                }
            }
        }
        else{
            if (buffer_index>=rep_buffer_length){ 
                if (buffer.slice(0,rep_buffer_length) === repeat_buffer) {
                    for (z=0;z<rep_buffer_length;z++){buffer.shift();} //second gone
                    buffer_index -= rep_buffer_length;
                    curr_counter++;
                }
                else{
                    service_byte=get_service_byte(curr_counter, rep_buffer_length)
                    result.push(to_string(service_byte));
                    while (repeat_buffer.length>0) result.push(buffer.shift());
                    rep_buffer_length=repeat_buffer.length; //0
                    curr_counter = 0;
                }
            }
        }
    }
    //process the remnants of buffer
    while (true){ //break the loop when neccesary
        if (buffer.length===0){break;}
        if (rep_buffer_length===0){
            if (buffer.length===1){
                service_byte=get_service_byte(1,1);
                result.push(to_string(service_byte));
                result.push(buffer.shift());
                break;
            }
            find_repeat:{
                for (var len=1; len < buffer.length/2; len++){
                    if (buffer.slice(0,len) === buffer.slice(len,len+len)){
                        repeat_buffer = new Array(len);
                        for (j=0;j<len;j++){repeat_buffer[j]=buffer.shift();} //first sequence gone
                        for (k=0;k<len;k++){buffer.shift();} //second gone
                        buffer_index -= 2*len;
                        curr_counter+=2;
                        rep_buffer_length = repeat_buffer.length; //take in the len of curr_rep_buffer
                        break find_repeat;
                    }
                }
                service_byte = get_service_byte(1,1);
                result.push(to_string(service_byte));
                result.push(buffer.shift());
            }
        }
        else{
            if (buffer_index>=rep_buffer_length){ 
                if (buffer.slice(0,rep_buffer_length) === repeat_buffer) {
                    for (z=0;z<rep_buffer_length;z++){buffer.shift();} //second gone
                    buffer_index -= rep_buffer_length;
                    curr_counter++;
                }
                else{
                    service_byte=get_service_byte(curr_counter, rep_buffer_length)
                    result.push(to_string(service_byte));
                    while (repeat_buffer.length>0) result.push(buffer.shift());
                    rep_buffer_length=repeat_buffer.length; //0
                    curr_counter = 0;
                }
            }
        }
    }
    return result;
}

function rle_decode(input){ //encoded string
    var result = "";
    var rep_string="";
    string_index=0;
    var rep_amount = 0
    var rep_len=0
    var service_byte=""
    var rep_sub=""
    while (string_index<input.length) {
        rep_sub=""
        service_byte = to_binary(input[string_index])

        rep_amount=to_string('0'*buffer_bits+service_byte.slice(0,amount_bits))
        rep_len = to_string('0'*amount_bits+service_byte.slice(amount_bits,8))

        string_index++;
        for (var i=0;i<rep_len;i++){
            rep_sub+=input[string_index]
            string_index++;
        }
        //string_index stays on the next service byte
        result += rep_sub*rep_amount; // full sequence
    }
    return result;
}

function main(){
    var filename="test.json"
    rle_encode(getElementByType(readFile(filename),"decoded"));
    //rle_decode("test.json");
}

alert(main())