const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

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

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME
// })

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
    }
  });
}
function viewDepartments() {
    console.log('You are viewing all departments!')
    prompt();
}
function viewRoles() {
    console.log('You are viewing all roles!')
    prompt();
}

prompt();
