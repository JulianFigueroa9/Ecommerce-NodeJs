class User{
    constructor(name, lastName, books=[], pets=[]){
    this.name = name;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;
    }

    getFullName(){
        return `${this.name} ${this.lastName}`;
    }

    addPet(pet){
        return this.pets.push(pet);
    }

    countPets(){
        return this.pets.length;
    }

    addBook(name, author){
        return this.books.push({name, author});
    }

    getBookNames(){
        return this.books.map((book) => book.name);
    }
}

let user = new User('Julian', 'Figueroa', [{name:'1984', author:'George Orwell'}], ['Flor', 'Kora']);

console.log(user.getFullName());

console.log(user.addPet('Mía'));

console.log(user.countPets());

console.log(user.addBook('Harry Potter', 'J.K. Rowling'));

console.log(user.getBookNames());

console.log(user.pets);

console.log(user.books);
