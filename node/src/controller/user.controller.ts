import { providerHelper } from "../../provider.helper";
import { usermodel, validate } from "../models/user.models";
import { IUser } from "../types/user.types";
import httpStatus from "http-status";
import { messageConfig } from "../../api.message.config";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

async function createResponse(response) {
  var newResponse = new usermodel();
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(response.password, salt);
  newResponse.username = response.username;
  newResponse.password = password;
  newResponse.email = response.email;
  newResponse.phoneno = response.phoneno;
  return newResponse;
}

export const userModule = {
  createUser: (req, res, next) => {
    var query: any = {};
    var modelInfo = providerHelper.sanitizeUserInput(req, next) as IUser;
    query.email = modelInfo.email;
    const { error } = validate(req.body);
    if (error) {
      res.status(httpStatus.NOT_FOUND);
      res.json({
        message: error.details[0].message,
      });
      ;
    }
    console.log(query)
    usermodel
      .find(query)
      .then(async (response) => {
        console.log(response)
        if (response.length > 0) {
          res.status(httpStatus.CONFLICT);
          res.json({
            message: messageConfig.user.alreadyExists,
          });
        } else {
          // var newResponse = await createResponse(modelInfo);
          // console.log("newResponse", newResponse.toString())

          // usermodel
          //   .create(newResponse)
          //   .then((response) => {

          //     res.status(httpStatus.CREATED);
          //     res.json({
          //       message: messageConfig.user.savemessage,
          //     });
          //   })
          //   .catch((err) => {
          //     console.log("err")
          //     return next(err);
          //   });
          try {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            const user = new usermodel({
              username: req.body.username,
              email: req.body.email,
              password: password,
              phoneno: req.body.phoneno

            })
            await user.save()
            res.status(httpStatus.CREATED);
            res.json({
              message: messageConfig.user.savemessage,
              result: user
            });
          }
          catch (err) {
            return next(err);
          }
        }
      })
      .catch((err) => {

        return next(err);
      });
  },
  loginUser: (req, res, next) => {
    var query: any = {};
    var modelInfo = providerHelper.sanitizeUserInput(req, next) as IUser;
    query.email = modelInfo.email;
    return usermodel
      .findOne(query)
      .then(async (user) => {
        if (user) {
          console.log(user._id, "user_id")
          const token = jwt.sign({ userId: user._id }, "E_COMMERCE", {
            expiresIn: "1h",
          });
          console.log(user.password, "password")

          const passwordMatch = await bcrypt.compare(
            modelInfo.password,
            user.password
          );
          console.log(passwordMatch, "passwordMatch")

          if (!passwordMatch) {
            return res.status(httpStatus.UNAUTHORIZED).json({
              success: false,
              message: messageConfig.user.invalideUser,
            });
          }
          res.status(httpStatus.OK);
          res.json({
            success: true,
            result: user[0],
            token: token,
          });
        } else {
          return res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: messageConfig.user.invalideUser,
          });
        }
      })
      .catch((err) => {
        return next(err);
      });
  },
};
