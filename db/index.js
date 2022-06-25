const connection = require("./connection");
const inquirer = require("inquirer");

class DB {
  departmentNames = new Array();

  constructor(connection) {
    this.connection = connection;
  }
  findDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }
  findRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id"
      );
  }
  findEmployee() {
    return this.connection.promise().query("SELECT * FROM employee");
  }
  makeDepartment(dpt) {
    return this.connection
      .promise()
      .query("INSERT INTO department(name) VALUES (?)", dpt);
  }
  
  findDepartmentsAsList() {
    this.connection.query("SELECT name FROM department", async (err, res) => {
      if (err) throw err;
      const { department } = await inquirer.prompt([
        {
          name: "department",
          type: "list",
          choices: () => res.map((res) => res.name),
          message: "Select the corresponding department: ",
        },
      ]);
      let departmentId;
      for (const row of res) {
        if (row.name === department) {
          departmentId = row.id;
          continue;
        }
      }
    });
    return this.connection
      .promise()
      .query("INSERT INTO role(department_id) VALUES (?)", this.departmentId);
  }
}

module.exports = new DB(connection);
