const User = require("../Models/UserModel")
const bcrypt = require("bcryptjs");


export const getUser = async (email: string, password: string) => {
    try {
      const user = await User.findOne({ email: email });
 
      if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          
          return user;
          
        }
        throw new Error("Password is incorrect");
      }
      throw new Error("Email is incorrect");
    } catch (error) {
      throw error;
    }
  };
  
  export const getUsers = async () => {
    try {
      const user = await User.find();
      return user;
    } catch (error) {
      throw error;
    }
  };