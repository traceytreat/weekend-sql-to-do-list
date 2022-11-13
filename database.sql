CREATE TABLE tasks_list (
    "id" serial PRIMARY KEY,
    "name" varchar(30) NOT NULL,
    "description" varchar(250),
    "date" varchar(45) NOT NULL,
    "datecompleted" varchar(45),
    "completed" boolean NOT NULL
);

INSERT INTO tasks_list ("name", "description", "date", "datecompleted", "completed")
VALUES 
('Do Homework', 'Finish up the homework due this weekend.', 'November 11th 2022, 5:00:00 pm', '', FALSE),
('Clean Bedroom', 'Clean up my messy bedroom', 'November 10th 2022, 7:30:00 pm', 'November 12th 2022, 5:00:00 pm', TRUE);