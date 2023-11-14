class ProductionHouse {
    constructor(id, name, headquarters){
        this.id = id
        this.name = name
        this.headquarters = headquarters
    }
}
// INSERT INTO "Movies"  ("name" , released_year, genre, "ProductionHouseId")
class Movies {
    constructor(id, name, headquarters, nameMovies, released_year, genre, ProductionHouseId){
        this.id = id
        this.name = name
        this.headquarters = headquarters
        this.nameMovies = nameMovies
        this.released_year = released_year
        this.genre = genre
        this.ProductionHouseId = ProductionHouseId
    }

    get nameProductionsHouse(){
        console.log(this.ProductionHouseId);
        if(this.ProductionHouseId === 1){
            return "Walt Disney Studios"
        }
        else if(this.ProductionHouseId === 2){
            return "Pixar"
        }
        else if(this.ProductionHouseId === 3){
            return "Warner Bros"
        }
        else if(this.ProductionHouseId === 4){
            return "Universal Pictures"
        }
        else if(this.ProductionHouseId === 5){
            return "Paramount Pictures"
        }

    }
}


module.exports = {ProductionHouse, Movies}