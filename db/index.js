const connection = require('./connection');

class DB {
    departmentNames = new Array();

    constructor(connection) {
        this.connection = connection;
    }
    findDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM department'
        )
    }
    findRoles() {
        return this.connection.promise().query(
            'SELECT role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id'
        )
    }
    findEmployee() {
        return this.connection.promise().query(
            'SELECT * FROM employee'
        )
    }
    makeDepartment(dpt) {
        return this.connection.promise().query(
            'INSERT INTO department(name) VALUES (?)', dpt)
    }
    findDepartmentsAsList(cb) {
         this.connection.query("SELECT name FROM department", (err, rows) => {
            // NOTE: This function runs at some point in the unspecified future,
            //       but you can request a callback when it's done.
            if (err) throw err;
        
            let newArray = rows.map((row) => {
              return row.name;
            })
            console.log(newArray);
            cd(newArray)
          })
    }
}

module.exports = new DB(connection);