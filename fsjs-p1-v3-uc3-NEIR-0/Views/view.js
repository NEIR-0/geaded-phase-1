class Views {
    static error(err){
        console.log(`ERROR:`, err);
    }
    static help(){
        console.log(`
$ node todo.js
$ node todo.js help
$ node todo.js list
$ node todo.js add <task_content>
$ node todo.js findById <task_id>
$ node todo.js delete <task_id>
$ node todo.js complete <task_id>
$ node todo.js uncomplete <task_id
// =================================
$ node todo.js list:created asc|desc
$ node todo.js list:completed asc|desc
$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node todo.js filter:<tag_name>

        `);
    }
    static listTask(data){
        for (let i = 0; i < data.length; i++) {
            const el = data[i];
            const check = el.complete
            if(check === true){
                console.log(`${i+1}. [X] ${el.task}`);
            }
            else{
                console.log(`${i+1}. [ ] ${el.task}`);
            }
        }
    }
    static addList(data){
        console.log(`Added "${data.task}" to your TODO list...`);
    }
    static showFinder(input){
        console.log(`${input.id}. ${input.task}`);
    }
    static deletedItem(data){
        console.log(`Deleted "${data.task}" from your TODO list...`);
    }
}

module.exports = Views