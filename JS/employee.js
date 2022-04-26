class Employee {
  constructor(name) {
    this.annualPay = 0;
    this.name = name;
  }
}

class PartTime extends Employee {
  constructor(name, payRate, hours) {
    super(name);
    this.payRate = parseFloat(payRate);
    this.hours = parseFloat(hours);
    this.employeeType = "part time";
    this.calculatePay();
  }

  calculatePay() {
    this.annualPay = this.payRate * this.hours * 52;
    return this.annualPay;
  }
}

class Manager extends Employee {
  constructor(name, payRate) {
    super(name);
    this.payRate = parseFloat(payRate);
    this.hours = 40;
    this.employeeType = "manager";
    this.calculatePay();
  }

  calculatePay() {
    this.annualPay = this.payRate * 40 * 52 - 1000;
  }
}
