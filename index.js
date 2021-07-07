require('dotenv').config();
const express = require('express');
const cors = require('cors');
const auth = require('./middleware/auth');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/auth', require('./routes/api/auth'));
server.use('/api/users', auth, require('./routes/api/users'));

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));