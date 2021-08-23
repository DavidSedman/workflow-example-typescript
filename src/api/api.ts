import express from 'express';

const api = express();

api.get('/', (req, res) => {
  res.send("I'm Healthy!");
});

api.get('/cats', (req, res) => {
  res.json({
    cats: [
      { id: 1, name: 'Tiger', character: 'fierce' },
      { id: 2, name: 'Tigger', character: 'bouncy' }
    ]
  });
});

export { api };
