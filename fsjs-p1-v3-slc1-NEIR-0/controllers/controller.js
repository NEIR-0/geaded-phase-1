const Model = require('../models/model')
const View = require('../views/view')

class Controller {
  // parameter tambahkan sesuai kebutuhan
  static async list(){
    const data = await Model.readBank()
    View.read(data)
  }
  static async addBank(id, name, ktp, deposit){ 
    try{
      const data = await Model.createBank(id, name, ktp, deposit)
      View.successAddBank(data)
    }
    catch(err){
      View.printError(err)
    }
  }
  static async deleteBank(delId, delKtp){
    try{
      const data = await Model.deleteCustomerByKtp(delId, delKtp)
      // console.log(data);
      View.deleteCustomer(data)
    }catch(err){
      View.printError(err)
    }
    
  }
  static async detail(id){
    const data = await Model.readCustomerByBankId(id)
    const rupiah = await Model.deposiRupiahFormat(data)
    View.detailBank(rupiah)
  }

  static async addInterest(id){
    try{
      await Model.addInterest(id)
      View.addInterest()
    }catch(err){
      View.printError(err)
    }
  }
}

module.exports = Controller