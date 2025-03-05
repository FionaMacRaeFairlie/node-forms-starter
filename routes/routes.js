const express = require("express");
const router = express.Router();

const { check, validationResult, matchedData } = require("express-validator");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.post(
  "/contact",
  [
    check("message")
      .isLength({ min: 10 })
      .withMessage("Message must be 10 characters long")
      .trim(),
    check("email")
      .isEmail()
      .withMessage("That email doesn‘t look right")
      .bail()
      .trim()
      .normalizeEmail(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
      res.render("contact", {
        data: req.body,
        errors: errors.mapped(),
      });
    }

    const data = matchedData(req);
    console.log("Sanitized:", data);
    if (errors.isEmpty()) {
      res.redirect("/");
    }
  }
);

module.exports = router;
