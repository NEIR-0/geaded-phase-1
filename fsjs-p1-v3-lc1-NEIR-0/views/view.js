class View {
  // Tambahkan parameter sesuai kebutuhanmu
  static show(data) { // release 1
    console.log(data)
  }

  static detail(data) { // release 2
    const song = data.songs
    const templete = song.map(el => {
      return {
        name: el.name,
        group: el.group,
        durationInMinute: el.durationInMinute(),
      }
    })
    console.table(templete)    
  }

  static showTrack(data) { // release 3
    // console.log(data);
    const templete = data.map(el => {
      return {
        id: el.id,
        name: el.name,
        type: el.type,
        limit: el.limit,
        trackLength: el.song,
      }
    })
    console.table(templete)
  }

  static error(err) {
    console.log(`
=======
ERROR
=======
${err}
    `)
  }

  static success(data) { // release 4
    // console.log(data);
    const type = data.type
    const songs = data.songs.length
    const limit = data.limit
    let slot =  limit - songs
    // console.log(songs, limit);
    console.log(`
=======
SUCCESS
=======
Successfully adding new song to playlist ${type}, and remaining available slot for song on playlist: ${slot}
    `)
  }
}

module.exports = View;
