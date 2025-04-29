const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',     // Serveri lokal i MySQL
  user: 'root',          // Përdoruesi 'root' është përdoruesi i paracaktuar në XAMPP
  password: '',          // Fjalëkalimi është i zbrazët nëse nuk keni vendosur një
  database: 'course'     // Emri i bazës së të dhënave që përdorni
});

connection.connect((err) => {
  if (err) {
    console.error('Gabim gjatë lidhjes me MySQL:', err);
  } else {
    console.log('Lidhja me MySQL u krye me sukses!');
  }
});
