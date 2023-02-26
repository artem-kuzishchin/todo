class ToDoApp {
    constructor() {
        this.todos = [];
        this.initPageLayout();
        this.initListeners();
    }
    initPageLayout() {
        let root = document.getElementById("App");
        let instructions = document.createElement("div");
        instructions.id = "instructions";
        instructions.innerText = "Add your to-do items in the form below!";
        root.appendChild(instructions);
        let newToDoForm = document.createElement("form");
        newToDoForm.id = "form";
        let newToDoContent = document.createElement("input");
        newToDoContent.type = "text";
        newToDoContent.id = "newToDoText";
        let submitBut = document.createElement("input");
        submitBut.type = "submit";
        newToDoForm.appendChild(newToDoContent);
        newToDoForm.appendChild(submitBut);
        instructions.appendChild(newToDoForm);
        let toDoList = document.createElement("div");
        toDoList.id = "toDoList";
        root.appendChild(toDoList);
    }
    initListeners() {
        let form = document.getElementById("form");
        form.addEventListener("submit", event => { this.processForm(event); });
    }
    processForm(submittedForm) {
        submittedForm.preventDefault();
        const text = document.getElementById("newToDoText");
        if (text.value != "") {
            console.log(text.value);
            this.addToDo(text.value.trim());
            text.value = "";
        }
    }
    addToDo(text) {
        let newToDo = {
            id: Math.random(),
            content: text,
            complete: false
        };
        this.todos.push(newToDo);
        let newToDoDiv = document.createElement("div");
        newToDoDiv.id = newToDo.id.toString();
        let newToDoText = document.createElement("span");
        newToDoText.id = newToDo.id.toString() + "txt";
        newToDoText.innerText = newToDo.content;
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", e => this.handleEditRequest(newToDo.id));
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", e => this.removeToDo(newToDo.id));
        newToDoDiv.append(newToDoText, editButton, deleteButton);
        let toDoList = document.getElementById("toDoList");
        toDoList.appendChild(newToDoDiv);
    }
    removeToDo(id) {
        this.todos = this.todos.filter(value => value.id != id);
        let todo = document.getElementById(id.toString());
        todo.remove();
    }
    handleEditRequest(id) {
        let selectedToDo = document.getElementById(id.toString());
        let text = document.getElementById(id.toString() + "txt").innerText;
        let replaceDiv = document.createElement("div");
        selectedToDo.id = "-1";
        replaceDiv.id = id.toString();
        let editText = document.createElement("input");
        editText.value = text;
        editText.id = "editInput";
        let saveButton = document.createElement("button");
        saveButton.id = "saveButton";
        saveButton.innerText = "Save";
        saveButton.addEventListener("click", e => this.saveEdit(id));
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", e => this.removeToDo(id));
        replaceDiv.append(editText, saveButton, deleteButton);
        selectedToDo.replaceWith(replaceDiv);
    }
    saveEdit(id) {
        let editInput = document.getElementById("editInput");
        let text = editInput.value;
        let newText = document.createElement("span");
        newText.id = id.toString() + "txt";
        newText.innerText = text;
        editInput.replaceWith(newText);
        let saveButton = document.getElementById("saveButton");
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.addEventListener("click", e => this.handleEditRequest(id));
        saveButton.replaceWith(editButton);
    }
}
let App = new ToDoApp();
//# sourceMappingURL=todo.js.map