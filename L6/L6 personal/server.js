const express = require('express');

const app = express(); // 1

const host = 'localhost';
const port = 8000;

const handler = (req, res) => {
    res.writeHead(200);
    res.end('ПСП такой крутой!');
};

app.get('/course', (req, res) => {
    res.json({ course: 'ПСП' });
});

app.listen(port, host, () => { // 3
    console.log(`Сервер запущен по адресу http://${host}:${port}`);
});

const readJson = (fileName) => {
    const file = fs.readFileSync(path.join(__dirname, fileName), "utf8");
    const json = JSON.parse(file);
    return json;
};

const storageName = 'courses.json';

app.get('/courses', (req, res) => {
    const courses = readJson(storageName);
    res.send(courses);
});

app.get('/courses/:id', (req, res) => {
    const id = req.params.id; // 1
    
    const numberId = Number.parseInt(id);
    if (Number.isNaN(numberId)) { // 2
        res.status(400).send({status: 'Bad Request', message: 'id must be number!'});
    }

    const courses = readJson(storageName);
    const course = courses.find((value) => { // 3
        return value.id === numberId;
    });

    if (course) { // 4
        res.send(course);
    } else {
        res.status(404).send({status: 'Not Found', message: `not found stock with id ${numberId}`});
    }
});