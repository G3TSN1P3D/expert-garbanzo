USE tracker_db;

INSERT INTO department (name)
VALUES 
    ("finance"),
    ("development"),
    ("QA"),
    ("testing"),
    ("marketing"),
    ("sales");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Accountant", 65000.00, 1),
    ("Assistant", 35000.00, 1),
    ("Senior developer", 140000.00, 2),
    ("Junior developer", 80000.00, 2);