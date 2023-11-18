const {Employees} = require("../models/index")
const { Op } = require("sequelize");

class Controllers { 
    static async home(req, res){
        try {
            // filter
            const {name ,position ,degree} = req.query

            let query = {}
            if(name){
                query = {
                    order:[
                        [name, "ASC"]
                    ]
                };
            }
            if(position){
                query = {
                    order:[
                        [position, "ASC"]
                    ]
                };
            }
            if(degree){
                query = {
                    where: {
                        education: degree
                    }
                };
            }
            
            const data = await Employees.findAll(query); // dapet dari model bagian "modelName: 'Employees',"
            console.log(data);

            res.render("home", {
                data: data
            })
        } catch (error) {
            res.send(error)
        }
    }

    static async formAdd(req, res){
        try {
            const data = await Employees.findAll(); // dapet dari model bagian "modelName: 'Employees',"
            // console.log(data);

            res.render("add", {
                data: data
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async postAdd(req, res){
        try {
            const {name, position, education, email, phone_number, profile_picture, age} = req.body

            await Employees.create({ name: name, position: position, education: education, email: email, phone_number: phone_number, profile_picture: profile_picture, age: age });

            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }

    static async formEdit(req, res){
        try {
            const {id} = req.params
            const data = await Employees.findAll({
                where: {
                    id:{
                    [Op.eq]: id 
                    }
                }
            })
            console.log(data);

            res.render("edit", {
                data: data[0]
            })
        } catch (error) {
            res.send(error)
        }
    }
    static async postEdit(req, res){
        try {
            const {id} = req.params
            const {name, position, education, email, phone_number, profile_picture, age} = req.body

            await Employees.update(
                { 
                    name: name,
                    position:position,
                    education: education,
                    email: email,
                    phone_number: phone_number,
                    profile_picture: profile_picture,
                    age: age,
                }, 
                {
                where: {
                  id: id,
                },
                });
            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }

    // delete
    static async delete(req, res){
        try {
            const {id} = req.params
            Employees.destroy({
            where: {
                id: {
                [Op.eq]: id
                }
            }
            });

            res.redirect("/")
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = Controllers
