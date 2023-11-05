const fs = require("fs").promises;
const Factory = require("./class")

class Model {
  // Tambahkan parameter sesuai kebutuhanmu
  static async findAll() { // Release 1 & Release 3
    try{
      const dataBase = JSON.parse(await fs.readFile("./data.json", "utf-8"))
      const instance = dataBase.map(el => {
        const {id, name, type, songs, limit} = el
        const allSongs = songs.map(el => {
          const {name, group, duration} = el
          return Factory.createSongs(name, group, duration)
        })

        return Factory.showPlaylist(id, name, type, allSongs, limit)
      })

      // console.log(instance);
      return instance
    }
    catch(err){
      throw err
    }
  }

  static async findOne(id) { // Release 2
    try {
      const data = await Model.findAll()
      const findPlaylist = data.find(el => el.id === id)
      if(findPlaylist === undefined){
        throw "Invalid playlist ID"
      }
      else{
        // const changed = findPlaylist.durationInMinute()
        // findPlaylist.songs = changed
        // console.log(changed);

        return findPlaylist
      }
    } 
    catch(err){
      throw err
    }
  }

  static async addSongToPlaylist() { // Release 4
    try {
      const data = await Model.findAll()
      const changed = data.map(el => {
        const length =  el.trackLength()
        return {
          id: el.id,
          name: el.name,
          type: el.type,
          limit: el.limit,
          song: length,
        }
      });

      // console.log(changed);
      return changed
    } 
    catch(err){
      throw err
    }
  }

  static async writeData(idPlaylist, songName, songGroup, songDuration) { // Release 4
    try {
      const data = await Model.findAll()
      const newData = Factory.createSongs(songName, songGroup, songDuration)
      const findPlaylist = data.find(el => el.id === idPlaylist)
      if(findPlaylist === undefined){
        throw "Invalid playlist ID"
      }
      else{
        findPlaylist.songs.push(newData)

        // console.log(findPlaylist, data);
        await fs.writeFile("./data.json", JSON.stringify(data, null, 4))
  
        // console.log([findPlaylist.type, slot]);
        return findPlaylist
      }
    } 
    catch(err){
      throw err
    }
  }

  // Tambahkan method lain sesuai kebutuhanmu
}
module.exports = Model;
