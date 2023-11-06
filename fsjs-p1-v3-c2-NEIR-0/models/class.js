// Create all class for instantiate here
class Theater {
    constructor(id, name, movie, customers = []){
        this.id = id
        this.name = name
        this.movie = movie
        this.customers = customers
    }
}

class Customer {
    constructor(id, name, gender, ticket){
        this.id = id
        this.name = name
        this.gender = gender
        this.ticket = Factory.Ticket(ticket.theaterName, ticket.type, ticket.movie, ticket.seatNumber)
    }
}

class Ticket {
    #seatNumber
    constructor(theaterName, type, movie, seatNumber){
        this.theaterName = theaterName
        this.type = type
        this.movie = movie
        this.#seatNumber = seatNumber
    }

    get private(){
        return this.#seatNumber
    }

    set private(value){
        this.#seatNumber = value
    }

    toJSON(){
        return {
            "theaterName": this.theaterName, 
            "type": this.type,
            "movie": this.movie,
            "seatNumber": this.private
        }
    }
}

class Regular extends Ticket { 
    constructor(theaterName, movie, seatNumber){
        super(theaterName, "Regular", movie, seatNumber)
    }
}

class IMAX extends Ticket { 
    constructor(theaterName, movie, seatNumber){
        super(theaterName, "IMAX", movie, seatNumber)
    }
}

class Premiere extends Ticket { 
    constructor(theaterName, movie, seatNumber){
        super(theaterName, "Premiere", movie, seatNumber)
    }
}


class Factory {
    static listTheater(id, name, movie, customers){
        return new Theater(id, name, movie, customers)
    }

    static listCustomer(id, name, gender, ticket){
        return new Customer(id, name, gender, ticket)
    }

    static listTicket(theaterName, type, movie, seatNumber){
        return new Customer(theaterName, type, movie, seatNumber)
    }

    static Ticket(theaterName, type, movie, seatNumber){
        if(type.toLowerCase() === "regular"){
            return new Regular(theaterName, movie, seatNumber)
        }
        else if(type.toLowerCase() === "imax"){
            return new IMAX(theaterName, movie, seatNumber)
        }
        else if(type.toLowerCase() === "premiere"){
            return new Premiere(theaterName, movie, seatNumber)
        }
    }
}

// Hal yang perlu di pertimbangkan setelah membuat class sesuai requirement :
// - Composition & Aggregation
// - Factory Method

module.exports = Factory