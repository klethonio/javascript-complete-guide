class Course {
  constructor(title, length, price) {
    this.title = title;
    this.length = length;
    this._price = price;
  }

  set price(val) {
    if (newPrice >= 0) {
      this._price = parseFloat(val);
    } else {
      throw 'Price must be a positive number.';
    }
  }

  get price() {
    return this._price;
  }

  get getFormattedPrice() {
    return `\$${this._price.toFixed(2)}`;
  }

  lengthPerPrice() {
    return this.length / this.price;
  }

  summary() {
    return `Title: ${this.title}, ${this.length}h - ${this.getFormattedPrice}`;
  }
}

class PraticalCourse extends Course {
  constructor(title, length, price, numOfExercises) {
    super(title, length, price);
    this.numOfExercises = numOfExercises;
  }
}

class TheoreticalCourse extends Course {
  public() {
    console.log('publishing...');
  }
}

const course1 = new Course('JavaScript Expert', 40, 5);
console.log(course1.summary());

const course2 = new Course('React Native', 20, 8);
console.log(course2.summary());

const theoreticalCourse = new TheoreticalCourse('UML for Dev Leads', 60, 30);
console.log(theoreticalCourse.summary());
