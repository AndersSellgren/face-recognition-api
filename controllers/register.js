const handleRegister = (req, res, db, bcrypt) => {
	const { name, email, password } = req.body
	if ( !name || !email || !password) {
		return res.status(400).json('Invalid credentials')
	}
	const hash = bcrypt.hashSync(password, saltRounds);
	db.transaction(trx => {
		trx.insert(
			{
				hash: hash,
				email: email
			}
		)
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users')
				.insert({
					name: name,
					email: loginEmail[0],
					joined: new Date()	
				})
				.returning('*')
				.then(user => {
					if (user.length) {
						res.json(user[0])
					} else {
						res.status(400).json('User not found')
					}
				})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(error => res.status(400).json('Unable to register'))
	// .then(data => data.select('*').from('users').where('email','=', email))
}

module.exports = {
	handleRegister: handleRegister
}

