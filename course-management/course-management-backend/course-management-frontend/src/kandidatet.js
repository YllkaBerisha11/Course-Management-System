const express = require('express');
const router = express.Router();

// Simulimi i një baze të dhënash me një listë për kandidatët
let kandidatet = [
  { id: 1, emri: "Ardit", mbiemri: "Hasani", email: "ardit@example.com" },
  { id: 2, emri: "Elira", mbiemri: "Hoxha", email: "elira@example.com" }
];

// POST - krijo kandidat
router.post('/', (req, res) => {
  const { emri, mbiemri, email } = req.body;
  
  if (!emri || !mbiemri || !email) {
    return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme!" });
  }

  const id = kandidatet.length + 1; // gjenero ID të ri
  const newKandidat = { id, emri, mbiemri, email };

  kandidatet.push(newKandidat); // shto kandidat në listë
  res.status(201).json({ message: 'Kandidati u shtua me sukses!', kandidat: newKandidat });
});

// GET - merr të gjithë kandidatët
router.get('/', (req, res) => {
  res.status(200).json(kandidatet);
});

// GET - merr një kandidat me ID
router.get('/:id', (req, res) => {
  const kandidat = kandidatet.find(k => k.id === parseInt(req.params.id));

  if (!kandidat) {
    return res.status(404).json({ message: 'Kandidati nuk u gjet!' });
  }

  res.status(200).json(kandidat);
});

// PUT - përditëso kandidat me ID
router.put('/:id', (req, res) => {
  const kandidat = kandidatet.find(k => k.id === parseInt(req.params.id));

  if (!kandidat) {
    return res.status(404).json({ message: 'Kandidati nuk u gjet!' });
  }

  const { emri, mbiemri, email } = req.body;
  kandidat.emri = emri || kandidat.emri;
  kandidat.mbiemri = mbiemri || kandidat.mbiemri;
  kandidat.email = email || kandidat.email;

  res.status(200).json({ message: 'Kandidati u përditësua me sukses', kandidat });
});

// DELETE - fshi kandidat me ID
router.delete('/:id', (req, res) => {
  const index = kandidatet.findIndex(k => k.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: 'Kandidati nuk u gjet!' });
  }

  kandidatet.splice(index, 1); // Fshi kandidat
  res.status(200).json({ message: 'Kandidati u fshi me sukses' });
});

module.exports = router;
