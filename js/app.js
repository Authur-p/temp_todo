var taskInput = document.getElementById("new-task");                     
var addButton = document.getElementsByTagName("button")[0];               
var incompleteTasksHolder = document.getElementById("incomplete-tasks");  
var storage = window.localStorage;


//WELCOME
var welcome = document.querySelector('#welcome')
welcome.classList.add('fade')

document.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(function() {
    welcome.classList.remove('fade');
  }, 1000);

  window.setTimeout(function() {
    document.body.removeChild(welcome);
  }, 3000);
});


var createNewTaskElement = function(taskString) {       
  var listItem = document.createElement("li");         
  var checkBox = document.createElement("input");       
  var label = document.createElement("label");          
  var deleteButton = document.createElement("button");  

  checkBox.type = "checkbox";         
  deleteButton.innerText = "Delete";  
  deleteButton.className = "delete";  
  label.innerText = taskString;       

  listItem.appendChild(checkBox);     
  listItem.appendChild(label);        
  listItem.appendChild(deleteButton);  


  storage.setItem(taskString, taskString);


  return listItem;
};

var addTask = function() {                            
  var listItemName = taskInput.value || "New Item";   
  var listItem = createNewTaskElement(listItemName);  
  incompleteTasksHolder.appendChild(listItem);        
  bindTaskEvents(listItem);           
  taskInput.value = "";                               
};


var addTaskLocal = function(taskString) {                            
  var listItemName = taskInput.value || "New Item";   
  var listItem = createNewTaskElement(taskString);  
  incompleteTasksHolder.appendChild(listItem);        
  bindTaskEvents(listItem);           
  taskInput.value = "";                               
};


var deleteTask = function() {      
  var listItem = this.parentNode;  
  var ul = listItem.parentNode;    
  ul.removeChild(listItem);   
  storage.removeItem(listItem.childNodes[1].innerText)
};


var bindTaskEvents = function(taskListItem) {  
  var checkBox = taskListItem.querySelector("input[type=checkbox]");  
  var deleteButton = taskListItem.querySelector("button.delete");                
  deleteButton.onclick = deleteTask;                                 
  checkBox.onchange = deleteTask;                           
};

addButton.addEventListener("click", addTask);  


function allStorage() {
  var values = [],
      keys = Object.keys(storage),
      i = keys.length;

  while ( i-- ) {
      values.push(storage.getItem(keys[i]) );
  }

  return values;
}

var values = allStorage();
values.forEach(value => {
  addTaskLocal(value)
})