SELECT id 
FROM department
JOIN department.id ON roles.department_id=department.id;

SELECT id
FROM roles
JOIN roles.id ON employee.role_id=roles.id;
