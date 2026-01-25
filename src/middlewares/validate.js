const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body ?? req.query, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });
 
  if (error) return next(error);
  req.validated = value;
  next();
};
 
export default validate;