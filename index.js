
//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

//Connect database with my credentials
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "jeremy",
    password: "123456",
    database: "employeedb"
});

db.connect(function (err) {
    if (err) throw err;
    console.clear();
    console.log("======================================");
    console.log("");
    console.log("   WELCOME TO THE EMPLOYEE DATABASE   ");
    console.log("");
    console.log("======================================");
    mainMenu();
});


// List of choices for user input

function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do today?",
            name: "choice",
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "View All Employees by Department",
                "View All Employees by Role",
                "View All Employees by Manager",
                "Add Department",
                "Add Role",
                "Add Employee",
                "Exit"
            ]
        }
    ]).then(function (result) {
        switch (result.choice) {

            // Select view departments
            case "View All Departments":
                viewAllDepts();
                break;

            // Select view all roles
            case "View All Roles":
                viewAllRoles();
                break;

            // Select view all employees
            case "View All Employees":
                viewAllEmps();
                break;

            // Select view all employees by department
            case "View All Employees by Department":
                viewEmpsByDept();
                break;

            // Select view all employees by role
            case "View All Employees by Role":
                viewEmpsByRole();
                break;

            // Select view all employees by manager
            case "View All Employees by Manager":
                viewEmpsByMan();
                break;

            //Add a department
            case "Add Department":
                addDept();
                break;

            //Add a role
            case "Add Role":
                addRole();
                break;

            //Add an employee
            case "Add Employee":
                addEmp();
                break;

            //Close application
            case "Exit":
                console.log("===============================================");
                console.log("                 Goodbye!!  ");
                console.log("===============================================");
                db.end();
                break;
        }
    })
};

//Function to view all departments
function viewAllDepts() {
    db.query("SELECT department.id AS ID, department.name AS Department FROM department",
        function (err, res) {
            if (err) throw err;
            console.log("");
            console.clear();
            console.table(res);
            mainMenu();
        })
};

//Function to view all roles
function viewAllRoles() {
    db.query("SELECT role.id as ID, role.title AS TITLE, department.name AS Dept, role.salary FROM role INNER JOIN department ON role.department_id = department.id ORDER BY role.id",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.clear();
            console.table(res);
            mainMenu();
        })

};

//Function to view all employees
function viewAllEmps() {
    db.query(`SELECT employee.id,
    employee.first_name,
    employee.last_name,
    role.title AS title,
    department.name AS dept,
    role.salary,
    CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    ORDER By employee.id`,
        function (err, res) {
            if (err) throw err
            console.log("");
            console.clear();
            console.table(res);
            mainMenu();
        })
};

//Function to view all employees by role
function viewEmpsByRole() {
    db.query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS NAME, role.title AS TITLE FROM employee INNER JOIN role on employee.role_id = role.id ORDER BY role.title",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.clear();
            console.table(res);
            mainMenu();
        })
};

//Function to view all employees by department
function viewEmpsByDept() {
    db.query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS NAME, department.name AS DEPT FROM role INNER JOIN employee on employee.role_id = role.id INNER JOIN department on department.id = role.department_id ORDER BY department.name",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.clear();
            console.table(res);
            mainMenu();
        })
}

//Function to view all employees by manager
function viewEmpsByMan() {
    db.query("SELECT CONCAT(Emp.first_name, ' ', Emp.last_name) AS EMPLOYEE, CONCAT(Man.first_name, ' ', Man.last_name) AS MANAGER FROM Employee Emp INNER JOIN Employee Man on Emp.manager_id = Man.id ORDER BY Emp.last_name",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.clear();
            console.table(res);
            mainMenu();
        })
}

//Functin to add new department with prepared statement
function addDept() {
    inquirer.prompt([
        {
            name: "newDept",
            type: "input",
            message: "Please enter the name of the department you want to add."
        }
    ]).then((answer) => {

        const sql = `INSERT INTO department (name)
                VALUES (?)`;
        const params = [answer.newDept];
        db.query(sql, params, function (err, res) {
            if (err) throw err;
            console.clear();
            console.log('New department added!');
            viewAllDepts();
            mainMenu();

        });
    });
};

//Function to add new role with prepared statement
function addRole() {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Please enter the title of role you want to add."
        },
        {
            name: "salary",
            type: "number",
            message: "Please enter the salary associated with the role you want to add (only numbers)"
        },
        {
            name: "department_id",
            type: "number",
            message: "Please enter the department's id associated with the role you want to add."
        }
    ]).then((answer) => {

        const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;
        const params = [answer.title, answer.salary, answer.department_id];
        db.query(sql, params, function (err, res) {
            if (err) throw err;
            console.clear();
            console.log('New role added!');
            viewAllRoles();
            mainMenu();

        });
    });
};

//Function to add new employee with prepared statement
function addEmp() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of employee you want to add."
        },
        {
            name: "last_name",
            type: "input",
            message: "Please enter the last name of employee you want to add."
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the role id associated with the employee you want to add (only numbers)."
        }
    ]).then((answer) => {

        const sql = `INSERT INTO employee (first_name, last_name, role_id)
                VALUES (?, ?, ?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id];
        db.query(sql, params, function (err, res) {
            if (err) throw err;
            console.clear();
            console.log('New role added!');
            viewAllEmps();
            mainMenu();

        });
    });
};


