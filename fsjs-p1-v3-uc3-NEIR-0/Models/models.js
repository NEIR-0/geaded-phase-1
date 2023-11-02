const fs = require("fs").promises // ini penting
const Factory = require("./class")

class Models {
    static async listTask(){
        try{
            const dataBase = JSON.parse(await fs.readFile("./data.json", "utf-8"))

            const listTask = dataBase.map((el) => {
                const {id, date, complete, task} = el
                return Factory.listTask(id, date, complete, task)
            })

            return listTask
        }
        catch(err){
            throw err
        }
    }

    static async addTask(task){
        try{
            const data = await Models.listTask()

            // id
            let id = 1
            if(data.length > 0){
                id = data[data.length - 1].id + 1 // jangan lupa ".id"
            }

            const time = new Date()
            const year = time.getFullYear()
            const month = time.getMonth()
            const date = time.getDate()
            const hour = time.getHours()
            const min = time.getMinutes()
            const sec = time.getSeconds()
            const fullTime = (`${year}-${month}-${date}, ${hour}:${min}:${sec}`);

            const newData = Factory.listTask(id, fullTime, false, task)

            data.push(newData)
            
            await fs.writeFile("./data.json", JSON.stringify(data, null, 4))

            return newData
        }
        catch(err){
            throw err
        }
    }

    static async findById(input){
        try{
            const data = await Models.listTask()
            const finder = data.find((el) => { 
                if(el.id === input){
                    return el
                }
            }) 

            return finder 
        }
        catch(err){
            throw err
        }
    }

    static async deleted(input){
        try{
            const data = await Models.listTask()
            let del;
            let notDel = []
            data.forEach(el => {
                if(el.id === input){
                    del = el
                }
                else{
                    notDel.push(el)
                }
            }); 

            await fs.writeFile("./data.json", JSON.stringify(notDel, null, 4))

            return del
        }
        catch(err){
            throw err
        }
    }

    static async completed(input){
        try{
            const data = await Models.listTask()
            data.forEach(el => {
                if(el.id === input){
                    el.complete = true
                }
            });

            await fs.writeFile("./data.json", JSON.stringify(data, null, 4))

            return data
        }
        catch(err){
            throw err
        }
    }

    static async uncompleted(input){
        try{
            const data = await Models.listTask()
            data.forEach(el => {
                if(el.id === input){
                    el.complete = false
                }
            });

            await fs.writeFile("./data.json", JSON.stringify(data, null, 4))

            return data
        }
        catch(err){
            throw err
        }
    }

    static async asc(){
        const data = await Models.listTask()
        const sorting = data.map((el) => {
            let date = el.time // private prop
            return date
        })
        // let sortAsc = sorting.sort((a, b) => a - b) // ini work untuk data satuan seperti number. Kalo data kayak date not working
        let sortAsc = sorting.sort()

        let result = []
        for (const target of sortAsc) {
            for (const perData of data) {
                let dateTask = perData.time // private so its use getter
                if(target === dateTask){
                    result.push(perData)
                }
            }
        }
        // console.log(result);
        return result
    }

    static async desc(){
        const data = await Models.listTask()
        const sorting = data.map((el) => {
            let date = el.time // private prop
            return date
        })
        // let sortDesc = sorting.sort((a, b) => a - b) // ini work untuk data satuan seperti number. Kalo data kayak date not working
        let sortDesc = sorting.sort().reverse()

        let result = []
        for (const target of sortDesc) {
            for (const perData of data) {
                let dateTask = perData.time // private so its use getter
                if(target === dateTask){
                    result.push(perData)
                }
            }
        }

        return result
    }

    static async completeAsc(){
        const data = await Models.listTask()
        const filtering = data.filter((el) => {
            if(el.complete === true){
                return el
            }
        })
        // console.log(filtering);
        
        let result = []
        filtering.forEach((el) => {
            let dateTask = el.time // private
            result.push(dateTask)
        })

        const sorting = result.sort()
        // console.log(sorting);

        let finalResult = []
        for (const target of sorting) {
            for (const perData of filtering) {
                let perDate = perData.time
                if(target === perDate){
                    finalResult.push(perData)
                }
            }
        }
        // console.log(finalResult);
        return finalResult
    }

    static async completedDesc(){
        const data = await Models.listTask()
        const filtering = data.filter((el) => {
            if(el.complete === true){
                return el
            }
        })
        // console.log(filtering);
        
        let result = []
        filtering.forEach((el) => {
            let dateTask = el.time // private
            result.push(dateTask)
        })

        const sorting = result.sort().reverse()
        // console.log(sorting);

        let finalResult = []
        for (const target of sorting) {
            for (const perData of filtering) {
                let perDate = perData.time
                if(target === perDate){
                    finalResult.push(perData)
                }
            }
        }
        // console.log(finalResult);
        return finalResult
    }

    // static async tag(tagId, tagged){
    //     const data = await Models.listTask()
    //     const newData = data.find((el) => {
    //         if(el.id === tagId){
    //             el.tag = tagged
    //             return el
    //         }
    //     })

    //     await fs.writeFile("./data.json", JSON.stringify(data, null, 4))
    // }
}

// Models.tag(2, ["house", "party", "hobby"])

module.exports = Models