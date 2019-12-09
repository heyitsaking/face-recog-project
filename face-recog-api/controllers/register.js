const saltRounds = 10;

const handleRegister = (req, res, postgres, bcrypt) => {
    const {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect form submission')
    }
    const hashed = bcrypt.hashSync(password, saltRounds);

    postgres.transaction(trx => {
        trx.insert({
            hash: hashed,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return postgres('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('unable to register'));
};

module.exports = {
  handleRegister: handleRegister
};