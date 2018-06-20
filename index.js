var addButton=document.getElementById('add');
var showButton=document.getElementById('show');
var searchButton=document.getElementById('search');
var resetButton=document.getElementById('reset');
var inputTask=document.getElementById('new-task');
var unfinishedTasks=document.getElementById('unfinished-tasks');
var finishedTasks=document.getElementById('finished-tasks');

function createNewElement(task, taskCtgr, finished){
  var listItem=document.createElement('li');
  var checkbox=document.createElement('button');

  if (finished){
    checkbox.className="material-icons checkbox";
    checkbox.innerHTML="<i class='material-icons'>check_box</i>";
  } else {
    checkbox.className="material-icons checkbox";
    checkbox.innerHTML="<i class='material-icons'>check_box_outline_blank</i>";
  }

  var label=document.createElement('label');
  label.innerText=task;

  var input=document.createElement('input');
  input.type="text";
  input.style.visibility = 'hidden';

  var ctgr=document.createElement('label');
  ctgr.innerText=taskCtgr;

  var editButton=document.createElement('button');
  editButton.className="material-icons edit";
  editButton.innerHTML="<i class='material-icons'>edit</i>";

  var deleteButton=document.createElement('button');
  deleteButton.className="material-icons delete";
  deleteButton.innerHTML="<i class='material-icons'>delete</i>";

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(input);
  listItem.appendChild(ctgr);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

function showInCtgr() {
  var selectCtgr = document.getElementById('selectCtgr2');
  var ctgr = selectCtgr.options[selectCtgr.selectedIndex].text;

  if (ctgr != "все категории") {
    for (var i = 0; i < data.unfinishedTasks.length; i++) {
      console.log(data.unfinishedTasks[i])
      var ul = document.getElementById('unfinished-tasks');
      var items = ul.getElementsByTagName("li");
      if (data.unfinishedTasks[i].ctgr != ctgr) {
        items[i].style.display = 'none';
      } else {
        items[i].style.display = 'block';
      }
    }

    for (var i = 0; i < data.finishedTasks.length; i++) {
      console.log(data.finishedTasks[i])
      var ul = document.getElementById('finished-tasks');
      var items = ul.getElementsByTagName("li");
      if (data.finishedTasks[i].ctgr != ctgr) {
        items[i].style.display = 'none';
      } else {
        items[i].style.display = 'block';
      }
    }

  } else {
    for (var i = 0; i < data.unfinishedTasks.length; i++){
      var ul = document.getElementById('unfinished-tasks');
      var items = ul.getElementsByTagName("li");
      items[i].style.display = 'block';
    }

    for (var i = 0; i < data.finishedTasks.length; i++){
      var ul = document.getElementById('finished-tasks');
      var items = ul.getElementsByTagName("li");
      items[i].style.display = 'block';
    }

  }
}
showButton.onclick = showInCtgr;

function searchByName() {
  var searchTask = document.getElementById('search-task').value;

  if (searchTask != "") {
    for (var i = 0; i < data.unfinishedTasks.length; i++) {
      var ul = document.getElementById('unfinished-tasks');
      var items = ul.getElementsByTagName("li");
      if (data.unfinishedTasks[i].name.includes(searchTask)) {
        items[i].style.display = 'block';
      } else {
        items[i].style.display = 'none';
      }
    }

    for (var i = 0; i < data.finishedTasks.length; i++) {
      var ul = document.getElementById('finished-tasks');
      var items = ul.getElementsByTagName("li");
      if (data.finishedTasks[i].name.includes(searchTask)) {
        items[i].style.display = 'block';
      } else {
        items[i].style.display = 'none';
      }
    }

  }
}
searchButton.onclick = searchByName;

function resetSearch() {

  for (var i = 0; i < data.unfinishedTasks.length; i++) {
    var ul = document.getElementById('unfinished-tasks');
    var items = ul.getElementsByTagName("li");
    items[i].style.display = 'block';
  }

  for (var i = 0; i < data.finishedTasks.length; i++) {
    var ul = document.getElementById('finished-tasks');
    var items = ul.getElementsByTagName("li");
    items[i].style.display = 'block';
  }

  var searchTaskInput = document.getElementById('search-task');
  searchTaskInput.value = "";
}
resetButton.onclick = resetSearch;

function addTask() {
  var selectCtgr = document.getElementById('selectCtgr');
  var taskCtgr = selectCtgr.options[selectCtgr.selectedIndex].text;

  if (inputTask.value){
    var listItem=createNewElement(inputTask.value, taskCtgr, false);
    unfinishedTasks.appendChild(listItem);
    bindTaskEvents(listItem, finishTask);
    inputTask.value="";
  }
  save();
}
addButton.onclick=addTask;


function deleteTask(){
var listItem=this.parentNode;
var ul=listItem.parentNode;
ul.removeChild(listItem);
save();
}

function editTask(){
  var editButton=this;
  var listItem=this.parentNode;
  var label=listItem.querySelector('label');
  var input=listItem.querySelector('input[type=text]');
  input.style.visibility = 'visible';

  var containsClass=listItem.classList.contains('editMode');
  if (containsClass){
    label.innerText=input.value;
    editButton.className="material-icons edit";
    editButton.innerHTML="<i class='material-icons'>edit</i>";
    save();
    input.style.visibility = 'hidden';
  } else {
    input.value=label.innerText;
    input.style.visibility = 'visible';
    editButton.className="material-icons edit";
    editButton.innerHTML="<i class='material-icons'>save</i>";
  }
  listItem.classList.toggle('editMode');
}

function finishTask(){
  var listItem=this.parentNode;
  var checkbox=listItem.querySelector('button.checkbox');
  checkbox.className="material-icons checkbox";
  checkbox.innerHTML="<i class='material-icons'>check_box</i>";

  finishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
  save();
}

function unfinishTask(){
var listItem=this.parentNode;
var checkbox=listItem.querySelector('button.checkbox');
checkbox.className="material-icons checkbox";
checkbox.innerHTML="<i class='material-icons'>check_box_outline_blank</i>";

unfinishedTasks.appendChild(listItem);
bindTaskEvents(listItem, finishTask);
save();
}

function bindTaskEvents(listItem, checkboxEvent){
  var checkbox=listItem.querySelector('button.checkbox');
  var editButton=listItem.querySelector('button.edit');
  var deleteButton=listItem.querySelector('button.delete');

  checkbox.onclick=checkboxEvent;
  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
}

function save(){
  var unfinishedTasksArr=[];
  var elem = {};

  for(var i=0; i<unfinishedTasks.children.length; i++){
    elem = {};
    elem.name = unfinishedTasks.children[i].getElementsByTagName('label')[0].innerText;
    elem.ctgr = unfinishedTasks.children[i].getElementsByTagName('label')[1].innerText;
    unfinishedTasksArr.push(elem);
  }

  var finishedTasksArr=[];
  for(var i=0; i<finishedTasks.children.length; i++){
    elem = {};
    elem.name = finishedTasks.children[i].getElementsByTagName('label')[0].innerText;
    elem.ctgr = finishedTasks.children[i].getElementsByTagName('label')[1].innerText;
    finishedTasksArr.push(elem);
  }

  localStorage.removeItem('todo');
  localStorage.setItem('todo', JSON.stringify({unfinishedTasks: unfinishedTasksArr, finishedTasks: finishedTasksArr}));
}

function load(){
  return JSON.parse(localStorage.getItem('todo'));
}


var data=load();
for(var i = 0; i < data.unfinishedTasks.length; i++){
  var listItem = createNewElement(data.unfinishedTasks[i].name, data.unfinishedTasks[i].ctgr, false);
  unfinishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, finishTask);
}

for(var i=0; i<data.finishedTasks.length; i++){
  var listItem=createNewElement(data.finishedTasks[i].name, data.finishedTasks[i].ctgr, true);
  finishedTasks.appendChild(listItem);
  bindTaskEvents(listItem, unfinishTask);
}
