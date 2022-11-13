
$(document).ready(onReady);

function onReady(){
    // get the tasks from the database
    getTasks();
    // add click listeners
    $('#create-task').on('click', createTaskPopup);
    $('#tasks').on('click', '.delete-btn', deleteTask);
    $('#tasks').on('click', '.complete-btn', completeTask);
}

function createTaskPopup(){
    // when create a task button is clicked
    // show a SweetAlert dialog
    Swal.fire({
        title: `New task`,
        html: `<input type="text" id="new-task-name" class="swal2-input" placeholder="Task Name">
        <input type="text" id="new-task-description" class="swal2-input" placeholder="Description">
        `,
        confirmButtonText: 'Create',
        focusConfirm: false,
        preConfirm: () => { 
            const taskName = Swal.getPopup().querySelector('#new-task-name').value || 'Untitled Task';
            const taskDescription = Swal.getPopup().querySelector('#new-task-description').value || 'No description given.';
            return {
                name: taskName,
                description: taskDescription,
                date: 'placeholder',
                completed: false
            }
        }
    }).then((result) => {
        addTask(result.value);
    });
    
}

function addTask(task){
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: task
    }).then((response) => {
        Swal.fire('Task added successfully.', '', 'success');
        getTasks();
    }).catch((error) => {
        console.log('Ajax POST error: ', error);
    });
}

function getTasks(){
    // get the tasks from the database
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response){
        // then call render function
        render(response);
    }).catch(function(error){
        console.log('Ajax GET error ', error);
    });
}

function completeTask(){
    // set task to completed
    const taskId = $(this).data('id');
    $.ajax({
        type: 'PUT',
        url: `/tasks/${taskId}`,
        data: {
            completed: true
        }
    }).then(function() {
        getTasks();
    }).catch((error) => {
        console.log('Ajax PUT error ', error);
    })
}

function deleteTask(){
    // delete the task
    let name = $(this).data('name');
    Swal.fire({
        title: `Are you sure you want to delete the task '${name}'?`,
        showCancelButton: true,
        confirmButtonText: 'Delete',
    }).then((result) => {
        if (result.isConfirmed) {
            const id = $(this).data('id');
            $.ajax({
                type: 'DELETE',
                url: `/tasks/${id}`
            }).then(function() {
                getTasks();
            }).catch((error) => {
                console.log('Ajax DELETE error', error);
            });
            Swal.fire(`The task '${name}' was successfully deleted.`, '', 'success');
        } else if (result.isDenied) {
            console.log('DELETE cancelled.');
        }
    });
}

function render(response){
    $('#tasks').empty();

    // update koala table
    for (let task of response) {
        $('#tasks').append(`
            <tr class="${task.completed ? 'isCompleted' : 'notCompleted'}">
                <td data-id='${task.id}'>${task.name}</td>
                <td data-id='${task.id}'>${task.description}</td>
                <td data-id='${task.id}'>${task.date}</td>
                <td data-id='${task.id}'>${task.completed}</td>
                <td><button class="delete-btn" data-name='${task.name}' data-id='${task.id}'>Delete</button></td>
                <td>${task.completed ? 'Completed!' : `<button class="complete-btn" data-id='${task.id}'>Complete Task</button>`}</td>
            </tr>
        `);
    }
}