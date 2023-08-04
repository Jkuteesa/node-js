const express = require("express");
const Employee = require("../models/employeeModel");
const router = express.Router();

router.get("/employeeform", (req, res) => {
    res.render("employee.pug")
})

router.post("/regemployee",async (req, res) => {
    try{
        const employee = new Employee(req.body);
        await employee.save();
        console.log(req.body);
        res.redirect("/api/employeeform") //it gives the page we want it to redirect to.
        
    }
    catch(error){
        res.status(400).render("employee.pug");
        console.log(error);
    }

})
// for reading data from dabase
    router.get("/list", async(req, res) =>{
        try{
            let items = await Employee.find();
            let ages = await Employee.aggregate([
               {"$group": {_id: "$all",
            totalAge: {$sum: "$age"},
        }}
            // let ages = group{totalAge{sum}}

            ])

            res.render("employeelist.pug",
             {employees:items, empAges:ages[0].totalAge, });
        }
        catch(error){
            console.log(error);
            return res.status(400).send({message: "apologies, could not retrieve employees"});
           
        }
    })

// when deleting an employee from the database.
router.post("/employee/delete", async (req, res)=>{
    try{
        await Employee.deleteOne({_id: req.body.id});
        res.redirect("back");
    }
    catch(error){
        res.status(400).send("unable to delete item from the database");
    }
})    


// how to update data.
// editing data
router.get("/employee/edit/:id", async(req, res)=>{
    try{
        const emp = await Employee.findOne({
            _id:req.params.id
        })
        res.render("editemployee", {employee:emp});
    }
    catch(error){
        res.status(400).send("Could not find employee in database.");
        console.log(error)
    }
})

// how to edit employee data
// then later we post the newly edited data
router.post("/employee/edit", async (req, res) => {
    try{
        await Employee.findOneAndUpdate({_id: req.query.id},req.body);
        res.redirect("/api/list")
    }catch(error){
        res.status(400).send("Could not edit employee data.")
        console.log(error);
    }
})



module.exports = router;