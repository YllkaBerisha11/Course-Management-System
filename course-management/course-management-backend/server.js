const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const professorRoutes = require('./nodroutes/professors'); // nëse ekziston
const candidatesRoutes = require('./routes/candidates'); // për kandidatët

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/professors', professorRoutes); // nëse e ke
app.use('/api/candidates', candidatesRoutes); // për kandidatët

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
