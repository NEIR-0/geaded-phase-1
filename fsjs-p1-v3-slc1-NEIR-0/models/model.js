const fs = require("fs").promises;
const Factory = require("./class")
class Model {
  // parameter tambahkan sesuai kebutuhan
  static async saveJSON(val){
    await fs.writeFile("./data.json", JSON.stringify(val, null, 4))
  }
  static async readBank(){
    const data = JSON.parse(await fs.readFile("./data.json", "utf-8"))
    
    // customer array harus pake ini!
    const instance = data.map(el => {
      const {id, name, type, customers} = el
      const perCustomers = customers.map(el => {
        const {name, ktp, depositAmount} = el
        return Factory.createCustomer(name, ktp, depositAmount)
      })

      return Factory.showBank(id, name, type, perCustomers)
    })
    // console.log(instance);

    return instance
  }
  static async createBank(id, name, ktp, deposit){
    try{
      const data = await Model.readBank()

      const filtering = data.find(el => el.id === id)
      // console.log(filtering);
      const limit = filtering.limit
      const customerLength = filtering.customers.length
      // console.log(limit);
      // console.log(customerLength);

      if(customerLength >= limit){
        // console.log(`You can't add more Customer to this bank`); 
        throw `You can't add more Customer to this bank`
      }

      const newCustomer = Factory.createCustomer(name, ktp, deposit) // Customer { name: 'budi' }
      const bankIndex = data.findIndex(el => el.id === id) // true
  
      data[bankIndex].customers.push(newCustomer)
      await Model.saveJSON(data)
      return newCustomer
    }
    catch(err){
      throw err
    }
  }
  static async deleteCustomerByKtp(id, ktp){
    const data = await Model.readBank()
    const bankIndex = data.findIndex(el => el.id === id)

    const finder = data[bankIndex].customers
    let deleted;
    let notDel = []
    finder.forEach(el => {
      // console.log(el.getKtp);
      if(el.getKtp === ktp){
        deleted = el
      }
      else if(el.getKtp !== ktp){
        throw `Customer with ktp ${ktp} is not found`
      }
      else{
        notDel.push(el)
      }
    });
    data[bankIndex].customers = notDel
    // console.log(deleted);
    // console.log(notDel);

    // console.log(data);
    await Model.saveJSON(data)
    return deleted
  }
  static async readCustomerByBankId(id){
    const data = await Model.readBank()
    const finder = data.find(el => {
      if(el.id === id){}
      return el
    })
    // console.log(finder);

    return finder
  }
  static async addInterest(id){
    try{
      const data = await Model.readBank()
      
      const filtering = data.find(el => el.id === id)
      const allCustomers = filtering.customers
      allCustomers.forEach(el => {
        let deposit = el.getDeposit
        let interest = (deposit * 10) / 100
        el.getDeposit = deposit + interest
      })

      await Model.saveJSON(data)
    }
    catch(err){
      throw err
    }
  }
  static async deposiRupiahFormat(data){
    try{
      const customer = data.customers
      const rupiah = customer.map(el => {
        el.getDeposit = `Rp. ${el.getDeposit}`
        return el
      })
      data.customers = rupiah

      return data
    }
    catch(err){
      throw err
    }
  }
}

module.exports = Model