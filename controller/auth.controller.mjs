import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../model/user.model.mjs";

/***** CHECK USER ALREADY EXIST ******/
const is_user_exists = async (email) => {
  const user = await UserModel.findOne({ email: email });
  return user;
};

/***** GENERATE JWT TOKEN ******/
const generate_jwt = (user) => {
  const payload = {
    fullname: user.fullname,
    email: user.email,
    uid: user._id,
  };

  const token = jwt.sign(payload, process.env.JWT_PASSWORD, {expiresIn: '1d'})
  return token
};

/**************************** USER SIGNIN ****************************/
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    
    /* CHECK USER */
    const user = await is_user_exists(email)

    if(!user) {
      return res.status(404).json({
        success: false, 
        message: "User not found!"
      })
    }

    /* CHECK PASSWORD */
    const is_match_password = await bcrypt.compare(password, user.password)
    
    if(!is_match_password) {
      return res.status(400).json({
        success: false, 
        message: "Invalid email or password."
      })
    }

    /* GENERATE TOKEN */
    const token = generate_jwt(user)
    
    /* SUCCESS LOGIN */
    return res.status(200).json({
      success: true,
      token: token
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**************************** USER SIGNUP ****************************/
export const signup = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    /***** USER EXISTS RETURN ERROR RESPONSE ******/
    const user = await is_user_exists(email);

    if (user)
      return res.status(409).json({
        success: false,
        message: "User already exists with this email."
      });

    /***** USER NOT EXISTS SAVE USER DATA ******/
    const new_user = new UserModel({
      fullname,
      email,
      password
    });
    await new_user.save();

    const token = generate_jwt(new_user);

    /***** SEND SUCCESS RESPONSE ******/
    return res.status(200).json({
      success: true,
      message: "User registered successfully.",
      token: token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
