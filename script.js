"use strict"

let nameData = new Map()

fetch('https://raw.githubusercontent.com/solita/dev-academy-2021/main/names.json')
    .then(response => response.json())
    .then(data => {
        let names = data.names
        for (let i = 0; i < names.length; i++) {
            nameData.set(names[i].name, names[i].amount)
        }
        calculateTotalNameAmount()
        refreshTable()
    });

function refreshTable() {
    let previousTable = document.getElementById("nameTable")
    if (previousTable) {
        previousTable.remove()
    }
    let wrapper = document.getElementById("wrapper")
    let table = document.createElement('table');
    table.setAttribute("id", "nameTable")
    nameData.forEach((amount, name) => {
        let row = table.insertRow();
        for (let j = 0; j < 2; j++) {
            let td = row.insertCell();
            if (j === 0) {
                td.appendChild(document.createTextNode(name));
            } else {
                td.appendChild(document.createTextNode(amount));
            }
        }
    });
    wrapper.appendChild(table);
}

function sortNamesByAmount() {
    let sortedNames = new Map()

    nameData[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    }

    for (let [key, value] of nameData) {
        sortedNames.set(key, value)
    }

    nameData = sortedNames
    refreshTable()
    console.log("Sorted by amount")

    document.getElementById("button2").disabled = true
    document.getElementById("button1").disabled = false
}

function sortNamesAlphabetically() {
    nameData = new Map([...nameData.entries()].sort())
    refreshTable()
    console.log("Sorted alphabetically")
    document.getElementById("button1").disabled = true
    document.getElementById("button2").disabled = false
}

function calculateTotalNameAmount() {
    let totalAmount = 0
    nameData.forEach((amount) => {
        totalAmount += amount
    })

    let wrapper = document.getElementById("wrapper")
    let p = document.createElement('p');
    p.setAttribute("id", "totalAmount")
    p.innerHTML = "Total amount of names in this list is: " + totalAmount

    wrapper.appendChild(p)
}