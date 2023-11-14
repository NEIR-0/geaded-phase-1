class Display {
    constructor(id, name, category, minSize, maxSize, status){
        this.id = id
        this.name = name
        this.category = category
        this.minSize = minSize
        this.maxSize = maxSize
        this.status = status
    }
}

class Form extends Display {
    constructor(id, name, category, minSize, maxSize, status, nameCategory){
       super(id, name, category, minSize, maxSize, status)
       this.nameCategory = nameCategory
    }
}


class Categories {
    constructor(id, name){
        this.id = id
        this.name = name
    }
}

module.exports = {Display, Form, Categories}