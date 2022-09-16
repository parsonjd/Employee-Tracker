
//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

//Connect database
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
                console.log("");
                console.log("   THANK YOU FOR USING THE EMPLOYEE DATABASE   ");
                console.log("");
                console.log("===============================================");
                connection.end();
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

function viewAllRoles() {
    db.query("SELECT role.id as ID, role.title AS TITLE FROM role",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.clear();
            console.table(res);
            mainMenu();
        })

};

function viewAllEmps() {
    db.query("SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS NAME FROM employee",
        function (err, res) {
            if (err) throw err
            console.log("");
            console.clear();
            console.table(res);
            mainMenu();
        })
};

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


