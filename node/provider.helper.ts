import Promise from "bluebird";
import { usermodel } from "./src/models/user.models";

var join = Promise.join;

export const providerHelper = {
  save: (newModelData) => {
    return new Promise(function (resolve, reject) {
      return newModelData.create(function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  findOne: (Model, queryOpts, documentFields) => {
    return Model.findOne(queryOpts, documentFields);
  },

  checkForDuplicateEntry: (Model, queryOpts) => {
    return Model.estimatedDocumentCount(queryOpts);
  },
  sanitizeUserInput: (req, next) => {
    try {
      var modelInfo = {};

      for (var i = 0, keys = Object.keys(req.body); i < keys.length; i++) {
        modelInfo[keys[i]] = req.body[keys[i]];
      }
      return modelInfo;
    } catch (err) {
      // return  next(err);
    }
  },
};
