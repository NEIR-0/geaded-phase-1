const Controller = require("./controllers/controller");
// di bebaskan mau pakai condtional switch case atau if else

const input = process.argv[2];
switch (input) {
  case "show":
    Controller.show()
    break;
  case "detail":
    const id = +process.argv[3];
    Controller.detail(id)
    break;
  case "trackLength":
    // node index.js trackLength
    Controller.showTrack()
    break;
  case "addToPlaylist":
    // node index.js addToPlaylist 3 "Alone in The Dark" "Reggae" 90
    const idPlaylist = +process.argv[3];
    const songName = process.argv[4];
    const songGroup = process.argv[5];
    const songDuration = +process.argv[6];
    Controller.addToPlaylist(idPlaylist, songName, songGroup, songDuration)
    break;
  default:
    console.log(`
=======================================================================================================
                                        COMMAND LINE
=======================================================================================================
$ node index.js show
$ node index.js detail <id>
$ node index.js trackLength
$ node index.js addToPlaylist <idPlaylist> <songName> <songGroup> <songDuration>
    `);
    break;
}



// switch (input) {
//   case "show":
//     break
//   case "detail":
//   case "trackLength":
//   case "addToPlaylist":
//   default:
// }
