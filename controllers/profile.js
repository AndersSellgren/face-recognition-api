const handleProfile = (req, res, db) => {
	const { id } = req.params

	db.select('*').from('users').where({id: id})
	.then(data => {
		if (data.length) {
			res.json(data[0])
		} else {
			res.status(400).json('User not found')
		}
	}).catch(err => res.status(400).json('Error getting user'));
}

module.exports = {
	handleProfile: handleProfile
}