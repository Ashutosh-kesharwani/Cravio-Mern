import mongoose from "mongoose"
import bcrypt from "bcrypt"
const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,"username is required"],
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim:true,
        lowercase:true,
        // match:
    },
    password:{
        type:String,
        required:[true,"password is required"],
        trim:true,
    },
    refreshToken:{
        type:String,
        default:null,
    }
},{timestamps:true, strictModeQuery: "throw"}); 


// bcrypt function
userSchema.pre("save",async function (next){
    try{
        // check  is password  field is modified or not
        if(! this.isModified("password")) return next();
        // if modified , update password
        this.password = await bcrypt.hash(this.password,10);
    }catch(error){
        next(error);
    }
})

// Createv compare password func
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}


// Token generation
userSchema.methods.generateAccessToken = function(){
    jwt.sign({

    },
    
)
}

userSchema.methods.generateRefreshToken = function(){

}

const User = mongoose.model("User",userSchema);
export default User;