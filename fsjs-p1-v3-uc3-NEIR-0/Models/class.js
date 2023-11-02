class Task {
    #date
    constructor(id, date, complete, task){
        this.id = id
        this.#date = date
        this.complete = complete
        this.task = task
    }

    get time(){
        return this.#date
    }

    set time(val){
        this.#date = val
    }

    toJSON(){
        return {
            id: this.id,
            date: this.#date,
            complete: this.complete,
            task: this.task
        }
    }
}

class Factory {
    static listTask(id, date, complete, task){
        return new Task(id, date, complete, task)
    }
}

module.exports = Factory