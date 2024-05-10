const { body }= require ("express-validator");

 const validateSignup=[
 body('firstName').not().isEmpty().withMessage('First Name is required!'),
 body('lastName').not().isEmpty().withMessage('Last Name is required!'),
 body('email').not().isEmpty().withMessage(' Email is required!').isEmail().withMessage('Wrong email format!'),
 body('password').not().isEmpty().withMessage(' Password is required!').isLength({min:8}).withMessage('Password must be at least 8 charaters'),
 body('confirmPassword').not().isEmpty().withMessage('Confirm password is required!').isLength({min:8}).withMessage('Password must be at least 8 charaters'),
]
const validateLogin=[
 body('email').not().isEmpty().withMessage(' Email is required!').isEmail().withMessage('Wrong email format!'),
 body('password').not().isEmpty().withMessage(' Password is required!').isLength({min:8}).withMessage('Password must be at least 8 charaters'),
]
module.exports= {validateSignup,validateLogin}