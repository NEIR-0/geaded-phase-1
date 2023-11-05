class Playlist {
    #limit
    constructor(id, name, type, songs, limit){
    this.id = id
    this.name = name
    this.type = type
    this.songs = songs
    this.#limit = limit
    }

    get limit(){
        return this.#limit
    }
    set limit(val){
        this.#limit = val
    }

    // durationInMinute(){
    //     const durationInMinute = this.songs.map(el => {
    //         const minutes = Math.floor(el.duration / 60);
    //         const seconds = el.duration - minutes * 60;
    //         let filter;
    //         if(seconds > 9){
    //             filter = seconds
    //         }
    //         else{
    //             filter = `0${seconds}`
    //         }
    //         // console.log(filter);

    //         return {
    //             name: el.name,
    //             group: el.group,
    //             duration: `${minutes}:${filter}`,
    //         }
    //     })

    //     return durationInMinute
    // }

    trackLength(){
        const totalSongs = this.songs.length
        return totalSongs
    }
}
/*
class Mythic 
class Legend 
class Epic
*/

class Mythic extends Playlist{
    constructor(id, name, songs){
        super(id, name, "Mythic", songs, 10)
    }

    trackLength(){
        const totalSongs = this.songs.length
        return `- ${totalSongs} 🐉`
    }
}
class Legend extends Playlist{
    constructor(id, name, songs){
        super(id, name, "Legend", songs, 6)
    }
    
    trackLength(){
        const totalSongs = this.songs.length
        return`* ${totalSongs} 🦁`
    }
}
class Epic extends Playlist{
    constructor(id, name, songs){
        super(id, name, "Epic", songs, 4)
    }

    trackLength(){
        const totalSongs = this.songs.length
        return `+ ${totalSongs} 😹` 
    }
}

class Song {
  constructor(name, group, duration){
    this.name = name
    this.group = group
    this.duration = duration
  }

  durationInMinute(){
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration - minutes * 60;
    let filter;
    if(seconds > 9){
        filter = seconds
    }
    else{
        filter = `0${seconds}`
    }
    // console.log(filter);
    return  `${minutes}:${filter}`
}
}

class Factory {
    static showPlaylist(id, name, type, songs){
        if(type === "Mythic"){
            return new Mythic(id, name, songs)
        }
        else if(type === "Legend"){
            return new Legend(id, name, songs)
        }
        else if(type === "Epic"){
            return new Epic(id, name, songs)
        }
    }

    static createSongs(name, group, duration){
        return new Song(name, group, duration)
    }
}


module.exports = Factory
