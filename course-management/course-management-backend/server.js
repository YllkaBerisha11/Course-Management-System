const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/payments');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/payments', paymentRoutes);  // Kontrollo që kjo linjë ekziston dhe është e saktë

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveri u startua në portin ${PORT}`);
});
