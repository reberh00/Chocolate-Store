import joi from "joi";

const validate = (section) => (objSchema) => {
  const validationSchema = joi.object(objSchema);

  return async (req, res, next) => {
    try {
      await validationSchema.validateAsync(req[section]);
      return next();
    } catch (err) {
      return res.json(err.message);
    }
  };
};

export default {
  body: validate("body"),
  params: validate("params"),
};
