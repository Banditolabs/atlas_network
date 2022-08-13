///////////////////////////////////////
// Dependencies
///////////////////////////////////////
const Mission = require("../models/mission")

///////////////////////////////////////
// Action
///////////////////////////////////////
const actions = {}

// INDEX
actions.index =  async (req, res) => {
    await Mission.find({}, (err, allMissions) => {
        console.log(err)
        res.render('index.ejs', {missions: allMissions})
    })}

// NEW
actions.new = (req,res) => {
    res.render("new.ejs")
}

// CREATE
actions.create = (req,res) => {
    req.body.stealth_requirement = !!req.body.stealth_requirement
    let newMission = {
        target: req.body.target,
        description: req.body.description,
        image: req.body.image,
        status: req.body.status,
        location: req.body.location,
        payout: req.body.payout,
        informants: [req.body.informants],
        weapons: [req.body.weapons],
        stealth_requirement: req.body.stealth_requirement
    }
    Mission.create(newMission, (err, newMission) => {
        if (err) {
            console.log(err)
            res.send(err)
        }else {
            res.redirect("/missions")
        }
    })
}

// SHOW
actions.show = async (req,res) => {
    await Mission.findById(req.params.id, (err, mission) => {
        res.render("show.ejs", {mission})
    })
}

// EDIT
actions.edit = async (req,res) => {
    await Mission.findById(req.params.id, (err, mission) => {
        res.render("edit.ejs", {mission})
    })
}
// UPDATE
actions.update = async (req,res) => {
    let updatedMission = {
        target: req.body.target,
        description: req.body.description,
        image: req.body.image,
        status: req.body.status,
        location: req.body.location,
        payout: req.body.payout,
        informants: [req.body.informants],
        weapons: [req.body.weapons],
        stealth_requirement: req.body.stealth_requirement,
        completed: req.body.completed
    }
    console.log(req.body)
    // secondary


    // Object.assign(req.params.id, updatedMission) 
    //     res.redirect(`/missions/${req.params.id}`)
    //     doc.save((err) => {
    //         if (err) {
    //             res.send (err)
    //         }
    //     })

    // Look up by Id
    // Edit it with the stuff but only the valid inputs from req.body
    // FindByIDAndUpdate will only replace the limited scope of items
    await Mission.findByIdAndUpdate(req.params.id, req.body, { new: true, overwrite: true }, (err) => {
        console.log(err)
        res.redirect(`/missions/${req.params.id}`)
    })
}
// DELETE
actions.delete =  (req,res) => {
     Mission.findByIdAndDelete (req.params.id, (err,deletedMission) => {
        console.log(err)
        res.redirect("/missions")
    }) 
}
// SEED
actions.seed = async (req,res) => {
    await Mission.remove({})
    const mission = await Mission.create([
        {
            target: "Lord Timmy",
            description: "Assassination",
            image: "/public/assets/brand_image.png",
            status: "Unaccepted",
            location: "Tel Aviv",
            payout: 100000,
            informants: ["Sam","George"],
            weapons:["poision"],
            stealth_requirement: true,
            completed: false
        }
    ]).catch((err) => res.send(err))
    res.json(mission)
}


// actions.update =

/////////////////////////////////////////
// export the actions object
/////////////////////////////////////////
module.exports = actions