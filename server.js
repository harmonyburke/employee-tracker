const express = require('express');
const fs = require('fs')
const mysql = require('mysql2');
const inquirer = require('inquirer');
// import and require inquirer, mysql, and express
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// express middleware

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'steviegirl1!',
        database: 'company_db'
    },
    console.log(`Connected to company_db.`)
);
start();
function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'action',
                choices: ['Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'View All Employees', 'Quit']
            },
        ])
        .then(function (option) {
            switch (option.action) {
                case "View All Departments":
                    viewDepartment();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "View all Employees":
                    viewEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Quit":
                    quit();
                    break;
            }
        })

}
function viewEmployees() {
    let query = 'SELECT * FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN department ON roles.department_id=department.id ';
    // select all from roles table 

    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        // show the response
        start();
        // takes you back to the start page
    })
}

function viewDepartment() {
    let query = "SELECT * FROM department";
    //    selects everything from the table department
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        // shows the response
    })
    start();
}

function viewRoles() {
    let query = 'SELECT * FROM roles';
    // select all from roles table 
    db.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        // show the response
    })
    start();
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName'
        },
        {
            type: 'input',
            message: 'What is the new departments ID number?',
            name: 'deptID'
        }
    ])
        .then(function (answer) {
            db.query('INSERT INTO department SET ?;', {
                id: answer.deptID,
                name: answer.departmentName
            })
            start();
        })

}
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'roleName'
        },
        {
            type: 'input',
            message: 'What is the salary for this role',
            name: 'newSalary'
        },
        {
            type: 'input',
            message: 'Which department ID does this role belong to?',
            name: 'roleDept',
            validate: (enter) => {
                if (isNaN(enter)) {
                    return `Please enter a valid department ID!`
                } else if (enter === "") {
                    return `Please enter a valid department ID!`
                }
                return true;
            }
        }
    ])
        .then(function (answer) {
            db.query("INSERT INTO roles SET ?;", {
                title: answer.roleName,
                salary: answer.newSalary,
                department_id: answer.roleDept

            })
            start();
        })
}
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'What is the role ID of this new employee?',
            name: 'employeeRole'
        },
        {
            type: 'input',
            message: 'What is the ID for this employees manager?',
            name: 'manager'
        }
    ])
        .then(function(answer) {
            db.query('INSERT INTO employee SET ?;', {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.employeeRole,
                manager_id: answer.manager
            })
            start();
        })
}
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees ID number?',
            name: 'employeeID'
        },
        {
            type: 'input',
            message: 'What is the employees new role?',
            name: 'newRole'
        }
    ])
        .then(answer => {
            db.query('UPDATE roles SET ? WHERE ? ;', [
                {
                    role_id: answer.newRole

                },
                {
                    id: answer.employeeID
                }
            ])
            start();
        })
}
function quit() {
    start();
}