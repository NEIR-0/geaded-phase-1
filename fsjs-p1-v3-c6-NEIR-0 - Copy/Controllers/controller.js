const {Incubator, Startup} = require("../models/index") // didalam filenya (class), {Incubator}
const { Op } = require("sequelize");
const {valuation, formatDate, reverseFormating} = require("../Helper/helper")

class Controllers {
    static async showIncubator(req, res){
        try {
            const data = await Incubator.findAll();
            res.render("home", {
                data: data
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    // formIncubator & postIncubator
    static async formIncubator(req, res){
        try {
            res.render("formIncubator")
        } catch (error) {
            res.send(error)
        }
    }
    static async postIncubator(req, res){
        try {
            const {name, location, level} = req.body
            // console.log(name, location, level);
            await Incubator.create({ name: name, location: location, level:level });

            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }
    // detailIncubator
    static async detailIncubator(req, res){
        try {
            // report!
            const {name, founder} = req.query

            const {incubatorId} = req.params
            const data = await Incubator.findAll({
                where:{
                    id:{
                        [Op.eq]: incubatorId
                    },
                },
                include: {
                    model: Startup
                },
                // sumpah ini keren dan tricky!
                order: [ // pake dua array
                    [{model: Startup}, 'valuation', 'DESC'] // | {include-nya}, 'key', 'DESC/ASC' |
                ]
            })

            // const val = await Startup.sum('valuation', {
            //     where: {
            //         IncubatorId: incubatorId
            //     }
            // })

            const val = await valuation(Startup, incubatorId) // ini pake await. POKOKNYA "AWAIT" SELALU ADA DI CONTROLLER (SOMETIMSE DI HELPER DAN MODELS JUGA BUTUH, TAPI INGAT "AWAIT & ASYNC" SATU PAKET)
            // console.log(val);

            res.render("detailIncubators",{
                data: data[0],
                valuation: val,
                name: name, 
                founder: founder
            })
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    // formStartUp & postStartUp
    static async formStartUp(req, res){
        try {
            // validate
            const {error} = req.query
            let arrError;
            if(error){
                arrError = error.split(",") // harus di "split()"
                console.log(arrError.length);
            }

            const {incubatorId} = req.params
            const data = await Incubator.findAll({
                where:{
                    id:{
                        [Op.eq]: incubatorId
                    }
                }
            })

            if(arrError){ // jangan lupa length
                res.render("formStartUp",{
                    data: data[0],
                    error: arrError
                })
            }
            else{
                res.render("formStartUp",{
                    data: data[0],
                    error: ""
                })
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postStartUp(req, res){
        try {
            const {incubatorId} = req.params
            const {name, founder, date, education, role, valuation} = req.body
            // console.log(name, founder, date, education, role, valuation, incubatorId);
            await Startup.create({ startUpName: name, founderName: founder, dateFound:date, educationOfFounder:education, roleOfFounder:role, IncubatorId:incubatorId, valuation:valuation });

            res.redirect(`/incubators/${incubatorId}`)
        } catch (error) {
            // console.log(error);
            const {incubatorId} = req.params
            if(error.name === "SequelizeValidationError"){
                let totalError = []

                // res.send(error.errors)
                error.errors.forEach(el => {
                    totalError.push(el.message)
                });
                
                res.redirect(`/incubators/${incubatorId}/startUp/add?error=${totalError}`)
            }
            else{
                res.send(error)
            }
        }
    }

    // delete
    static async deleteStartUp(req, res){
        try {
            const {incubatorId, strartupId} = req.params // ini ada dua
            // console.log(incubatorId, strartupId);
            const data = await Startup.findOne({
                attributes: ['startUpName', 'founderName'],
                where: {
                    id: strartupId
                }
            })

            await Startup.destroy({
                where: {
                    id: strartupId
                }
            })

            res.redirect(`/incubators/${incubatorId}?name=${data.startUpName}&founder=${data.founderName}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    // edit & post
    static async formEditStartUp(req, res){
        try {
            // validate
            const {error} = req.query
            let arrError;
            if(error){
                arrError = error.split(",") // harus di "split()"
                console.log(arrError.length);
            }

            const {incubatorId, strartupId} = req.params 
            const data = await Startup.findAll({
                where: {
                    id: strartupId
                }
            })
            let formating = formatDate(data[0].dateFound)
            // res.send(formating)

            if(arrError){ // jangan lupa length
                res.render("editform",{
                    data: data[0],
                    incubatorId: incubatorId,
                    formating: formating,
                    error: arrError
                })
            }
            else{
                res.render("editform",{
                    data: data[0],
                    incubatorId: incubatorId,
                    formating: formating,
                    error: ""
                })
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    static async postEditStartUp(req, res){
        try {
            const {incubatorId, strartupId} = req.params 
            const {name, founder, date, education, role, valuation} = req.body
            const formating = reverseFormating(date)
            // console.log(name, founder, formating, education, role, valuation, incubatorId);
            await Startup.update(
                { startUpName: name, founderName: founder, dateFound:formating, educationOfFounder:education, roleOfFounder:role, IncubatorId:incubatorId, valuation:valuation },
                {
                where: {
                    id: strartupId
                    }
            });
            res.redirect(`/incubators/${incubatorId}`)
        } catch (error) {
            // console.log(error);
            const {incubatorId, strartupId} = req.params 
            if(error.name === "SequelizeValidationError"){
                let totalError = []

                // res.send(error.errors)
                error.errors.forEach(el => {
                    totalError.push(el.message)
                });
                
                res.redirect(`/incubator/${incubatorId}/startup/${strartupId}/edit?error=${totalError}`)
            }
            else{
                res.send(error)
            }
        }
    }

    // showStartUp
    static async showStartUp(req, res){
        try {
            // report!
            const {name, founder} = req.query
            const {role} = req.query

            const data = await Startup.getStartUpByRoleOfFounder(role, Incubator) // static method baru dari model
            // const data = await Startup.findAll({
            //         include: {
            //             model:Incubator
            //         },
            //         order:[ // iki normalnya! Cuman pake 2 array gak ada obj
            //             ['valuation', 'DESC']
            //         ]
            //     }
            // )
            res.render("showStartUp",{
                data: data,
                name: name, 
                founder: founder
            })
            res.render("showStartUp")
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    // delete
    static async delShowStartUp(req, res){
        try {
            const {strartupId} = req.params // ini ada dua
            // console.log(incubatorId, strartupId);
            const data = await Startup.findOne({
                attributes: ['startUpName', 'founderName'],
                where: {
                    id: strartupId
                }
            })

            await Startup.destroy({
                where: {
                    id: strartupId
                }
            })

            res.redirect(`/startup?name=${data.startUpName}&founder=${data.founderName}`)
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
    
}

// 1698129014507
// 1698129014507

module.exports = Controllers