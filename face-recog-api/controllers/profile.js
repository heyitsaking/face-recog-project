const handleProfile = (req, res, postgres) => {
    const { id } = req.params;
    postgres.select('*').from('users').where({id})
        .then(user => {
            res.json(user[0])
        }).catch(err => res.status(400).json('not found'));
};

module.exports = {
    handleProfile: handleProfile
};