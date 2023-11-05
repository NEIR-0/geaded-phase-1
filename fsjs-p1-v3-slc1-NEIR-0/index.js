// your code start here..
const Controller = require("./controllers/controller")
const inputUser = process.argv[2]

switch (inputUser) {
    case "list":
        Controller.list()
        break;
    case "addCustomer":
        let id = +process.argv[3]
        let name = process.argv[4]
        let ktp = process.argv[5]
        let deposit = +process.argv[6]
        Controller.addBank(id, name, ktp, deposit)
        break;
    case "deleteCustomer":
        let delId = +process.argv[3]
        let delKtp = process.argv[4]
        Controller.deleteBank(delId, delKtp)
        break;
    case "detail":
        let findId = +process.argv[3]
        Controller.detail(findId)
        break;
    case  "addInterest":
        let setId = +process.argv[3]
        Controller.addInterest(setId)
        break
    default:
        Controller.list()
        break;
}