const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.status(200).json(devs)
  },

  async store(req, res){
    const { github_username, techs, latitude, longitude } = req.body

    let dev = await Dev.findOne({github_username})

    if(!dev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`)
  
      const { name = login, avatar_url, bio } = response.data

      const techsArray = parseStringAsArray(techs)

      const location = {
        type: 'Point',
        coordinates:[longitude, latitude ]
      }

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs:techsArray,
        location
      })
    }

    return res.status(201).json(dev) 
  },

  async update(req, res) {
    const { github_username } = req.params
    if(req.body.github_username) delete req.body.github_username

    let dev = await Dev.findOneAndUpdate({github_username}, req.body)

    if(!dev) {
      return res.status(404).json({message:'User not found'})
    }

    dev = await Dev.findOne({github_username})

    return res.status(200).json(dev)
  },

  async destroy(req, res) {
    const { github_username } = req.params

    const dev = await Dev.findOneAndDelete({github_username})

    if(!dev) {
      return res.status(404).json({message:'User not found'})
    }

    return res.status(204).end()
  }
}