import { hasFormatter } from '../interfaces/hasFormatter.js';

export class Customer implements hasFormatter {
  constructor(
    public name: string,
    readonly email: string,
    readonly address: string,
    readonly profession: string,
    readonly country: string,
    readonly phone: number,
    readonly gender: string,
    public id = uuid()
  ) {}

  getFormattedList() {
    const li = document.createElement('li');
    const formatted = `
        <section class="summary-details">
        <img src="./img/${this.gender.toLowerCase()}.jpg" />
        <div>
            <span class="list__name">${this.name}</span>
            <small>${this.profession}</small>
        </div>
        </section>
        <button class="details">Details</button>
    `;

    li.innerHTML = formatted;

    li.setAttribute('data-id', this.id);

    return li;
  }
}
