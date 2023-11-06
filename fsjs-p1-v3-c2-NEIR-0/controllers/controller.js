const Model = require('../models/model')
const View = require('../views/view')

// Tambahkan parameter sesuai kebutuhanmu

class Controller {
  // PART 1
  static help(){
    View.help()
  }
  static async theaterList(){
    try{
      const data = await Model.readTheater()
      View.listTheater(data)
    }
    catch(err){
      View.showError(err)
    }
  }
  static async customerList(){
    try{
      const data = await Model.readCustomer()
      View.listCustomer(data)
    }
    catch(err){
      View.showError(err)
    }
  }
  static async checkSeats(input){
    try{
      const data = await Model.checkSeat(input)
      View.checkSeat(data)
    }
    catch(err){
      View.showError(err)
    } 
  }

  // PART 2
  static async buyTicket(idTheater, newName, gender, seatNumber, typeTicket){
    try{
      const newData = await Model.addCustomer(idTheater, newName, gender, seatNumber, typeTicket)
      View.addCustomer(newData)
    }
    catch(err){
      View.showError(err)
    } 
  }
  static async ticketInfo(id){
    try{
      const data = await Model.findCustomer(id)
      View.ShowTicketInfo(data)
    }
    catch(err){
      View.showError(err)
    } 
  }
  static changeTicket(){

  }
  static cancelTicket(){

  }
  static showCustomer(){

  }
}

module.exports = Controller