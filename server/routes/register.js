const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res, next) => {
  try {
    const register = await User.find();
  } catch (error) {
    res.status(500).send("Error: " + error.message);

    winston.error(error.message);
  }
});

router.post("/", async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string().min(5),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists...");

  const {
    firstName,
    lastName,
    email,
    password,
    address,
    city,
    state,
    zipCode,
  } = req.body;

  user = new User({
    firstName,
    lastName,
    email,
    password,
    address,
    city,
    state,
    zipCode,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const jwtSecretKey = process.env.TODO_APP_JWT_SECRET_KEY;
  const token = jwt.sign(
    { _id: user._id, firstName: user.firstName, email: user.email },
    jwtSecretKey
  );

  res.send(token);
});

router.put("/:id", auth, async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zipCode: Joi.string().min(5),
  });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(result.error.details[0].message);

  const register = await User.findById(req.params.id);

  if (!register) return res.status(404).send("User not found...");

  if (register.email !== req.user._id)
    return res.status(401).send("User update failed. Not authorized...");

  const {
    firstName,
    lastName,
    email,
    password,
    address,
    city,
    state,
    zipCode,
  } = req.body;

  const updatedRegister = await User.findByIdAndUpdate(
    req.params.id,
    { firstName, lastName, email, password, address, city, state, zipCode },
    { new: true }
  );

  res.send(updatedRegister);
});

router.delete("/:id", auth, async (req, res) => {
  const register = await User.findById(req.params.id);

  if (!register) return res.status(404).send("User not found...");

  if (register.email !== req.user._id)
    return res.status(401).send("User deletion failed. Not authorized...");

  const deletedUser = await User.findByIdAndDelete(req.params.id);

  res.send(deletedUser);
});

module.exports = router;
