import express from "express";
import { userModule } from "../controller/user.controller";

const app = express();
export const userrouter = express.Router();
/**
 * @openapi
 * '/user/createUser':
 *  post:
 *     tags:
 *     - User
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:  
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *              - phoneno
 *            properties:
 *              username:
 *                type: string
 *                example: "user1"
 *              email:
 *                type: string
 *                example: 'user@gmail.com'
 *              password:
 *                type: string
 *                example: "password@1233"
 *              phoneno:
 *                type: string
 *                example: "12121212121"
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 */
userrouter.post("/createUser", function (req, res, next) {
  userModule.createUser(req, res, next);
});

userrouter.get("/loginUser", function (req, res, next) {
  console.log(req.body);
  userModule.loginUser(req, res, next);
});
