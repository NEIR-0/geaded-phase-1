const Models = require("../Models/models")
const Views = require("../Views/view")

class Controllers {
    static help(){
        Views.help()
    }

    static async listTask(){
        try{
            const data = await Models.listTask()
            Views.listTask(data)
        }
        catch(err){
            Views.error(err)
        }
    }

    static async addList (input){
        try{
            const add = await Models.addTask(input)
            Views.addList(add)
        }
        catch(err){
            Views.error(err)
        }
    }

    static async findById(input){
        try{
            const finder = await Models.findById(input)
            Views.showFinder(finder);
        }
        catch(err){
            Views.error(err)
        }
    }

    static async deleteId(input){
        try{
            const deleted = await Models.deleted(input)
            Views.deletedItem(deleted);
        }
        catch(err){
            Views.error(err)
        }
    }

    static async completed(input){
        try{
            const completed = await Models.completed(input)
            Views.listTask(completed);
        }
        catch(err){
            Views.error(err)
        }
    }

    static async uncompleted(input){
        try{
            const uncompleted = await Models.uncompleted(input)
            Views.listTask(uncompleted);
        }
        catch(err){
            Views.error(err)
        }
    }

    static async asc (){
        try{
            const data = await Models.asc()
            Views.listTask(data)
        }
        catch(err){
            Views.error(err)
        }
    }

    static async desc (){
        try{
            const data = await Models.desc()
            Views.listTask(data)
        }
        catch(err){
            Views.error(err)
        }
    }

    static async completedAsc (){
        try{
            const data = await Models.completeAsc()
            Views.listTask(data)
        }
        catch(err){
            Views.error(err)
        }
    }

    static async completedDesc (){
        try{
            const data = await Models.completedDesc()
            Views.listTask(data)
        }
        catch(err){
            Views.error(err)
        }
    }
}

module.exports = Controllers