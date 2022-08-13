const express = require('express')
const missionRouter = express.Router()
const MissionActions = require('./missionActions')
const Mission = require('../models/mission.js')

// SEED
missionRouter.get("/seed", MissionActions.seed)

// remember - INDUCES
// INDEX
missionRouter.get("/", MissionActions.index)
// NEW
missionRouter.get("/new", MissionActions.new)
// DESTROY
missionRouter.delete("/:id", MissionActions.delete)
// UDATE
missionRouter.put("/:id", MissionActions.update)
// CREATE
missionRouter.post("/", MissionActions.create)
// EDIT
missionRouter.get("/:id/edit", MissionActions.edit)
// SHOW
missionRouter.get("/:id", MissionActions.show)





// Complete task - CREATE page? No need for the mission at this time
// missionRouter.put("/:id", async (req, res) => {
//     // get the id param
//     const id = req.params.id
//     const mission = await Mission.findById (id)

//     mission.stealth_requirement = true
//     await mission.save()
//     res.redirect("/")
// })
// A fun turnary operator on class
// <li class="<%= todo.completed ? 'done' : null%>"><%= todo.text %>




module.exports = missionRouter