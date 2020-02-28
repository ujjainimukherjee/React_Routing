const planetDb = require('./planet-db')
const planetApi = require('./planet-api')
const NodeCache = require( 'node-cache')
// initilazing the cache with TTL 20 seconds and checkPeriod 5 seconds
// this is done for testing purposes only
let innerCache = new NodeCache({ stdTTL: 20,  checkperiod: 5 });


function initCache( ttl, checkPeriod){
  innerCache = new NodeCache({ stdTTL: ttl, checkperiod: checkPeriod });
}

/**
 * sets the planet object inside the cache
 * @param {*} planetId 
 * @param {*} planet 
 */
async function setInCache(planetId, planet){
  console.log('Setting data to cache')

  return innerCache.set(planetId, planet)
}

/**
 * get planet object from cache
 * @param {*} planetId 
 * @param {*} planet 
 */
async function getFromCache(planetId){
  console.log('Getting data from cache')
  return innerCache.get(planetId)
}

// Assumtions: I have assumed that the data coming from
  // the SWAPI api never changes
  // so I will not purge data from database
  // I will create a cache in memory to store planet data
  // This will be done by a npm module 'node-cache'
  // The app will first try to get data from this cache
  // if the data is unavailable or the cache TTL expires, then the app will 
  // query the database and if that fails to give data
  // it will get data from the API
  // Whenever data is received from database or API call
  // the cache will be populated
async function get(planetId) {

  let planet = await getFromCache(planetId)
  if (planet){
    console.log('getting from cache')
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
  initCache,
  setInCache
}
