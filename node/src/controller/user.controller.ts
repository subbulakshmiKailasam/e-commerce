import { providerHelper } from "../../provider.helper";
import { usermodel, validate } from "../models/user.models";
import { IUser } from "../types/user.types";
import httpStatus from "http-status";
import { messageConfig } from "../../api.message.config";
import bcrypt from "bcrypt";
import { jwt } from "jsonwebtoken";

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
      return res.status(httpStatus.NOT_FOUND).send(error.details[0].message);
    }
    usermodel
      .find(query)
      .then((response) => {
        if (response.length > 0) {
          res.status(httpStatus.CONFLICT);
          res.json({
            message: messageConfig.user.alreadyExists,
          });
        } else {
          var newResponse = createResponse(modelInfo);
          usermodel
            .create(newResponse)
            .then((response) => {
              res.status(httpStatus.CREATED);
              res.json({
                message: messageConfig.user.savemessage,
              });
            })
            .catch((err) => {
              return next(err);
            });
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
          const token = jwt.sign({ userId: user._id }, "E_COMMERCE", {
            expiresIn: "1h",
          });
          const passwordMatch = await bcrypt.compare(
            modelInfo.password,
            user.password
          );
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
