const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const professorRoutes = require('./routes/professors'); // korrigjuar emri i folderit
const candidatesRoutes = require('./routes/candidates'); // për kandidatët

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/professors', professorRoutes);
