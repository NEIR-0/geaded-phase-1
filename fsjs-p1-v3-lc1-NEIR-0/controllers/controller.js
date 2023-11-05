const Model = require("../models/model");
const View = require("../views/view");

class Controller {
  // Tambahkan parameter sesuai kebutuhanmu
  static async show() { // release 1
    try{
      const data = await Model.findAll()
      View.show(data)
    }
    catch(err){
      View.error(err)
    }
  }

  static async detail(id) { // release 2
    try{
      const data = await Model.findOne(id)
      View.detail(data)
    }
    catch(err){
      View.error(err)
    }
  }

  static async showTrack() { // release 3
    try{
      const data = await Model.addSongToPlaylist()
      View.showTrack(data)
    }
    catch(err){
      View.error(err)
    }
  }

  static async addToPlaylist(idPlaylist, songName, songGroup, songDuration) { // release 4
    try{
      const data = await Model.writeData(idPlaylist, songName, songGroup, songDuration)
      View.success(data)
    }
    catch(err){
      View.error(err)
    }
  }

  // Tambahkan method lain sesuai kebutuhanmu

}

module.exports = Controller;
