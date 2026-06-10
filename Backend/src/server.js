import express from 'express'
import 'dotenv/config'


const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Tudo certo')
})

app.listen(port, () => {
  console.log(`Esta indo bem http://localhost:${port}`)
})
