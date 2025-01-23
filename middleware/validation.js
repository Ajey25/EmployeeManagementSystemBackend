export const validateEmployee = (req, res, next) => {
  const { firstName, lastName, email, phoneNo, position, salary, department } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNo ||
    !position ||
    !salary ||
    !department
  ) {
    return res.status(400).send("All fields are required");
  }
  next();
};
