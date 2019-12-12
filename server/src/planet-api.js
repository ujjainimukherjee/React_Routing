const axios = require('axios')

async function get(planetId) {
  try {
    const res = await axios.get(`https://swapi.co/api/planets/${planetId}/`)

    return { id: planetId, name: res.data.name }
  } catch (err) {
    console.log(`Error finding planet '${planetId}' from swapi`, err)

    return null
  }
}

module.exports = {
  get
}
