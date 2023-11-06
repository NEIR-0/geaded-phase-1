const fs = require("fs").promises
const { CLIENT_RENEG_LIMIT } = require("tls")
const factory = require("./class.js")
// Tambahkan parameter sesuai kebutuhanmu

class Model {
  // PART 1
  static async readTheater(){
    try{
      const data = JSON.parse(await fs.readFile("./data/theaters.json", "utf-8"))

      const instance = data.map((el) => {
        return factory.listTheater(el.id, el.name, el.movie)
      })

      return instance
    }
    catch(err){
      throw err
    }
  }

  static async readCustomer(){
    try{
      const data = JSON.parse(await fs.readFile("./data/customers.json", "utf-8"))

      const instance = data.map((el) => {
        const { id, name, gender, ticket } = el
        return factory.listCustomer(id, name, gender, ticket)
      })
      // console.log(instance);

      return instance
    }
    catch(err){
      throw err
    }
  }

  static async checkSeat(input){
    const dataTheater = await Model.readTheater()
    const dataCustomer = await Model.readCustomer()
    let temp;
    dataTheater.forEach((el) => {
      if(el.id === input){
        let theater = el.name
        let customer = el.customers
        dataCustomer.forEach(el => {
          let theaterCustomer = el.ticket.theaterName
          if(theater === theaterCustomer){
            customer.push(el)
          }
        });
       
        temp = el
      }
    })
    
    return temp
  }

  // PART 2
  static save(data, pathFile, cb){ 
    // note jika ingin diganti atau mau menambahkan method boleh untuk method save ini
    // yang digunakan untuk writeFile
  }

  static async addCustomer(id_theater, name, gender, seat_number, typeTicket){ // buyTicket
    try{
      const dataTheater = await Model.readTheater()
      const dataCustomer = await Model.readCustomer()

      let id;
      if(dataCustomer.length > 0){
        id = dataCustomer[dataCustomer.length - 1].id + 1
      }

      let col = "ABCDEF"
      let row = 8
      const part = seat_number.split("-")
      const part1 = part[0]
      const part2 = +part[1] // jadiin number
      let err = true
      for (const alphabet of col) {
        if(part1 === alphabet){
          // console.log(part1, alphabet, part1 === alphabet);
          for (let i = 1; i < row; i++) {
            // console.log(part2, i, part2 === i);
            if(part2 === i){
              err = false
              break
            }
          }
        }
      }
      

      let result;
      for (let i = 0; i < dataTheater.length; i++) {
        const theater = dataTheater[i];
        let theaterId = theater.id
        if(theaterId === id_theater){
          for (let j = 0; j < dataCustomer.length; j++) {
            const customer = dataCustomer[j];
            let seatNumber = customer.ticket.private // dapet dari getter
            if(seatNumber === seat_number){
              result = "Seat already been booked, please choose another seat"
              break
            }
            else{
              result = {
                id: id,
                name: name,
                gender: gender,
                ticket: factory.Ticket(theater.name, typeTicket, theater.name, seat_number)
              }
            }
          }
          break
        }
        else{
          result = `Theater not found, please check your input`
        }
      }
      // console.log(result);
      // console.log(typeof result);
      // console.log(err);

      if(typeof result !== "string" && !err){
        dataCustomer.push(result)

        await fs.writeFile("./data/customers.json", JSON.stringify(dataCustomer, null, 4))
      }

      if(err === false){
        return result
      }

      return `Seat number: Not funds`
    }
    catch(err){
      throw err
    }
  }

  static async findCustomer(id_customer){ // ticketInfo
    try{
      const dataCustomer = await Model.readCustomer()
      const target = dataCustomer.find((el) => {
        if(el.id === id_customer){
          return el
        }
      })
      // console.log(target);

      if(!target){
        return  `Customer not found, please check your input`
      }
      else{
        // console.log(target);
        const customer = factory.listCustomer(target.id, target.name, target.gender, target.ticket)
        
        return customer
      }
    }
    catch(err){
      throw err
    }
  }
  static updateTicket(){

  }
  static deleteTicket(){

  }
  static showCustomerByTheater(){  // showCustomer

  }
}
// Model.findCustomer(1)

module.exports = Model