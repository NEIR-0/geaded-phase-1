const Controller = require('./controllers/controller.js')


// Good luck and happy coding >:(
const inputUser = process.argv[2]
// node app.js
// node app.js help
// node app.js theaterList
// node app.js customerList
// node app.js checkSeat
// node app.js buyTicket 
// node app.js ticketInfo


switch (inputUser) {
    case "help":
        Controller.help()
        break;
    case "theaterList":
        Controller.theaterList()
        break;
    case "customerList":
        Controller.customerList()
        break;
    case "checkSeat":
        const inputUser = +process.argv[3]
        Controller.checkSeats(inputUser)
        break;
    case "buyTicket":
        const idTheater = +process.argv[3] // number
        const newName = process.argv[4] 
        const gender = process.argv[5]
        const seatNumber = process.argv[6]
        const typeTicket = process.argv[7]
        Controller.buyTicket(idTheater, newName, gender, seatNumber, typeTicket)
        // 1 budi Mele A-5 Regular
        break;
    case "ticketInfo":
        const id_ticket = +process.argv[3]
        Controller.ticketInfo(id_ticket)
        break;
    default:
        Controller.help()
        break;
}