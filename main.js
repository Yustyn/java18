function loadcurrency() {
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
        .then(response => response.json())
        .then(list => {
            let $inputList1 = document.getElementById('valuta1')
            $inputList1.addEventListener('click', () => {
                $inputList1.value = ''
            })
            let $inputList2 = document.getElementById('valuta2')
            $inputList2.addEventListener('click', () => {
                $inputList2.value = ''
            })
            let $dataList = document.createElement('DATALIST')

            $dataList.setAttribute('id', 'valuta')
            for (let i = 0; i < list.length; i++) {
                let $option = document.createElement('OPTION')
                Object.assign($option, {
                    value: list[i].txt
                })
                $option.setAttribute('data-cc', list[i].cc)
                $option.setAttribute('data-rate', list[i].rate)
                $dataList.appendChild($option)
                if (list[i].cc == "USD") {
                    document.getElementById('current').textContent = list[i].rate
                }
            }
            te.append($inputList1, $dataList)
            let rate = 1
            $inputList1.addEventListener('change', (event) => {
                let elem = document.querySelector(`option[value="${event.target.value}"]`)
                if (elem) {
                    rate = elem.dataset.rate
                    kurs2.textContent = rate
                    cc2.textContent = elem.dataset.cc
                }
            })
            $inputList2.addEventListener('change', (event) => {
                let elem = document.querySelector(`option[value="${event.target.value}"]`)
                if (elem) {
                    rate = elem.dataset.rate
                    kurs1.textContent = rate
                    cc1.textContent = elem.dataset.cc
                }
            })
        })
}

function currency1() {
    value1.addEventListener('keyup', () => {
        result1.textContent = (value1.value * kurs1.textContent).toFixed(2)
        value2.value = (result1.textContent / kurs2.textContent).toFixed(2)
    })
}


function currency2() {
    value2.addEventListener('keyup', () => {
        result1.textContent = (value2.value * kurs2.textContent).toFixed(2)
        value1.value = (result1.textContent / kurs1.textContent).toFixed(2)
    })
}

loadcurrency()
currency1()
currency2()