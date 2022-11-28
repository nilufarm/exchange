const input = document.querySelector('#value')
const exc1 = document.querySelector('#exc1')
const exc2 = document.querySelector('#exc2')
const btns = document.querySelectorAll(' .valute input[type="radio"]')
const btns2 = document.querySelectorAll(' .valute2 input[type="radio"]')
const result = document.querySelector('.result')
let valuteID = 'RUB'
let valuteID2 = 'USD'

fetch(`https://api.exchangerate.host/latest?base=${valuteID}&symbols=${valuteID2}`)
    .then(res => res.json())
    .then(data => {
        input.addEventListener('keyup', (e) => {
            input.value = e.target.value
            if (input.value.includes(',')) {
                let point = input.value.indexOf(',')
                input.value = input.value.slice(0, point) + '.'
            }
            result.innerHTML = input.value * data.rates[valuteID2]
            if (result.innerHTML == 'NaN') {
                result.innerHTML = ''
            }
        })
        exc1.innerHTML = `1 ${valuteID} = ` + data.rates[valuteID2] + ` ${valuteID2}`
    })
fetch(`https://api.exchangerate.host/latest?base=${valuteID2}&symbols=${valuteID}`)
    .then(res => res.json())
    .then(data => exc2.innerHTML = `1 ${valuteID2} = ` + data.rates[valuteID] + ` ${valuteID}`)


btns.forEach(item => {
    item.addEventListener('click', (e) => {

        if (e.target.checked) {
            valuteID = e.target.id.toUpperCase()
            fetch(`https://api.exchangerate.host/latest?base=${valuteID}&symbols=${valuteID2}`)
                .then(res => res.json())
                .then(data => {
                    input.addEventListener('keyup', () => {
                        result.innerHTML = input.value * data.rates[valuteID2]
                    })
                    result.innerHTML = input.value * data.rates[valuteID2]
                    exc1.innerHTML = `1 ${valuteID} = ` + data.rates[valuteID2] + ` ${valuteID2}`
                })
            fetch(`https://api.exchangerate.host/latest?base=${valuteID2}&symbols=${valuteID}`)
                .then(res => res.json())
                .then(data => {
                    exc2.innerHTML = `1 ${valuteID2} = ` + data.rates[valuteID] + ` ${valuteID}`
                })
        }
    })
})
btns2.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.checked) {
            valuteID2 = e.target.id.toUpperCase()
            fetch(`https://api.exchangerate.host/latest?base=${valuteID}&symbols=${valuteID2}`)
                .then(res => res.json())
                .then(data => {
                    input.addEventListener('keyup', (e) => {
                        input.value = e.target.value
                        result.innerHTML = input.value * data.rates[valuteID2]
                    })
                    exc1.innerHTML = `1 ${valuteID} = ` + data.rates[valuteID2] + ` ${valuteID2}`
                    result.innerHTML = input.value * data.rates[valuteID2]
                })
            fetch(`https://api.exchangerate.host/latest?base=${valuteID2}&symbols=${valuteID}`)
                .then(res => res.json())
                .then(data => {
                    exc2.innerHTML = `1 ${valuteID2} = ` + data.rates[valuteID] + ` ${valuteID}`
                })
        }
    })
})