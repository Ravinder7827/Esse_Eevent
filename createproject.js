 // Event listener for creating a new project
document.getElementById('create-project-btn').addEventListener('click', function() {
    const projectName = prompt("Enter the name of the new project:");
    if (projectName) {
        addProject(projectName);
    }
});

// Function to show project details if available
function showProjectDetails() {
    const projectName = localStorage.getItem('projectName');
    if (projectName) {
        addProject(projectName);
        showDetails(projectName);
        localStorage.removeItem('projectName'); // Clear the stored name after showing details
    }
}

// Function to add a project
function addProject(name) {
    const projectContainer = document.getElementById('projects-container');

    const projectDiv = document.createElement('div');
    projectDiv.className = 'bg-white rounded-lg shadow-lg p-6 w-48 mb-4';

    const projectContent = `
        <div class="flex flex-col items-center">
            <div class="w-16 h-16 bg-gray-200 rounded-t-lg mb-4"></div>
            <p class="text-purple-500 mb-2">${name}</p>
            <button class="text-gray-500 text-sm" onclick="showDetails('${name}')">View Details</button>
            <button class="text-red-500 text-sm mt-2" onclick="deleteProject(this)">Delete</button>
        </div>
    `;

    projectDiv.innerHTML = projectContent;
    projectContainer.appendChild(projectDiv);
}

// Function to show project details
function showDetails(name) {
    document.getElementById('project-title').innerText = name;
    document.getElementById('project-details').classList.remove('hidden');

    document.getElementById('complete-project-btn').onclick = function() {
        markAsComplete(name);
    };
    document.getElementById('download-pdf-btn').onclick = function() {
        downloadPDF(name);
    };
}

// Function to mark a project as complete
function markAsComplete(name) {
    alert(`${name} has been marked as complete!`);
    document.getElementById('project-details').classList.add('hidden');
}

// Function to download project details as PDF
function downloadPDF(name) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text(`Project Name: ${name}`, 10, 10);
    doc.save(`${name}.pdf`);
}

// Function to delete a project
function deleteProject(button) {
    const projectDiv = button.parentNode.parentNode;
    projectDiv.remove();
    alert('Project has been deleted!');
}

// Function to close project details
function closeDetails() {
    document.getElementById('project-details').classList.add('hidden');
}

// Call showProjectDetails on page load
document.addEventListener('DOMContentLoaded', showProjectDetails);
