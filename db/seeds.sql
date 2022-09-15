INSERT INTO department (name) VALUES 
("Finance"),
("Marketing"),
("Operations"),
("Engineering"),
("Human-ressouces");

-- Roles Data
INSERT INTO role (title, salary, department_id) VALUES 
("Accountant Manager", 120000, 1),
("Financial Associate", 65000, 1),
("Sales Manager", 95000, 2),
("Sales Associate", 60000, 2),
("Operations Manager", 90000, 3),
("Operations Associate", 55000, 3),
("Chief Engineer", 135000, 4),
("Engineer", 105000, 4),
("HR Manager", 85000, 5),
("HR Associate", 60000, 5);

-- Employees Data
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Jane", "Doe", 7, NULL),
("John", "Mandingo", 5, NULL),
("Dick", "Hertz", 8, NULL),
("Mitch", "Conner", 1, NULL),
("Rick", "Cougar", 3, NULL),
("Jake", "Wallace", 6, 5),
("Sandy", "Tomlin", 2, 1),
("Sylvia", "Nolen", 4, 3),
("Mark", "Brooks", 9, NULL),
("Brian", "Mango", 10, 9);
