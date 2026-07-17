import validator from "validator";
import { DEFAULT_COUNTRY } from "../constants/app.constants.js";
import ApiError from "../utils/ApiError.js";

/* 
Validate Mobile Number Validators

> As the reason we create a middleware for that as it can be used at mulitple places where we are sending our contacNumber in req
> So instead of again writing same logic everywhere it better to use a middleware , 
> so now in api endpt where we send contactNumber there we use this middleware befor our final controller

> Task :
> Retrieve contactNumber from req
> after trim check if present , if not throw error
> now validate is it correct indian mobile number or not
> if not throw error
> if all are correct return mobile number .

> in use 
> where you want to get contactNumber 
> const mobile = validateMobileNumber(contactNumber); use it like this 

*/

const validateMobileNumber = (contactNumber) => {
  const mobile = contactNumber?.trim();

  if (!mobile) {
    throw new ApiError(400, "Mobile number is required");
  }

  if (!validator.isMobilePhone(mobile, DEFAULT_COUNTRY)) {
    throw new ApiError(400, "Please enter a valid Indian mobile number");
  }

  return mobile;
};

export default validateMobileNumber;
