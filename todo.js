const toDoForm = document.querySelector('.js-toDoForm'),
    toDoInput = toDoForm.querySelector('input'),
    toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';
let toDosArr = []; //data

const CHECK = "fa-check-square-o",
    UNCHECK = "fa-check-square",
    LINE_THROUGH = "line-through";

function deleteToDo(event) {
    let btn = event.target;
    const li = btn.parentElement.parentElement.parentElement;
    toDoList.removeChild(li);
    const cleanToDos = toDosArr.filter(function (toDo) {
        console.log(toDo.id, li.id);
        return toDo.id !== li.id;
    }); //forEach함수처럼 toDosArr 각각에 function실행후 true인 요소로 새로운 arr을 만듬
    toDosArr = cleanToDos;
    console.log(toDosArr);
    saveToDos();
}
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDosArr));
}
function paintToDo(task) {
    const li = document.createElement('li'),
        finBtn = document.createElement('button'),
        delBtn = document.createElement('button'),
        span = document.createElement('span');

    const DONE = task.check ? CHECK : UNCHECK;
    const LINE = task.check ? LINE_THROUGH : '';
    const COLOR = task.check ? 'lightgray' : '';

    finBtn.classList.add("pl");
    finBtn.innerHTML = `<span class="hover" style="color: #fff;"><i class="fa ${DONE} fa-lg fa-border" id="${task.id}"></i></span>`;
    console.log(span);

    span.style.textDecoration = `${LINE}`;
    li.style.color = `${COLOR}`;

    delBtn.classList.add("pr");
    delBtn.innerHTML = `<span class="hover" style="color: #fff;"><i class="fa fa-trash de fa-lg fa-border" aria-hidden="true"></i></span>`;

    finBtn.addEventListener('click', function (e) {
        const target = e.target;
        const li = e.target.parentElement.parentElement.parentElement;
        const span = li.children;

        // 기존 클래스에 동일이름 중첩이 된다!!
        target.classList.toggle(CHECK);
        target.classList.toggle(UNCHECK);
        if(target.classList.contains(CHECK)){
            span[1].style.textDecoration = 'line-through';
            span[1].style.color = 'lightgray';
        }else{
            span[1].style.color = 'inherit';
            span[1].style.textDecoration = 'none';
        }
        li.classList.toggle(LINE_THROUGH);
        // if (hasClass) {
        //     target.classList.replace('fa-check-square', 'fa-check-square-o');
        toDosArr.forEach(function(item){
            if(item.id === target.id ){
                item.check = item.check ? false : true;
            }
        });
        console.log(toDosArr);
        saveToDos();
    });
    delBtn.addEventListener('click', deleteToDo);

    span.innerText = task.text;
    li.id = task.id;

    li.appendChild(finBtn);
    li.appendChild(span);
    li.appendChild(delBtn);

    toDoList.appendChild(li);

    // saveToDos();
}

//refresh이벤트초기화 및 input되는값에 적용할 함수
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = taskObj(toDoInput.value);
    paintToDo(currentValue);
    toDoInput.value = '';

    toDosArr.push(currentValue);
    console.log(toDosArr);
    saveToDos();
}
function taskObj(text) {
    var random = Math.random() * 10;
    var newId = random.toFixed(3);
    return {
        text: text,
        id: newId,
        check: false
    }
}
//LS에 저장된 data를 html로 
function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS); // key를 받아옴
    if (loadedToDos !== null) {
        toDosArr = JSON.parse(loadedToDos); // string → object
        
        //refresh해도 toDos를 불러와 화면에 저장된상태로 남아있도록
    }
    toDosArr.forEach(function (toDo) { 
        paintToDo(toDo); 
    });
}
function init() {
    loadToDos();
    toDoForm.addEventListener('submit', handleSubmit);
}
init();