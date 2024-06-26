const { writeFileSync, readFileSync } = require('fs');
const amount_bits = 6
const buffer_bits = (8-amount_bits);
const buffer_len = 2**buffer_bits;

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
    return ("0".repeat(len-num.length))+num; 
}

function char2bin(ch) {
    const signif = ch.charCodeAt(0).toString(2);
    return ("0".repeat(8-signif.length))+signif;
}

function to_string(inp) { //get string from bin
    var output = "";
    output = parseInt(inp, 2);
    return String.fromCharCode(output);
}
function bin2dec(inp){
    return parseInt(inp,2);
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

    for (var i = 0; i < arr.length; i++) {
        buffer[buffer_index] = arr[i];
        buffer_index++;
        while (true){
            if (rep_buffer_length===0){
                find_repeat:{
                    for (var len=1; len <= buffer.length/2; len++){
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
                    if (buffer.length>=2*buffer_len | (i==arr.length-1)){
                        service_byte = get_service_byte(1,1);
                        result.push(to_string(service_byte));
                        result.push(buffer.shift());
                        buffer_index--;
                    }
                }
            }
            else{
                if (buffer_index>=rep_buffer_length){ 
                    if (buffer.slice(0,rep_buffer_length).equals(repeat_buffer)) {
                        for (z=0;z<rep_buffer_length;z++){buffer.shift();} 
                        buffer_index -= rep_buffer_length;
                        curr_counter++;
                    }
                    else{
                        service_byte=get_service_byte(curr_counter, rep_buffer_length)
                        result.push(to_string(service_byte));
                        for (var ind=0; ind<rep_buffer_length;ind++){result.push(repeat_buffer.shift());}
                        rep_buffer_length=0; //0
                        curr_counter = 0;
                    }
                }
                else{
                    if (buffer_index==0){ //end of line
                        service_byte=get_service_byte(curr_counter, rep_buffer_length)
                        result.push(to_string(service_byte));
                        for (var ind=0; ind<rep_buffer_length;ind++){result.push(repeat_buffer.shift());}
                        rep_buffer_length=0; //0
                        curr_counter = 0;
                    }
                }
            }
            if (buffer.length==0 & rep_buffer_length==0){break;}
            if (i==arr.length-1) {continue;}
            break;
        }
    }
    return result.join('');
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

        rep_amount=bin2dec('0'.repeat(buffer_bits)+service_byte.slice(0,amount_bits))+1
        rep_len = bin2dec('0'.repeat(amount_bits)+service_byte.slice(amount_bits,8))+1

        string_index++;
        for (var i=0;i<rep_len;i++){
            rep_sub+=input[string_index]
            string_index++;
        }
        //string_index stays on the next service byte
        result += rep_sub.repeat(rep_amount); // full sequence
    }
    return result;
}

function main(){
    const dec_file="dec_data.txt"
    const enc_file="enc_data.txt"
    
    var dec_content =  readFileSync(dec_file,{encoding: "ascii"})
    console.log(dec_content) //to change

    var enc_content = rle_encode(dec_content) //encoded string
    console.log(enc_content)
    writeFileSync(enc_file, enc_content, {encoding: "ascii"})

    enc_content = readFileSync(enc_file, {encoding: "ascii"})
    dec_content = rle_decode(enc_content)
    writeFileSync(dec_file, dec_content, {encoding: "ascii"})
}

main();