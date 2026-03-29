import express from "express"
import cors from "cors"
import grocery from './data/grocery/data.js';
import slides from './data/addSlides/data.js';
import hardware from './data/hardware/data.js';

const PORT = 5000
const app = express();
app.use(cors());



app.get('/', (req, res) => res.send('API is running...'));
app.get('/api/slides', (req, res) => res.json(slides));
app.get('/api/grocery', (req, res) => res.json(grocery));
app.get('/api/hardware', (req, res) => res.json(hardware));



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});