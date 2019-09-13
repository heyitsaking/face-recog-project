const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors')

const saltRounds = 10;
const checkUserPassword = (enteredPassword, storedPasswordHash) =>  
  bcrypt.compare(enteredPassword, storedPasswordHash)

const app = express();
app.use(bodyParser.json())
app.use(cors())

const database = {
    count: 100,
    users: [
    ],
    login: [
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    let found = false;
    let logUser = database.login.map(user => {
        if (user.email === email) {
            found = true;
            return user;
        }
    })
    if(!found) {
        res.status(404).json('Error loggin in')
    } else {
        if (checkUserPassword(password, logUser.hash)) {
                res.json('Success')
        } else {
            res.status(404).json('Error loggin in')
        }
    }
})

app.post('/register', (req,res) => {
    const {email, name, password} = req.body;
    let hashed = '';
    bcrypt.hash(password, saltRounds, function(err, hash) {
        hashed = hash;
    });
    database.users.push({
        id: database.count++,
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    }),
    setTimeout(() => {
        database.login.push({
            id: database.count * 9,
            hash: hashed,
            email: email
        })
    }, 100)
    res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user)
        }
    })
    if(!found) {
        res.status(400).json('No such user')
    }
})

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found) {
        res.status(400).json('No such user')
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET - user
/image --> PUT --> user

*/