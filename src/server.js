const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Login server is running' });
});

const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});