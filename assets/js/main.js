function removeTask(parent, idx, toDoList) {
    toDoList.splice(idx, 1);
    localStorage.setItem('todolist', JSON.stringify(toDoList));
    parent.remove();
}

function toggleTaskStatus(parent, idx, btn, toDoList) {
    btn.classList.toggle('orange');
    toDoList[idx].status = !toDoList[idx].status;
    localStorage.setItem('todolist', JSON.stringify(toDoList));
    parent.classList.toggle('decoration');
}

document.addEventListener('DOMContentLoaded', function() {
    let toDoList  = JSON.parse(localStorage.getItem('todolist')) || [];
    let outputDiv = document.getElementById('output');
    
    document.getElementById('add-do').addEventListener('submit', function(event) {
        event.preventDefault();
        const userInput = document.getElementById('userInput').value;
        
        if (toDoList.some(i => i.do === userInput)) return alert('Элемент уже существует в списке дел!');
        
        if (userInput === '') return;
        
        let newTask = { do: userInput, status: false }; 
        toDoList.push(newTask);
        localStorage.setItem('todolist', JSON.stringify(toDoList));
        let idx = toDoList.length - 1;
        outputDiv.innerHTML += addTask(newTask, idx);
        document.dispatchEvent(customEvent);
    });
    
    document.getElementById('clear').addEventListener('click', function() {
        outputDiv.innerHTML = '';
        toDoList = [];
        localStorage.setItem('todolist', JSON.stringify(toDoList));
    });

    toDoList.forEach(function(item, idx) {
        outputDiv.innerHTML += addTask(item, idx);
    });
    
    function addTask(item, idx) {
        let klass = (item.status) ? ' decoration' : '';
        let task  = item.do;
        let klassBtn = (item.status) ? ' orange' : '';
        return `<li class="collection-item${klass}" data-index="${idx}">
                    <div class="task">
                        <div class="title">${task}</div>
                        
                        <div class="btns">
                            <button class="waves-effect waves-light btn-small red" data-type="remove">
                                <i class="material-icons">delete</i>
                            </button>
                            
                            <button class="waves-effect waves-light btn-small${klassBtn}" data-type="success">
                                <i class="material-icons">check</i>
                            </button>
                        </div>
                    </div>
                </li>`;
    }
    
    
    outputDiv.addEventListener('click', function(event) {
        let targetBtn = event.target.closest('button');
        let parent = targetBtn.closest('li');
        let idx = parseFloat(parent.dataset.index);

        if (targetBtn.dataset.type === 'remove') {
            removeTask(parent, idx, toDoList);
        } else if (targetBtn.dataset.type === 'success') {
            toggleTaskStatus(parent, idx, targetBtn, toDoList);
        }
    });  
});

let customEvent = new Event('myCustomEvent');

document.addEventListener('myCustomEvent', function(event) {
    document.getElementById('userInput').value = '';
});
