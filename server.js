const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userDataFilePath = path.join(__dirname, 'src/data/userData.json');

// Endpoint do pobierania danych
app.get('/api/gardens', (req, res) => {
    fs.readFile(userDataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(JSON.parse(data));
    });
});

// Endpoint do zapisywania danych
app.post('/api/gardens', (req, res) => {
    const newData = req.body;
    
    fs.readFile(userDataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }

        const userData = JSON.parse(data);
        
        // Znajdź odpowiedni ogród i zaktualizuj dane
        const gardenIndex = userData.gardens.findIndex(garden => garden.gardenName === newData.gardenName);
        if (gardenIndex !== -1) {
            userData.gardens[gardenIndex] = newData;
        } else {
            userData.gardens.push(newData);
        }

        fs.writeFile(userDataFilePath, JSON.stringify(userData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Error writing file');
            }
            res.send('Data saved successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
