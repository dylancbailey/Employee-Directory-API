// API
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.close-btn');
const employeeCard = document.querySelector('.employee-card');

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(employeeData)
    .catch(err => console.log(err));

// Employee data
function employeeData(employeeData) {
    employees = employeeData;

    let employeeHTML = ``;

    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let location = employee.location;
        let img = employee.picture.large;

        employeeHTML += `
            <div class="employee-card" data-index="${index}">
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
function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);
    
    const modalHTML = `
        <img class="modal-img" src="${picture.large}">
        <div class="modal-text-container">
            <h3 class="modal-name">${name.first} ${name.last}</h3>
            <p class="modal-email">${email}</p>
            <p class="modal-address">${city}</p>
            <hr class="modal-divider">
            <p>${phone}</p>
            <p class="modal-address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    modal.classList.toggle('show-modal');
    modalContent.innerHTML = modalHTML;
}

// Event Listener
gridContainer.addEventListener('click', e => {
    const target = e.target;
    if (target !== gridContainer) {
        const card = target.closest('.employee-card');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    modal.classList.toggle('show-modal');
});