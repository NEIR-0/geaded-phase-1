// code here for class release 0
class Bank{
    constructor(id, name, type, limit, customers){
        this.id = id
        this.name = name
        this.type = type
        this.limit = limit
        this.customers = customers
    }

    toJSON(){ // pas re-write gak boleh ada limit
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            customers: this.customers
        }
    }
}

class LocalBank extends Bank {
    constructor(id, name, limit, customers){
        super(id, name, "LocalBank", limit, customers)
    }
}

class NationalBank extends Bank {
    constructor(id, name, limit, customers){
        super(id, name, "NationalBank", limit, customers)
    }
}

class Customer {
    #ktp
    #depositAmount
    constructor(name, ktp, depositAmount){
        this.name = name
        this.#ktp = ktp
        this.#depositAmount = depositAmount
    }

    // ktp
    get getKtp(){
        return this.#ktp
    }
    set getKtp(val){
        this.#ktp = val
    }

    // deposit
    get getDeposit(){
        return this.#depositAmount
    }
    set getDeposit(val){
        this.#depositAmount = val
    }

    toJSON(){
        return {
            name: this.name,
            ktp: this.getKtp,
            depositAmount: this.#depositAmount
        }
    }
}

class Factory {
    static showBank(id, name, type, customers){
        if(type === "LocalBank"){
            return new LocalBank(id, name, 3, customers)
        }
        else if(type === "NationalBank"){
            return new NationalBank(id, name, 5, customers)
        }
    }

    static createCustomer(name, ktp, depositAmount){
        return new Customer(name, ktp, depositAmount)
    }
}

module.exports = Factory