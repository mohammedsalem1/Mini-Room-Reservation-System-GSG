import { userValidationSchema } from "src/modules/user/utils/user.validation.schema";

export const registerValidationSchema = userValidationSchema
export const loginValidationSchema = userValidationSchema.pick({
    userEmail:true , 
    userPassword:true
})
