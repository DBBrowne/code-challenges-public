-- Select second highest salary of each gender

create table employee (
  user_id INT, 
  gender VARCHAR(10),
  salary INT
);
INSERT INTO employee (
  user_id, 
  gender,
  salary
)
values
(1, "male", 110000),
(2, "female", 120000),
(3, "male", 130000),
(4, "female", 140000);



select 
    gender, salary 
from (
    select 
    gender, salary 
from 
    employee
where
    gender = "male"
ORDER BY
    salary DESC
-- Only one result, starting at index 1
limit 1, 1
-- Must be named for Union
)as males
-- Values are distinct in this query by defualt.  Use UNION ALL otherwise.
UNION
select 
    gender, salary 
from (
    select 
    gender, salary 
from 
    employee
where
    gender = "female"
ORDER BY
    salary DESC
limit 1, 1
)as females;

-- ==>
-- |gender | salary|
-- |male	  | 110000|
-- |female | 120000|