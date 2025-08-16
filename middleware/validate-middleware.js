const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    if (err.issues) {
      return res.status(400).json({
        status: 400,
        message: "Fill the input properly",
        extraDetails: err.issues.map((e) => e.message).join(", "),
      });
    }

    return res.status(422).json({
      status: 422,
      message: "Validation failed",
      extraDetails: err.message || "Unexpected validation error",
    });
  }
};

module.exports = validate;
