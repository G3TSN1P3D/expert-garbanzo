const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

const questionStatements = {
  viewAllDepartments: "View All Departments",
  viewAllRoles: "View All Roles",
  viewAllEmployees: "View All Employees",
  addDepartment: "Add Department",
  addRole: "Add Role",
  addEmployee: "Add Employee",
  updateEmployeeRole: "Update Employee Role",
};

const questions = [
  {
    type: "list",
    name: "option",
    message: "Please select one of the following options: ",
    choices: [
      questionStatements.viewAllDepartments,
      questionStatements.viewAllRoles,
      questionStatements.viewAllEmployees,
      questionStatements.addDepartment,
      questionStatements.addRole,
      questionStatements.addEmployee,
      questionStatements.updateEmployeeRole,
    ],
  },
];

function prompt() {
  inquirer.prompt(questions).then((answer) => {
    console.log(answer);
    switch (answer.option) {
      case questionStatements.viewAllDepartments:
        viewDepartments();
        break;
      case questionStatements.viewAllRoles:
        viewRoles();
        break;
      case questionStatements.viewAllEmployees:
        viewEmployees();
        break;
      case questionStatements.addDepartment:
        insertDeparment();
        break;
      case questionStatements.addRole:
        insertRole();
        break;
    }
  });
}
function viewDepartments() {
  db.findDepartments().then(([departments]) => {
    console.log("You are viewing all departments!");
    console.table(departments);
    prompt();
  });
}
function viewRoles() {
  db.findRoles().then(([roles]) => {
    console.log("You are viewing all roles!");
    console.table(roles);
    prompt();
  });
}
function viewEmployees() {
  db.findEmployee().then(([employee]) => {
    console.log("You are viewing all Employees!");
    console.table(employee);
    prompt();
  });
}
function insertDeparment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Write the new department name: ",
      },
    ])
    .then((answer) => {
      let name = answer.departmentName;
      db.makeDepartment(name)
        .then(() => console.log("Added Department"))
        .then(() => {
          viewDepartments();
        });
    });
}
function insertRole() {
  inquirer.prompt([
    {
      type: "list",
      name: "departmentsOp",
      message: "Please select the corresponding department",
      choices: db.findDepartmentsAsList((() => {
        console.log(myArray);
      }))
    }
  ])
}

prompt();
