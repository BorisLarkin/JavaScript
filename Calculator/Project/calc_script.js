// файл script.js
window.onload = function(){ 

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    
    function isInt(n) {
        return n % 1 === 0;
    }

    // окно вывода результата
    outputElement = document.getElementById("result")
    
    //func to round outputElement
    observer = new MutationObserver(function(mutationsList, observer) {
        if (!selectedOperation){num = a; }
        else{num = b;}

        countLetters = outputElement.innerHTML.toString().length;
        if (countLetters > 10) {
            if (isInt(num)){
                outputElement.innerHTML = Math.round(num/(10**(num.toString().length-10)));
            }
            else{
                fixedLength = (Math.trunc(num)).toString().length;
                if (countLetters>11){
                    outputElement.innerHTML = (Math.round(num*(10**(10-fixedLength))))/(10**(10-fixedLength));
                }
            }
        }
    });
    //Observe number change in OutputElement in order to round the number if necessary
    observer.observe(outputElement, {characterData: false, childList: true, attributes: false});
      
    // список объектов кнопок циферблата (id которых начинается с btn_digit_)
    digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')
    
    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit
                outputElement.innerHTML = b        
            }
        }
    }
    
    // устанавка колбек-функций на кнопки циферблата по событию нажатия
    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML
            onDigitButtonClicked(digitValue)
        }
    })
    
    // установка колбек-функций для кнопок операций
    document.getElementById("btn_op_prim_mult").onclick = function() { 
        if (a === '') return
        selectedOperation = 'x'
    }
    document.getElementById("btn_op_prim_plus").onclick = function() { 
        if (a === '') return
        selectedOperation = '+'
    }
    document.getElementById("btn_op_prim_minus").onclick = function() { 
        if (a === '') return
        selectedOperation = '-'
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return
        selectedOperation = '/'
    }
    // кнопка очищения
    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }
    
    // кнопка расчёта результата
    document.getElementById("btn_op_prim_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
        }
        
        a = expressionResult
        b = ''
        selectedOperation = null
    
        outputElement.innerHTML = a
    }

    sign = document.getElementById("sign")
    
    primaryButtons = document.querySelectorAll('[id ^= "btn_op_prim_"]')
    
    document.getElementById("mode_switch").onclick = function (){
        if (this.classList.contains("night")){
            this.classList.add("day");
            this.classList.remove("night");
            document.body.style.background = "rgb(236, 223, 255)";
            sign.style.color = "rgb(0, 0, 0)";
            primaryButtons.forEach(button => {button.classList.remove("night"); button.classList.add("day");})
        }
        else{
            this.classList.add("night");
            this.classList.remove("day");
            document.body.style.background = "rgb(22, 22, 22)";
            sign.style.color = "rgb(255, 255, 255)";
            primaryButtons.forEach(button => {button.classList.add("night"); button.classList.remove("day");})
        }
    }

    document.getElementById("result_switch").onclick = function(){
        if (outputElement.classList.contains("night")){
            outputElement.classList.add("day");
            outputElement.classList.remove("night");
        }
        else{
            outputElement.classList.add("night");
            outputElement.classList.remove("day");
        }
    }
    
};