document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('addTaskButton');
    const newTaskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');
    const clearCompletedButton = document.getElementById('clearCompletedButton');
    const downloadTasksButton = document.getElementById('downloadTasksButton'); // New download button

    // Load tasks when the page is first loaded
    loadTasks();

    // Add task when clicking the "Add Task" button
    addTaskButton.addEventListener('click', () => {
        toggleTaskInput();
    });

    // Add task when pressing "Enter" in the input field
    newTaskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const newTaskText = newTaskInput.value.trim();
            if (newTaskText) {
                addTask(newTaskText);
                newTaskInput.value = '';
                newTaskInput.style.display = 'none'; // Hide the input field again
            }
        }
    });

    taskList.addEventListener('change', (e) => {
        if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const listItem = e.target.parentElement;
            if (e.target.checked) {
                listItem.classList.add('completed'); // Optional: Add class for styling completed tasks
            } else {
                listItem.classList.remove('completed'); // Remove class if unchecked
            }
            saveTasks();
        }
    });

    clearCompletedButton.addEventListener('click', () => {
        const completedTasks = taskList.querySelectorAll('li input[type="checkbox"]:checked');
        completedTasks.forEach(task => {
            const listItem = task.parentElement;
            listItem.remove(); // Remove the completed task from the task list
        });
        saveTasks(); // Save remaining tasks to local storage
    });

    // New event listener for downloading tasks
    downloadTasksButton.addEventListener('click', downloadTasks);

    function toggleTaskInput() {
        if (newTaskInput.style.display === 'none') {
            newTaskInput.style.display = 'inline'; // Show the input field
            newTaskInput.focus(); // Focus on the input field
        } else {
            const newTaskText = newTaskInput.value.trim();
            if (newTaskText) {
                addTask(newTaskText);
                newTaskInput.value = '';
                newTaskInput.style.display = 'none'; // Hide the input field again
            }
        }
    }

    function addTask(taskText) {
        const newListItem = document.createElement('li');
        newListItem.innerHTML = `
            <input type="checkbox"> 
            <label><span>${taskText}</span></label>
            <button class="removeTaskButton" aria-label="Remove task">
                <i class="material-icons">delete</i>
            </button>
        `;
        taskList.appendChild(newListItem);
        saveTasks();

        newListItem.querySelector('.removeTaskButton').addEventListener('click', () => {
            newListItem.remove();
            saveTasks();
        });
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            const taskText = task.querySelector('span').textContent;
            const isChecked = task.querySelector('input').checked;
            tasks.push({ text: taskText, completed: isChecked });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks to local storage
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        taskList.innerHTML = ''; // Clear existing tasks

        if (savedTasks) {
            savedTasks.forEach(task => {
                const newListItem = document.createElement('li');
                newListItem.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''}> 
                    <label><span>${task.text}</span></label>
                    <button class="removeTaskButton" aria-label="Remove task">
                        <i class="material-icons">delete</i>
                    </button>
                `;
                taskList.appendChild(newListItem);
                
                newListItem.querySelector('.removeTaskButton').addEventListener('click', () => {
                    newListItem.remove();
                    saveTasks();
                });
            });
        }
    }

    // Function to download tasks as a CSV file
    function downloadTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            const taskText = task.querySelector('span').textContent;
            const isChecked = task.querySelector('input').checked ? 'Completed' : 'Not Completed';
            tasks.push(`${taskText}, ${isChecked}`);
        });

        const csvContent = "data:text/csv;charset=utf-8," + tasks.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "tasks.csv"); // Name of the downloaded file
        document.body.appendChild(link); // Required for Firefox

        link.click(); // Initiates the download
        document.body.removeChild(link); // Clean up
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const eventDateSpan = document.getElementById('eventDate');
    const dateInput = document.getElementById('dateInput');

    // Initialize Flatpickr on the hidden input field
    const flatpickrInstance = flatpickr(dateInput, {
        onChange: function(selectedDates, dateStr, instance) {
            // Display the selected date in the span
            eventDateSpan.textContent = dateStr;
        },
        dateFormat: "Y-m-d", // Change the date format as needed
        allowInput: true // Allows manual input
    });

    // Show the calendar on click
    eventDateSpan.addEventListener('click', (e) => {
        flatpickrInstance.open(); // Open the calendar

        // Position the calendar below the event date span
        const rect = eventDateSpan.getBoundingClientRect();
        const calendar = document.querySelector('.flatpickr-calendar');
        calendar.style.top = `${rect.bottom + window.scrollY + 5}px`; // Position below
        calendar.style.left = `${rect.left}px`; // Align horizontally
    });

    // Close the calendar when clicking outside
    document.addEventListener('click', (event) => {
        if (!eventDateSpan.contains(event.target) && !dateInput.contains(event.target)) {
            flatpickrInstance.close(); // Close the calendar
        }
    });
});
