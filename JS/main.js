class Main {
  constructor() {
    this.employees = this.getEmployees();
  }

  displayMenu() {
    // Show menu
    const choice = prompt(
      "Main Menu\n1. Add Employee\n2. Remove Employee\n3. Edit Employee\n4. Display Employees"
    );

    return choice;
  }

  addEmployee() {
    // Adds employee to table
    const newEmployeeData = prompt(
      "Add Employee Name, hours/wk, pay rate.\n(Separate each by a comma)"
    );
    const [name, hours, payRate] = newEmployeeData.split(",");
    if (hours >= 40) {
      const employee = new Manager(name, payRate);
      this.employees.push(employee);
    } else {
      const employee = new PartTime(name, payRate, hours);
      this.employees.push(employee);
    }
    this.setEmployees();
    this.displayEmployees();
  }

  removeEmployee() {
    // removes employee from employees array
    const identifier = prompt(
      "Enter the name or id of the employee you want to remove."
    );
    // if identifier is a number, remove by id (index)
    if (!isNaN(identifier)) {
      const employee = this.employees[identifier];
      this.employees = this.employees.filter((e) => {
        return e.name != employee.name;
      });
    } else {
      this.employees = this.employees.filter((e) => {
        return e.name != identifier;
      });
    }
    this.setEmployees();
    this.displayEmployees();
  }

  editEmployee() {
    // edit the pay rate of a given employee
    const id = prompt("Enter the id of the employee you want to edit.");
    const employee = this.employees[id];
    const payRate = prompt(`Enter the new pay rate for ${employee.name}.`);
    if (employee.employeeType === "manager") {
      this.employees[id] = new Manager(employee.name, payRate);
    } else {
      this.employees[id] = new PartTime(employee.name, payRate, employee.hours);
    }
    this.setEmployees();
    this.displayEmployees();
  }

  displayEmployees() {
    // display employee information in the terminal
    console.clear();

    console.log("ID\t Name\t Pay Rate\t Hours\t Salary\t Type");
    console.log("-------------------------------------------------");
    this.employees.forEach((e, i) => {
      console.log(
        `${i + 1}\t${e.name}\t\t${e.payRate}\t\t${e.hours}\t\t${e.annualPay}\t${
          e.employeeType
        }`
      );
    });

    // console.table displayed the data in a nice human readable format.
    // Asked if it was ok to use in slack and have not received a response.
    // console.table(this.employees, [
    //   "name",
    //   "annualPay",
    //   "hours",
    //   "payRate",
    //   "employeeType",
    // ]);
  }

  getEmployees() {
    if (window.localStorage.getItem("employees")) {
      return JSON.parse(window.localStorage.getItem("employees"));
    } else {
      const employees = [
        new Manager("Scott", 10),
        new Manager("Dave", 5),
        new PartTime("Lisa", 8, 12),
      ];
      this.setEmployees(employees);
      return employees;
    }
  }

  setEmployees(employees = this.employees) {
    window.localStorage.setItem("employees", JSON.stringify(employees));
  }
}

(() => {
  const main = new Main();
  let choice = "";
  do {
    choice = main.displayMenu();
    switch (choice) {
      case "1":
        // Add employee
        main.addEmployee();
        break;
      case "2":
        // Remove employee
        main.removeEmployee();
        break;
      case "3":
        // Edit employee
        main.editEmployee();
        break;
      case "4":
        // Display employees
        main.displayEmployees();
        break;
      case null:
        // exits loop if user presses cancel
        break;
      default:
        // Handles invalid input
        alert(`Invalid choice "${choice}". Try again.`);
    }
  } while (choice);
})();
