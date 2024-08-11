import { providerHelper } from "../../provider.helper";
import { usermodel } from "../models/user.models";
import { IUser } from "../types/user.types";
import httpStatus from "http-status";
import Promise from "bluebird";
import { messageConfig } from "../../api.message.config";

function createResponse(response) {
  var newResponse = new usermodel();
  newResponse.username = response.username;
  newResponse.password = response.password;
  newResponse.email = response.email;
  newResponse.phoneno = response.phoneno;
  return newResponse;
}

export const userModule = {
  createUser: (req, res, next) => {
    console.log("test");
    var query: any = {};
    var modelInfo = providerHelper.sanitizeUserInput(req, next) as IUser;
    query.email = modelInfo.email;
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
              console.log("test2", newResponse);
              res.status(httpStatus.OK);
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
    query.password = modelInfo.password;
    return usermodel.find(query)
      .then((response) => {
        if (response.length > 0) {
          res.status(httpStatus.OK);
          res.json({
            success: true,
            result: response[0],
          });
        } else {
          res.status(httpStatus.OK);
          res.json({
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
