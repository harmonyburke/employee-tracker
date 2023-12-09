const express =require('express');
const mysql=requier('mysql2');
const inquirer=require('inquirer');
// import and require inquirer, mysql, and express
const app=express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
// express middleware

// connect to database
const db=mysql.createConnection(
    {
       host: 'localhost',
       user: 'root',
       password: 'password',
       database: 'company_db'
    },
    console.log(`Connected to company_db.`)
);

inquirer
    .prompt([
        {
            type:'list',
            message:'What would you like to do?',
            name:'action',
            choices: ['Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        },
        
    ])
