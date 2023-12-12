INSERT INTO department (name)
VALUES ("Accounting"),
("Marketing"),
("Sales"),
("Development"),
("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 24.99, 1),
("Salesperson", 20.43,2),
("Recruiter", 23.53, 3),
("Developer", 21.23, 4),
("Marketer", 20.21, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Johnny", "Cash", 1),
("Jim", "Morrison", 2),
("Janis", "Joplin", 3),
("June", "Carter", 4),
("Jimi", "Hendrix", 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id )
VALUES ('John', 'Smith', 3, 1)