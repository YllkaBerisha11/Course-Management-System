const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',         // Adresa e serverit të MySQL, zakonisht 'localhost'
  user: 'root',              // Përdoruesi i bazës së të dhënave (zakonisht është 'root')
  password: '',              // Fjalëkalimi i përdoruesit për MySQL (mund të jetë bosh nëse nuk keni caktuar një fjalëkalim për përdoruesin 'root')
  database: 'course'         // Emri i bazës së të dhënave me të cilën po lidheni (në këtë rast 'course')
});

connection.connect((err) => {
  if (err) {
    console.error('Gabim gjatë lidhjes me MySQL:', err);
  } else {
    console.log('Lidhja me MySQL u krye me sukses!');
  }
});
