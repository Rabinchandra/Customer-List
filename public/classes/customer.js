export class Customer {
    constructor(name, email, address, profession, country, phone, gender, id = uuid()) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.profession = profession;
        this.country = country;
        this.phone = phone;
        this.gender = gender;
        this.id = id;
    }
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
