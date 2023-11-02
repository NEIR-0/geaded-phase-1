const inputUser = process.argv[2]
const Controllers = require("./Controller/controller")

switch (inputUser) {
    case "help":
        Controllers.help()
        break;
    case "list":
        Controllers.listTask()
        break;
    case "add":
        const task = process.argv[3]
        Controllers.addList(task)
        break;
    case "findById":
        const idTask = +process.argv[3] // number
        Controllers.findById(idTask)
        break;
    case "delete":
        const delId = +process.argv[3] // number
        Controllers.deleteId(delId)
        break;
    case "complete":
        const idComplete = +process.argv[3] // number
        Controllers.completed(idComplete)
        break;
    case "uncomplete":
        const idUncomplete = +process.argv[3] // number
        Controllers.uncompleted(idUncomplete)
        break;
    case "list:created":
        const timeSort = process.argv[3]
        // asc|desc
        if(timeSort.toLowerCase() === "asc"){
            // console.log("ascending");
            Controllers.asc()
            break
        }
        if(timeSort.toLowerCase() === "desc"){
            Controllers.desc()
        }
        break;
    case "list:completed":
        const completeSort = process.argv[3]
        // asc|desc
        if(completeSort.toLowerCase() === "asc"){
            // console.log("ascending");
            Controllers.completedAsc()
            break
        }
        if(completeSort.toLowerCase() === "desc"){
            Controllers.completedDesc()
        }
        break;
    case "tag":
        let args = process.argv
        const tagId = +process.argv[3]
        let tagged = []
        for (let i = 4; i < args.length; i++) {
            const el = args[i];
            tagged.push(el)
        }

        break
    default:
        break;
}