require('dotenv').config();
const express = require('express');
const balloonRoutes = require('./routes/balloonRoutes');
const osRoutes = require('./routes/osRoutes');
const sequelize = require('./config/database');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/balloons', balloonRoutes);
app.use('/api', osRoutes);



sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Unable to connect to the database:', err));

sequelize.sync()
.then(() => {
console.log('Database synchronized');
})
.catch((err) => {
console.error('Error syncing database:', err);
});


app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
