const inquirer = require("inquirer");
const connection = require("./db/connection");
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
        addRole();
        break;
      case questionStatements.addEmployee:
        addEmployee();
        break;
      case questionStatements.updateEmployeeRole:
        updateEmployeeRole();
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
function addRole() {
  var query = `SELECT d.id, d.name, r.salary AS budget
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d
    ON d.id = r.department_id
    GROUP BY d.id, d.name`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    // (callbackfn: (value: T, index: number, array: readonly T[]) => U, thisArg?: any)
    const departmentChoices = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));

    console.table(res);
    console.log("Department array!");

    promptAddRole(departmentChoices);
  });
}

function promptAddRole(departmentChoices) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Role title?",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Role Salary",
      },
      {
        type: "list",
        name: "departmentId",
        message: "Department?",
        choices: departmentChoices,
      },
    ])
    .then(function (answer) {
      var query = `INSERT INTO role SET ?`;

      connection.query(
        query,
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Role Inserted!");

          prompt();
        }
      );
    });
}
function addEmployee() {
  console.log("Inserting an employee!");

  var query = `SELECT r.id, r.title, r.salary 
      FROM role r`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    console.log("RoleToInsert!");

    promptInsert(roleChoices);
  });
}

function promptInsert(roleChoices) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices,
      },
    ])
    .then(function (answer) {
      console.log(answer);

      var query = `INSERT INTO employee SET ?`;
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log("Inserted successfully!\n");

          prompt();
        }
      );
    });
}
function updateEmployeeRole() {
  employeeArray();
}

function employeeArray() {
  console.log("Updating an employee");

  var query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
  FROM employee e
  JOIN role r
	ON e.role_id = r.id
  JOIN department d
  ON d.id = r.department_id
  JOIN employee m
	ON m.id = e.manager_id`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    const employeeChoices = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${first_name} ${last_name}`,
    }));

    console.table(res);
    console.log("employeeArray To Update!\n");

    roleArray(employeeChoices);
  });
}

function roleArray(employeeChoices) {
  console.log("Updating an role");

  var query = `SELECT r.id, r.title, r.salary 
  FROM role r`;
  let roleChoices;

  connection.query(query, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    console.log("roleArray to Update!\n");

    promptEmployeeRole(employeeChoices, roleChoices);
  });
}

function promptEmployeeRole(employeeChoices, roleChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to set with the role?",
        choices: employeeChoices,
      },
      {
        type: "list",
        name: "roleId",
        message: "Which role do you want to update?",
        choices: roleChoices,
      },
    ])
    .then(function (answer) {
      var query = `UPDATE employee SET role_id = ? WHERE id = ?`;
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        query,
        [answer.roleId, answer.employeeId],
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + "Updated successfully!");

          prompt();
        }
      );
    });
}

prompt();
