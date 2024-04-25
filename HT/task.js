const { writeFileSync, readFileSync } = require('fs');
const amount_bits = 6
const buffer_bits = (8-amount_bits);
const buffer_len = 2**buffer_bits;

function readFile(filename) {
    const file = readFileSync(filename, "utf8");
    return JSON.parse(file);
}

function getElementByType(input, type) //encoded||decoded
{
    return input.filter(function(input){ if (input.type === type){return input.content}});
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;
    // if the argument is the same array, we can be sure the contents are same as well
    if(array === this)
        return true;
    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

function dec2bin(dec, len) {
    const num = (dec >>> 0).toString(2)
    return ("0".repeat(len-num.length))+num; //logical disjunction with a mask
}

function char2bin(ch) {
    return ch.charCodeAt(0).toString(2); //logical disjunction with a mask
}

function to_string(inp) { //get string from bin
    var output = "";
    var input = String(inp)
    var inp_arr=input.split("")
    inp_arr.map(function(bin) { //error
        output += String.fromCharCode(parseInt(bin, 2));
    });
    return output;
}

function get_service_byte(amount, len){ //returns a binary string for a char
    var service_byte ="";
    //cant be less than 1
    service_byte+=dec2bin(amount-1, amount_bits)
    service_byte+=dec2bin(len-1, buffer_bits)
    return service_byte;
}

function rle_encode(input) {
    var result = [];
    var arr = input //get normal string from.json
    var curr_counter = 0;
    var buffer_index = 0;
    var buffer = new Array; //so as to be able to check sequences 2 times the len on resemblence
    var repeat_buffer = new Array(buffer_len);
    var rep_buffer_length=0;
    var service_byte="";

    for (var i = 0; i <= arr.length; i++) {
        buffer[buffer_index] = arr[i];
        buffer_index++;
        if (rep_buffer_length=== 0){
            if (buffer_index === buffer_len) //buffer full
            {
                find_rep:{
                    for (var len=1; len < buffer_len+1; len++){
                        if (buffer.slice(0,len).equals(buffer.slice(len,len+len))){
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
                if (buffer.slice(0,rep_buffer_length).equals(repeat_buffer)) {
                    for (z=0;z<rep_buffer_length;z++){buffer.shift();} //second gone
                    buffer_index -= rep_buffer_length;
                    curr_counter++;
                }
                else{
                    service_byte=get_service_byte(curr_counter, rep_buffer_length)
                    result.push(to_string(service_byte));
                    for (var i=0; i<rep_buffer_length;i++){result.push(repeat_buffer.shift());}
                    rep_buffer_length=0; 
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
                    if (buffer.slice(0,len).equals(buffer.slice(len,len+len))){
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
                if (buffer.slice(0,rep_buffer_length).equals(repeat_buffer)) {
                    for (z=0;z<rep_buffer_length;z++){buffer.shift();} //second gone
                    buffer_index -= rep_buffer_length;
                    curr_counter++;
                }
                else{
                    service_byte=get_service_byte(curr_counter, rep_buffer_length)
                    result.push(to_string(service_byte));
                    for (var i=0; i<rep_buffer_length;i++){result.push(repeat_buffer.shift());}
                    rep_buffer_length=0; //0
                    curr_counter = 0;
                }
            }
        }
    }
    return result.join();
}

function rle_decode(inp_str){ //encoded string
    var result = "";
    var rep_string="";
    string_index=0;
    var rep_amount = 0
    var rep_len=0
    var service_byte=""
    var rep_sub=""
    var input = inp_str.split("")
    while (string_index<input.length) {
        rep_sub=""
        service_byte = char2bin(input[string_index])

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
    var dec_content =  getElementByType(readFile(filename),"decoded")[0]
    console.log(dec_content.content) //to change

    var enc_data = {
        type: "encoded", 
        content: rle_encode(dec_content.content) //encoded string
    }

    console.log(enc_data.content)

    var dec_data = {
        type: "decoded", 
        content: rle_decode(enc_data.content) //decoded recieved from enc_content
    }
    var result = new Array
    result.push(enc_data)
    result.push(dec_data)
    writeFileSync(filename,JSON.stringify(result, null, 4)) 
}

main();