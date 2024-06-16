const todoList = []; 
let username;

renderList();

function renderList() {
    let todoListHTML = '';

    for(let i = 0; i < todoList.length; i++) {
        const value = todoList[i];
        const name = value.name;
        const dueDate = value.dueDate;
        const html = `
        <div class="todo-item">
        <p class="name">${name}</p> <p class="date">${dueDate}</p>
        <button onclick="
          todoList.splice(${i}, 1);
          renderList(); moveNumber2();
        " id="delete-btn">✖</button>
        <button onclick="
        mainList(${i}); toggleStar(${i});
        " id="star" class="starBtn js-star">⭐</button>
        </div>
        `;
        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}
    
function addTodo() {

    const inputElement = document.querySelector('.js-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-date-input');
    const dueDate = dateInputElement.value;

    todoList.push({
        name,
        dueDate
    }); 

    inputElement.value = '';

    renderList();
}

let mainNumber = document.getElementById('mainNumber');

function moveNumber () {
    let text = mainNumber.innerText;
    let plusNumber = parseInt(text.match(/\d+/)[0]);
    mainNumber.innerText = "Everything:" + (plusNumber +  1); 
};

function moveNumber2() {
    let text = mainNumber.innerText;
    let plusNumber = parseInt(text.match(/\d+/)[0]);
    mainNumber.innerText = 'Everything:' + (plusNumber - 1); 
};
function reset () {
    mainNumber.innerText = 'Everything: 0';
}

function mainList(index) {
    // перевірка чи є індекс
    if (index >= 0 && index < todoList.length) {
        const mainTask = todoList[index];
        
        // видаляємо завдання зі списку
        todoList.splice(index, 1);
        
        // додаємо завдання знову на початок списку
        todoList.unshift(mainTask);
        
        // перерендерюємо список
        renderList();
    } else {
        console.log("Невірний індекс!");
    }
}

