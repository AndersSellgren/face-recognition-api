// Require the client
const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/
const app = new Clarifai.App({
	apiKey: '8e2fb7bcebec4ef59a3fcebb50711b2c'
});

const handleApiCall = (req, res) => {
	const { input } = req.body
	app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
	.then(data => res.json(data))
	.catch(err => res.status(400).json('Api not found'))
}


const handleImage = (req, res, db) => {
	const { id } = req.body
	db.select('*').from('users')
  	.where('id', '=', id)
  	.increment('entries', 1)
   .returning('entries')
	.then(user => res.json(user[0]))
	.catch(err => res.status(400).json('Id not found'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}