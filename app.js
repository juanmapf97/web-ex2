const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

const met = require('./met.js');

app.listen(port, () => {
    console.log('Up and listening');
});

app.get('/student/:id', (req, res) => {
    if (req.params.id && req.params.id == 'A00819815') {
        res.json({
            "id": "A00819815",
            "fullname": "Juan Manuel Pérez",
            "nickname": "Juanma",
            "age": 21
        });
    } else {
        res.json({
            'Error': 'Esa matrícula no es correcta'
        });
    }
});

app.get('/met', (req, res) => {
    met.metSearch(req.query.search, (error, response) => {
        if (error) {
            return res.json({
                error: error
            });
        } else {
            response.searchTerm = req.query.search;
            res.json(response);
        }
    });
});

app.get('*', (req, res) => {
    res.json({
        'Error': 'Esta ruta no existe'
    });
});