// API
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.getElementById('grid-container');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('close-btn');
const employeeCard = document.getElementById('employee-card');

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(employeeData);

// Employee data
function employeeData(employee) {
    let employees = employee;

    let employeeHTML = ``;

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let location = employee.location;
        let img = employee.picture.large;

        employeeHTML += `
            <div class="employee-card" id="employee-card" data-index="${index}">
                <img class="employee-img" src="${img}" alt="${name.first} ${name.last}">
                <div class="employee-info">
                    <h3 class="employee-name">${name.first} ${name.last}</h3>
                    <p class="employee-email">${email}</p>
                    <p class="employee-city">${location.city}, ${location.state}</p>
                </div>
            </div>
        `;
    });

    gridContainer.innerHTML = employeeHTML;
}

// Modal
function toggleModal() {
    modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

gridContainer.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
