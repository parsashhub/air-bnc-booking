const express = require("express");
const Joi = require("joi");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { body } = req;
  console.log(body);
  // const { error } = validate(body);
  // if (error) return res.status(400).send(error.details[0].message);
  //
  // const { email, password } = body;
  // let user = await User.findOne({ email });
  // if (!user) return res.status(400).send("invalid email or password");
  //
  // const validPsw = await bcrypt.compare(password, user.password);
  // if (!validPsw) return res.status(400).send("invalid email or password");
  //
  // const token = user.generateAuthToken();
  // res.send(token);
});

function validate(req) {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(255).required(),
    username: Joi.string().min(10).max(255).required(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
