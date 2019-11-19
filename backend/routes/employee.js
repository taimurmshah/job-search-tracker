const express = require("express");
const auth = require("../middleware/auth");
const Job = require("../models/Job");
const Employee = require("../models/Employee");

const router = new express.Router();

//create employee
//requires job id
router.post("/jobs/:id/employees", auth, async (req, res) => {
  if (req.body.email !== undefined && req.body.email.length === 0) {
    delete req.body.email;
  }

  const employee = new Employee({ ...req.body, owner: req.params.id });

  try {
    await employee.save();
    res.send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get all employees for job
//requires job id
router.get("/jobs/:id/employees", auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res
        .status(400)
        .send({ message: "Please enter valid job parameters" });
    }

    await job
      .populate({
        path: "employees"
      })
      .execPopulate();

    res.send(job.employees);
  } catch (err) {
    res.status(400).send();
  }
});

//get employee by id
//requires job id
router.get("/jobs/:id/employees/:employee_id", auth, async (req, res) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.employee_id,
      owner: req.params.id
    });

    if (!employee) res.status(404).send();

    res.send(employee);
  } catch (err) {
    res.status(400).send(err);
  }
});

//update employee by id
//requires job id
router.patch("/jobs/:id/employees/:employee_id", auth, async (req, res) => {
  console.log("in the patch method");
  const updates = Object.keys(req.body);
  console.log({ updates });

  const allowedUpdates = ["response", "notes", "email"];

  for (let i = 0; i < updates.length; i++) {
    if (!allowedUpdates.includes(updates[i])) {
      return res.status(400).send({ error: "Invalid update parameters." });
    }
  }

  try {
    const employee = await Employee.findOne({
      _id: req.params.employee_id,
      owner: req.params.id
    });

    if (!employee) return res.status(404).send();

    updates.forEach(update => (employee[update] = req.body[update]));

    await employee.save();

    res.send(employee);
  } catch (err) {
    console.log({ err });
    res.status(400).send(err);
  }
});

//delete employee
//requires job id
router.delete("/jobs/:id/employees/:employee_id", auth, async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({
      _id: req.params.employee_id,
      owner: req.params.id
    });

    if (!employee) return res.status(400).send();

    res.send(employee);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
