const planetDb = require('./planet-db')
const planetApi = require('./planet-api')
const NodeCache = require( 'node-cache')


/**
 * sets the planet object inside the cache
 * @param {*} planetId 
 * @param {*} planet 
 */
async function setInCache(planetId, planet){
  console.log('Setting data to cache')
}

/**
 * get planet object from cache
 * @param {*} planetId 
 * @param {*} planet 
 */
async function getFromCache(planetId){
  console.log('Getting data from cache')
}

async function get(planetId) {
  
  // Assumtions: I have assumed that the data coming from
  // the SWAPI api never cahnges
  // so I will not purge data from database
  // I will create a cache in memory to store planet data
  // This will be done by a npm module 'node-cache'
  // The app will first try to get data from this cache
  // if the data is unavailable or the cache TTL expires, then the app will 
  // query the database and if that fails to give data
  // it will get data from the API
  // Whenever data is received from database or API call
  // the cache will be populated

  let planet = await getFromCache(planetId)
  if (planet){
    return planet
  }


  planet = await planetDb.get(planetId)

  if (planet) {
    console.log('fetched data from db')
    await setInCache(planetId, planet)
    return planet
 }

 planet = await planetApi.get(planetId)
 if (planet){
    await planetDb.upsert(planet)
    await setInCache(planetId, planet)
 }
  return planet
}

module.exports = {
  get,
  getFromCache,
  setInCache
}
