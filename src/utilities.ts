import { displayOffList } from './animation.js';
import { Customer } from './classes/customer.js';

export const showCustomerDetail = (id: string, customers: Customer[]) => {
  const customer = customers.find((u) => u.id == id) as Customer;
  setCustomerDetails(id, customer);
  //  Display off list and display on detail
  displayOffList();
};

export const setCustomerDetails = (id: string, customer: Customer) => {
  const container = document.querySelector('.customer-detail') as HTMLElement;

  container.innerHTML = `
    <div>
      <i class="far fa-arrow-alt-circle-left go-back"></i>
    </div>
    <div class="profile">
      <div>
        <img src="./img/${customer.gender}.jpg" alt="" />
        <div>
          <h2 class="profile__name">${customer.name}</h2>
          <small>${customer.profession}</small>
        </div>
      </div>
      <i class="far fa-trash-alt delete" data-id="${customer.id}"></i>
    </div>
    <div class="personal-info">
      <header>Personal Info</header>
      <section>
        <div>Email</div>
        <div>:</div>
        <div>${customer.email}</div>
      </section>
      <section>
        <div>Address</div>
        <div>:</div>
        <div>${sentenceCase(customer.address)}</div>
      </section>
      <section>
        <div>Country: </div>
        <div>:</div>
        <div>${sentenceCase(customer.country)}</div>
      </section>
      <section>
        <div>Phone</div>
        <div>:</div>
        <div>${customer.phone}</div>
      </section>
      <section>
        <div>Gender</div>
        <div>:</div>
        <div>${sentenceCase(customer.gender)}</div>
      </section>
    </div>
  `;
};

export const sentenceCase = (str: string) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

export const scrollToBottom = (element: HTMLElement) => {
  element.scrollTo(0, element.scrollHeight);
};
