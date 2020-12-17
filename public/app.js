import { animateElements, animateListItem, displayOnList, } from './animation.js';
import { Customer } from './classes/customer.js';
import { showCustomerDetail, scrollToBottom } from './utilities.js';
// Elements
const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const addressEl = document.querySelector('#address');
const countryCodeEl = document.querySelector('#country-code');
const phoneEl = document.querySelector('#phone');
const profession = document.querySelector('#profession');
const genderEl = Array.from(document.querySelectorAll('.gender-input'));
const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const list = document.querySelector('#list');
let customers = [];
// Load customer
function loadCustomersFromStorage() {
    customers = JSON.parse(localStorage.getItem('customerList') || '[]');
    renderCustomers(customers);
}
// Render Customers to DOM
function renderCustomers(customers) {
    list.innerHTML = '';
    // Display each customer to the DOM List
    customers.forEach((customer) => {
        // Set each customer's prototype to Customer prototype
        // customer.__proto__ = Object.create(Customer.prototype);
        Object.setPrototypeOf(customer, Customer.prototype);
        // Rendering in DOM
        list.appendChild(customer.getFormattedList());
    });
}
// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedGender = genderEl.find((g) => g.checked === true) || { value: undefined };
    const newCustomer = new Customer(nameEl.value, emailEl.value, addressEl.value, profession.value, countryCodeEl.value, +phoneEl.value, selectedGender.value);
    customers.push(newCustomer);
    list.appendChild(newCustomer.getFormattedList());
    animateListItem(list.lastElementChild);
    // Saving to localStorage
    localStorage.setItem('customerList', JSON.stringify(customers));
    // Scroll list to bottom
    scrollToBottom(list);
});
// Click event on list detail button to show details
list.addEventListener('click', (e) => {
    // if it is a detail button
    const target = e.target;
    const parentElement = target.parentElement;
    if (target.classList.contains('details')) {
        const id = parentElement.getAttribute('data-id');
        showCustomerDetail(id, customers);
    }
});
// Click event on document
document.addEventListener('click', (e) => {
    const target = e.target;
    const classes = target.classList;
    // if target is delete button
    if (classes.contains('delete')) {
        const id = target.getAttribute('data-id');
        customers = customers.filter((c) => c.id !== id);
        // Removing from DOM
        // Get list elements
        const liElements = Array.from(document.querySelectorAll('.list li'));
        // Get the li element with id of value of id variable
        const found = liElements.find((li) => li.getAttribute('data-id') === id);
        list.removeChild(found);
        displayOnList();
        // Saving the updated cusotmers to localStorage
        localStorage.setItem('customerList', JSON.stringify(customers));
    }
    // if target is go back button
    else if (classes.contains('go-back')) {
        displayOnList();
    }
});
// Search
searchInput.addEventListener('keyup', (e) => {
    const value = e.target.value.toLowerCase();
    const matches = customers.filter((customer) => {
        if (customer.name.toLowerCase().indexOf(value) !== -1 ||
            customer.profession.toLowerCase().indexOf(value) !== -1) {
            return true;
        }
        return false;
    });
    if (matches.length) {
        // Rendering the matches customers to DOM
        renderCustomers(matches);
    }
    else {
        list.innerHTML = `
      <div class="search-not-found">
        Sorry! the customer you're searching for is not on the list
      </div>
    `;
    }
});
// Load customer
loadCustomersFromStorage();
// Animate
animateElements();
