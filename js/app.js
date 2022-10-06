// API
let employees = [];
let number 
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.close-btn');
const employeeCard = document.querySelector('.employee-card');
const searchBar = document.querySelector('.search');
const rightArrow = document.querySelector('.right-arrow');

// Fetch API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));


// Display Employees
function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = ``;

    employees.forEach((employee, index) => {
        let name = employee.name;
        let img = employee.picture.large;
        let email = employee.email;
        let location = employee.location;

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
function showModal(index) {
    let { name, email, dob, phone, location: 
        { street, city, state, postcode }, 
        picture } = employees[index];

    let date = new Date(dob.date);
    let modalHTML = ``;

    modalHTML += `
        <img class="modal-img" src="${picture.large}" data-index="${index}">
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

    modal.classList.add('show-modal');
    modalContent.innerHTML = modalHTML;

}

const checkCard = (e) => {
    let target = e.target;
    if (target !== gridContainer) {
        const card = target.closest('.employee-card');
        const index = card.getAttribute('data-index');
        showModal(index);    
    }
};

const toggleClass = () => modal.classList.toggle('show-modal');

// Modal Arrows
const modalArrows = e => {
    const target = e.target.classList.value;
    const img = document.querySelector('.modal-img');
    let index = img.getAttribute('data-index');
    index = parseInt(index);

    if (index < 11 && index != 12) {
        if (target === 'right-arrow') {
            showModal(index += 1);
        }
    }
    if (index < 12 && index != 0) {
        if (target === 'left-arrow') {
            showModal(index -= 1);
        }
    }
}

// Search Bar
const filter = e => {
    let currentValue = e.target.value.toLowerCase();
    let employeeNames = document.querySelectorAll('.employee-name');

    employeeNames.forEach(name => {
        if (name.textContent.toLowerCase().includes(currentValue)) {
            name.parentNode.parentNode.style.display = 'flex';
        } else {
            name.parentNode.parentNode.style.display = 'none';
        }
    });
};

// Event Listeners
gridContainer.addEventListener('click', checkCard);
modalClose.addEventListener('click', toggleClass);
searchBar.addEventListener('keyup', filter);
modal.addEventListener('click', modalArrows);