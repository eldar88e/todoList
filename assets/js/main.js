function ListenLi(event, toDoList) {
    let targetBtn = event.target;
    if (targetBtn.dataset.type === 'remove' || (targetBtn.tagName === 'I' && targetBtn.parentElement.dataset.type === 'remove')) {
        let parent = (targetBtn.dataset.type === 'remove') ? targetBtn.parentElement.parentElement.parentElement : targetBtn.parentElement.parentElement.parentElement.parentElement;
        let idx = parseFloat(parent.dataset.index);
        toDoList.splice(idx, 1);
        localStorage.setItem('user', JSON.stringify(toDoList));
        parent.remove();
    } else if (targetBtn.dataset.type === 'success' || (targetBtn.tagName === 'I' && targetBtn.parentElement.dataset.type === 'success')) {
        let parent = (targetBtn.dataset.type === 'success') ? targetBtn.parentElement.parentElement.parentElement : targetBtn.parentElement.parentElement.parentElement.parentElement;
        let btn    = (targetBtn.dataset.type === 'success') ? targetBtn : targetBtn.parentElement;
        let idx    = parseFloat(parent.dataset.index);
        btn.classList.toggle('orange');
        toDoList[idx].status = !toDoList[idx].status;
        localStorage.setItem('user', JSON.stringify(toDoList));
        parent.classList.toggle('decoration');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let toDoList  = JSON.parse(localStorage.getItem('user')) || [];
    let outputDiv = document.getElementById('output');
    
    document.getElementById('add-do').addEventListener('submit', function(event) {
        event.preventDefault();
        const userInput = document.getElementById('userInput').value;
        let found       = toDoList.some(i => i.do === userInput);
        
        if (found) {
            alert('Элемент уже существует в списке дел!');
        } else {
            if (userInput !== '') {
                let newTask = { do: userInput, status: false }; 
                toDoList.push(newTask);
                localStorage.setItem('user', JSON.stringify(toDoList));
                let idx = toDoList.length - 1;
                outputDiv.innerHTML += addTask(newTask, idx);
                document.dispatchEvent(customEvent);
            }
        }
    });
    
    document.getElementById('clear').addEventListener('click', function() {
        outputDiv.innerHTML = '';
        toDoList = [];
        localStorage.setItem('user', JSON.stringify(toDoList));
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
                <span>${task}</span>
                
                <div class="btns">
                <button class="waves-effect waves-light btn-small red" data-type="remove">
                    <i class="material-icons">delete</i>
                </button>
                
                <button class="waves-effect waves-light btn-small${klassBtn}" data-type="success">
                    <i class="material-icons">check</i>
                </button>
                </li>
                </div>
                <div>`;
    }
    
    
    outputDiv.addEventListener('click', function(event) {
       ListenLi(event, toDoList);
    }); 
});

let customEvent = new Event('myCustomEvent');

document.addEventListener('myCustomEvent', function(event) {
    document.getElementById('userInput').value = '';
});
