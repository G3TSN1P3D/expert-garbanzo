USE tracker_db;
INSERT INTO department (name)
VALUES ("finance"),
    ("development")
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 65000.00, 1),
    ("Assistant", 35000.00, 1),
    ("Senior developer", 140000.00, 2),
    ("Junior developer", 80000.00, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Ross", 1, Null),
    ("Johnny", "Depp", 2, Null),
    ("Jesus", "Herrera", 3, Null),
    ("Ali", "Abdul", 4, 3);