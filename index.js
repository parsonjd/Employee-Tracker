
//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

//Connect database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "jeremy",
    password: "123456",
    database: "employeedb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.clear();
    console.log("======================================");
    console.log("");
    console.log("   WELCOME TO THE EMPLOYEE DATABASE   ");
    console.log("");
    console.log("======================================");
    startApp();
});


// List of choices for user input

function startApp() {
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