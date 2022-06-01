let savedIndex = 0;

//database constructor
function CreateDatabase (){
    this.database = []
}
//save to database method
CreateDatabase.prototype.saveTasks = function (tasks) {
    this.database.push(tasks)
}

//delete from database method
CreateDatabase.prototype.deleteTask = function(taskindex) {
    this.database.splice(taskindex, 1)
}

//edit database method
CreateDatabase.prototype.editTask = function(taskindex, input){
    this.database.splice(taskindex, 1, input)
}

//app Dom items constructor
function CreateDomItems() {}


//This Method creates all the HTML elements the app needs
CreateDomItems.prototype.initApp = function () {
    const h3 = document.createElement('h3')
    const form = document.createElement('form')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const buttontoadd = document.createElement('button')
    const buttontosave = document.createElement('button')
    const section = document.createElement('section')
    
    h3.textContent = "Please insert your tasks"
    
    label.htmlFor = "add task section"
    
    //input to receive tasks
    input.id ="Todo-text"
    input.className = "todo-text"
    input.placeholder = "Add To-Dos" 

    //button to add tasks
    buttontoadd.id = "add-btn"
    buttontoadd.className = "add-btn"
    buttontoadd.textContent = "Add"

    //button to save tasks after being edited
    buttontosave.id = "Save-btn"
    buttontosave.className = "Save-btn"
    buttontosave.textContent = "Save"
    buttontosave.style.display = "none"

    //container for task list
    section.id = "list-space"
    section.className = "list-space"
    
    form.appendChild(label)
    label.appendChild(input)
    label.appendChild(buttontoadd)
    label.appendChild(buttontosave)
    return {
        h3,
        form, 
        buttontoadd, 
        buttontosave,
        section
    }
}


//This method evaluate input value, if ok send it database and call displayer
CreateDomItems.prototype.addtaskevent = function (btn) {
    const displaylist = this.displaylist;
    btn.addEventListener("click", function(prevent) {
        prevent.preventDefault();
        
        const input = document.querySelector("#Todo-text")
        if (input.value != null && input.value != '') {
            DatabaseMethod.saveTasks(input.value) 
            displaylist();
            input.value = "";
        }
        
    })
}

//this method creates edit, delete buttons and shows the generated task to the user
CreateDomItems.prototype.displaylist = function () {
    let writeOnHTML = '';
    DatabaseMethod.database.forEach((task, index) => {
        writeOnHTML += `
            <p> ${index + 1} ${task}</p>
            <button onclick = "CreateDomItems.prototype.editTaskEvent(${index})" type="submit" id = "edit-btn" class = "edit-btn" > Edit</button>
            <button onclick = "CreateDomItems.prototype.deleteTask(${index})" type="submit" id = "delete-btn" class = "delete-btn"> Delete</button>
    `;
    })
    return document.querySelector('#list-space').innerHTML = writeOnHTML;
}


//This method edit any task and send the info to displayer and database to be updated. 
CreateDomItems.prototype.editTaskEvent = function(taskindex){
    const input = document.getElementById('Todo-text')
    const addbutton = document.getElementById('add-btn')
    const savebutton = document.getElementById('Save-btn')
    input.value = DatabaseMethod.database[taskindex];
    savedIndex = taskindex;

    //switching buttons
    savebutton.style.display = "inline-block";
    addbutton.style.display = "none";
}

CreateDomItems.prototype.deleteTask = function (taskindex){
    DatabaseMethod.deleteTask(taskindex)
    CreateDomItems.prototype.displaylist();
}

CreateDomItems.prototype.saveTaskEvent = function (savebutton, addbutton, todotext) {
    savebutton.addEventListener('click', function (prevent) {
        prevent.preventDefault();
        console.log(todotext.value)
        if (todotext.value != null && todotext.value != "") {
            console.log(` index to be edited ${savedIndex} input value ${todotext.value}`);
            DatabaseMethod.editTask(savedIndex, todotext.value)
            
          } else {
            alert("Blank not allowed; Please, click on delete instead");
            
          }
          addbutton.style.display = "inline-block";
          savebutton.style.display = "none";
          todotext.value = ''
          CreateDomItems.prototype.displaylist();
    })
    
}

//This creates new objects
const domitem = new CreateDomItems();
const DatabaseMethod = new CreateDatabase();

// Inject app elements to html 
document.querySelector('#Main-section').appendChild(domitem.initApp().h3)
document.querySelector('#Main-section').appendChild(domitem.initApp().form)
document.querySelector('#Main-section').appendChild(domitem.initApp().section)

domitem.addtaskevent(
    document.getElementById('add-btn')
)
domitem.saveTaskEvent(
    document.getElementById('Save-btn'),
    document.getElementById('add-btn'),
    document.getElementById('Todo-text')
)
