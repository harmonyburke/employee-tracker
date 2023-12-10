
USE company_db;

SELECT department.id, roles.department_id
FROM department
JOIN roles ON roles.department_id=department.id;

SELECT roles.id, employee.id
FROM roles
JOIN employee ON employee.role_id=roles.id;