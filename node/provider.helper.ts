import Promise from "bluebird";

var join = Promise.join;

export const providerHelper = {
  save: (newModelData) => {
    return new Promise(function (resolve, reject) {
      return newModelData.save(function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  },
  findOne: (Model, queryOpts, documentFields) => {
    return Model.findOneAsync(queryOpts, documentFields);
  },

  checkForDuplicateEntry: (Model, queryOpts) => {
    return Model.count(queryOpts).execAsync();
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
