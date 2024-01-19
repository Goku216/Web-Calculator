class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ''
        this.currentOperand =''
        this.operation = undefined
    }

    delete (){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand =this.currentOperand.toString() + number.toString()
    }

    chooseOperations(operation){
        if(operation === '') return
        if(operation != '') {
            this.compute(operation)
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand =''
    }

    getNumber(number){
       const stringNumber = number.toString()
       const integerDigits = parseFloat(stringNumber.split('.')[0])
       const decimalDigits = stringNumber.split('.')[1]
       let displayDigit
       if(isNaN(integerDigits)){
        displayDigit =''
       } else {
        displayDigit = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
       }

       if(decimalDigits!= null) {
        return `${displayDigit}.${decimalDigits}`
       } else {
        return displayDigit
       }
    }

    compute(){
        let computation
        let prev = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return

        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev -current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.previousOperand =''
        this.operation = undefined

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getNumber(this.currentOperand)
        if(this.operation != null){
        this.previousOperandTextElement.innerText = `${this.getNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }

    }
    
}

const numbers = document.querySelectorAll('[data-number]') 
const operations = document.querySelectorAll('[data-operation]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numbers.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operations.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperations(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',  ()=> {
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click',  ()=> {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',  ()=> {
    calculator.delete()
    calculator.updateDisplay()
})

