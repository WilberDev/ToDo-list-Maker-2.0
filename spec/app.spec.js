describe("Testing ToDo list maker", ()=>{
  let DatabaseMethod, task1, task2, input
  beforeEach(function () {
    DatabaseMethod = new CreateDatabase();
    task1 = "Go to the gorcery store"
    task2 = "Go to pay gas bills"
  })

  it("Should init the app on HTML",()=>{
    const h3 = document.createElement('h3')
    const form = document.createElement('form')
    const label = document.createElement('label')
    const input = document.createElement('input')
    const buttontoadd = document.createElement('button')
    const buttontosave = document.createElement('button')
    const section = document.createElement('section')
    
    h3.textContent = "Please insert your tasks"
    
    label.htmlFor = "add task section"

    input.id ="Todo-text"
    input.className = "todo-text"
    input.placeholder = "Add To-Dos" 

    buttontoadd.id = "add-btn"
    buttontoadd.className = "add-btn"
    buttontoadd.textContent = "Add"

    buttontosave.id = "Save-btn"
    buttontosave.className = "Save-btn"
    buttontosave.textContent = "Save"
    buttontosave.style.display = "none"

    section.id = "list-space"
    section.className = "list-space"
    
    form.appendChild(label)
    label.appendChild(input)
    label.appendChild(buttontoadd)
    label.appendChild(buttontosave)
    expect(domitem.initApp().h3).toEqual(h3)
    expect(domitem.initApp().form).toEqual(form)
    expect(domitem.initApp().section).toEqual(section)
  })
  it("Should save a task", () => {
    DatabaseMethod.saveTasks(task1)
    expect(DatabaseMethod.database.length).toBe(1)
    expect(DatabaseMethod.database[0]).toEqual(task1)
    
  })
  it("Should delete tasks", ()=>{
    DatabaseMethod.saveTasks(task1)
    expect(DatabaseMethod.database[0]).toEqual(task1)
    DatabaseMethod.deleteTask(0)
    expect(DatabaseMethod.database[0]).toBeUndefined()
    expect(DatabaseMethod.database.length).toBe(0)
  })

  it("Should edit/modify tasks",()=>{
    DatabaseMethod.saveTasks(task1)
    expect(DatabaseMethod.database[0]).toEqual(task1)
    task1modified = "Go to the superMarket"
    DatabaseMethod.editTask(0, task1modified)
    expect(DatabaseMethod.database[0]).toEqual(task1modified)
  })
})