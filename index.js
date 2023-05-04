const express = require('express')
const app = express()
const cors = require('cors')

/* const corsOptions = {
  origin: 'https://www.acme.com'
};

app.use(cors(corsOptions));*/

app.use(cors())
app.use(express.json())

let airports = [
  {
    "iata-code": "ATL",
    "city": "Atlanta",
    "country": "United States"
  },
  {
    "iata-code": "PEK",
    "city": "Beijing",
    "country": "China"
  },
  {
    "iata-code": "DXB",
    "city": "Dubai",
    "country": "United Arab Emirates"
  }
]

const generateId = () => {
  const notesIds = notes.map(n => n.id)
  const maxId = notesIds.length ? Math.max(...notesIds) : 0
  const newId = maxId + 1
  return newId
}

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Airports API</h1>')
})

app.get('/api/airports', (req, res) => {
  res.json(airports)
})

app.get('/api/airports/:code', (req, res) => {
  const code = req.params.code
  const airport = airports.find(airport => airport["iata-code"] === code)

  if (airport) {
    return res.json(airport)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/airports/:code', (req, response) => {
  const code = req.params.code
  airports = airports.filter(airport => airport["iata-code"] !== code)
  response.status(204).end()
})

app.post('/api/airports', (req, res) => {
  const airport = req.body

  console.log(airport)
  if (!airport["iata-code"]) {
    return res.status(400).json({
      error: 'required "iata-code" field is missing'
    })
  }

  const newAirport = {
    "iata-code": airport["iata-code"],
    "city": airport.city,
    "country": airport.country
  }

  airports = airports.concat(newAirport)

  res.json(airport)
})

const PORT = process.env.PORT || 3023
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})