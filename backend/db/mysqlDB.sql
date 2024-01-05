
CREATE DATABASE IF NOT EXISTS company;
USE company;


CREATE TABLE IF NOT EXISTS emp (
    id INT AUTO_INCREMENT PRIMARY KEY,
    names VARCHAR(255)
);


INSERT INTO emp (names) VALUES ('vyankatesh'), ('Amol');






-- connection.connect((err) => {
--     if (err) {
--       console.error('Error connecting to MySQL:', err);
--       return;
--     }
  
--     console.log('Connected to MySQL database');
  
--     // Execute SQL commands
--     connection.query('CREATE DATABASE IF NOT EXISTS company', (err, results) => {
--       if (err) throw err;
  
--       console.log('Database "company" created or already exists');
      
--       connection.query('USE company', (err, results) => {
--         if (err) throw err;
  
--         console.log('Using database "company"');
  
--         connection.query('CREATE TABLE IF NOT EXISTS emp (id INT AUTO_INCREMENT PRIMARY KEY, names VARCHAR(255))', (err, results) => {
--           if (err) throw err;
  
--           console.log('Table "emp" created or already exists');
  
--           connection.query('INSERT INTO emp (names) VALUES (?, ?)', ['name1', 'name2'], (err, results) => {
--             if (err) throw err;
  
--             console.log('Data inserted into "emp" table:', results);
  
--             // Close the connection
--             connection.end();
--           });
--         });
--       });
--     });
--   });