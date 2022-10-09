const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3010
const smtp_login = process.env.SMTP_LOGIN || '---'
const smtp_password = process.env.SMTP_PASSWORD || '---'

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: smtp_login, // generated ethereal user
		pass: smtp_password, // generated ethereal password
	},
})

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
	let { name, email, message } = req.body

	let info = await transporter.sendMail({
		from: 'HR', // sender address
		to: 'ruslan.pershin98@gmail.com', // list of receivers
		subject: 'Тестирую gmail', // Subject line
		html: `<b>Сообщение из портфолио: </b> <div>${message}</div> <div>name: ${name}</div> <div>email: ${email}</div>	`, // html body
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
