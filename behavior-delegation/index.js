function Vehicle(name) {
  this.name = name;
}

Vehicle.prototype.start = function () {
  return this.name + "차 시동걸까요?";
};

function Car(name) {
  Vehicle.call(this, name);
}

Car.prototype = Object.create(Vehicle.prototype);

Car.prototype.run = function () {
  console.log("안녕하세요 " + this.start());
};

const c1 = new Car("현대");
const c2 = new Car("기아");

c1.run(); // "안녕하세요 현대차 시동걸까요?"
c2.run(); // "안녕하세요 기아차 시동걸까요?"

////////////////->

const Vehicle = {
  init: function (name) {
    this.name = name;
  },

  start: function () {
    return this.name + "차 시동걸까요?";
  },
};

const Car = Object.create(Vehicle);

Car.run = function () {
  console.log("안녕하세요 " + this.start());
};

const c1 = Object.create(Car);
c1.init("현대");

const c2 = Object.create(Car);
c2.init("기아");

c1.run(); // "안녕하세요 현대차 시동걸까요?"
c2.run(); // "안녕하세요 기아차 시동걸까요?"
