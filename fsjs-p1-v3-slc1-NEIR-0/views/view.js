class View {
  // parameter tambahkan sesuai kebutuhan
  static printError(err){
    console.log(err);
  }
  static read(data){
    console.log(data);
  }
  static successAddBank(data){
    console.log(`Customer ${data.name} added successfully`);
  }
  static deleteCustomer(data){
    console.log(`Customer wit name ${data.name} deleted successfully`);
  }
  static detailBank(data){
    // console.log(data);
    let customer = data.customers
    const tamplate = customer.map((el) => {
      return {
        name: el.name,
        ktp: el.getKtp,
        depositAmount: el.getDeposit,      
      }
    })
    console.table(tamplate);
  }
  static addInterest(){
    console.log("You got Interest from your bank 10%");
  }
}

module.exports = View