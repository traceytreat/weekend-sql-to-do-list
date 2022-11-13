
$(document).ready(onReady);

function onReady(){
    // get the tasks from the database

    // add click listeners
    $('#create-task').on('click', addTask);
}

function addTask(){
    // when create a task button is clicked
    // show a SweetAlert dialog
    Swal.fire('Task added successfully.');
    // then post the info collected to the database
}

function getTasks(){
    // get the tasks from the database
    // then call render function
}