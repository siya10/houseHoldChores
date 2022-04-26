const choreName = document.querySelector('#input__chore')
const addBtn = document.querySelector('.submit__btn')
const colorsCont = document.querySelector('.asign__container')
const momCol = document.querySelector('#mom__col')
const dadCol = document.querySelector('#dad__col')
const sonCol = document.querySelector('#son__col')
const daughterCol = document.querySelector('#daughter__col')
const choresCont = document.querySelector('.chores__container')

// Event Listeners
addBtn.addEventListener('click', getChore)
colorsCont.addEventListener('click', setColor)
choresCont.addEventListener('click', deleteChore)

let person 

dataArr = []

function getChore(e){
    // get input value
    const addChore = choreName.value 
    // if input is not empty
    if(addChore !== ''){
        // create a new chore
        newChore = {
            "id": Math.floor((Math.random() * 1000) + 1),
            "chore": addChore,
            "asigned": person
        }
        // add chore to the array
        dataArr.push(newChore)
        // clear input
        clearInput()
        // clear colors
        resetColors()
        // add to list
        addToList(newChore)
        // reset person
        person = null
    }
    e.preventDefault()
}

// clear input
function clearInput() {
    choreName.value = ''
}

// deselect all colors
function resetColors(){
    const colors = document.querySelectorAll('.chore__color')
    colors.forEach((item)=>{
        item.classList = 'chore__color'
    })
}

// set colors
function setColor(e){
    resetColors()

    // select click color
    if(e.target.classList.contains('chore__color')){
        e.target.classList.toggle('selected')
        person = e.target.id
    }
}

// ADD CHORE TO LIST
function addToList(item){
    // console.log(chore)
    // create a new div
    const div = document.createElement('div')
    // add class
    div.classList = 'chore'
    // add Id
    div.id = item.id
    // add html
    div.innerHTML = `
    <p>${item.chore}</p>
    <i class="fas fa-times delete"></i>
    `

    // insert chore depending on who is gonna do it
    switch(item.asigned){
        case 'mom':
            momCol.insertAdjacentElement('beforeend', div)
            break
        case 'dad':
            dadCol.insertAdjacentElement('beforeend', div)
            break
        case 'son':
            sonCol.insertAdjacentElement('beforeend', div)
            break
        case 'daughter':
            daughterCol.insertAdjacentElement('beforeend', div)
            break
    }
}

// delete item
function deleteChore(e){
    if(e.target.classList.contains('delete')){
        let deleteEl

        // get id of element to delete from data
        const choreId = e.target.parentElement.id 
        // set element to be deleted
        dataArr.filter((item) =>{
            if(item.id === parseInt(choreId)){
                deleteEl = item
            }
        })
        // get index
        const index = dataArr.indexOf(deleteEl)
        // remove item from data array
        dataArr.splice(index, 1)
        // get element to delete from UI
        const  elementToDelete = e.target.parentElement
        // remove item from UI
        elementToDelete.remove()
        console.log(dataArr)
        
    }
}
//https://householdchores.netlify.app/