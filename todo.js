let tasks=[];
const taskList=document.getElementById('list');
const addTaskInput=document.getElementById('add');
const tasksCounter=document.getElementById('tasks-counter');
console.log("working");
function initializeApp(){
    fetchTodos();
    addTaskInput.addEventListener('keypress', handleInputkeyPress);
    document.addEventListener('click',handleClickListener);
}
initializeApp();
 async function   fetchTodos(){
    // fetch('https://jsonplaceholder.typicode.com/todos')
    // .then(function(response){
    //   return response.json();
    // }).then(function(data){
    //     tasks=data.slice(0,10);
    //     renderList();
    // })
    // .catch(function(error){
    //       console.log(error);
    // })
    try{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data =await response.json();
        tasks=data.slice(0,10);
        renderList();
    }
    catch(error){
        console.log(error);
    }
 
}
function handleClickListener(e){
    const target=e.target;
   // console.log(target);
    if(target.className==='delete'){
        const taskid=target.dataset.id;
        deleteTask(taskid);
        return;

    }
    else if(target.className==='custom-checkbox'){
        const taskid=target.id;
        toggletask(taskid);
        return;
    }
}
function addTaskToDOM(task){
const li=document.createElement('li');
li.innerHTML=`
<input type="checkbox" id="${task.id}" ${task.completed ? 'checked':''} class="custom-checkbox">
<label for="${task.id}">"${task.title}"</label>
<img src="bin.png" class="delete" data-id="${task.id}" />
`;
taskList.append(li);
}
function renderList(){
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);
    }
         tasksCounter.innerHTML=tasks.length;
}
function toggletask(taskId){
    const task=tasks.filter(function(task) {
        return task.id === Number(taskId);
       
       });
       if(task.length>0){
        const currentTask=task[0];
        currentTask.completed=!currentTask.completed;
       renderList();
       showNotification("Task toggled sucesfully");
       return;
       }
       showNotification("could Not toggle the task");
}

function deleteTask(taskId){
const newTasks=tasks.filter(function(task) {
 return task.id !== Number(taskId);

})
tasks=newTasks;
renderList();
showNotification("Task deleted sucessfully");
}
function addTask(task){
    if(task){
        fetch('https://jsonplaceholder.typicode.com/todos',{
            method:'POST',
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(task),
            })
    .then(function(response){
      return response.json();
    }).then(function(data){
        tasks.push(task);
        renderList();
        showNotification("Task added sucessfully");
        
    })
    .catch(function(error){
          console.log(error);
    })
        // tasks.push(task);
        // renderList();
        // showNotification("Task added sucessfully");
        // return;
    }

}
function showNotification(text){
alert(text);
}
/*

*/
function handleInputkeyPress(event) {
    const text = event.target.value; // Declare 'text' variable here
    
    if (event.key === 'Enter') {
        //console.log('text:', text);
        
        if (!text) {
            showNotification("Task text can not be empty");
            return;
        }

        const task = {
            title:text,
            id: Date.now(),
            completed: false
        };
        
        event.target.value = '';
        addTask(task);
    }
}



