// import swaggerJsdoc from 'swagger-jsdoc'
// import swaggerUi from 'swagger-ui-express'
// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Mini Blog API',
//       description: "API endpoints for a mini blog services documented on swagger",
//       contact: {
//         name: "Subbulaskhmi",
//         email: "subbukeerthi96@gmail.com",
//         url: ""
//       },
//       version: '1.0.0',
//     },
//     servers: [
//       {
//         url: "http://localhost:3000/",
//         description: "Local server"
//       },
//       {
//         url: "<your live url here>",
//         description: "Live server"
//       },
//     ]
//   },
//   "tags": [
//     {
//       "name": "Users",
//       "description": "Everything about users"
//     }
//   ],
//   // looks for configuration in specified directories
//   apis: ['./src/routes/*.ts'],
//   "paths": {
//     "/users/register": {
//       "post": {
//         "tags": ["Users"],
//         "summary": "User register",
//         "description": "Register a new user",
//         "requestBody": {
//           "required": true,
//           "content": {
//             "application/json": {
//               "schema": {
//                 "$ref": "#/components/schemas/UserSchema"
//               }
//             }
//           }
//         },
//         "responses": {
//           "200": {
//             "description": "User registered successfully",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "type": "object",
//                   "allOf": [
//                     {
//                       "$ref": "#/components/schemas/UserSchema"
//                     },
//                     {
//                       "type": "object",
//                       "properties": {
//                         "id": {
//                           "type": "string",
//                           "example": "66b84a7e311cbda81df90f68"
//                         }
//                       },
//                       "required": ["id"]
//                     }
//                   ]
//                 }
//               }
//             }
//           },
//           "400": {
//             "description": "Invalid request data"
//           }
//         }
//       }
//     },
//     "/users/login": {
//       "post": {
//         "tags": ["Users"],
//         "summary": "User login",
//         "description": "Authenticate a user",
//         "requestBody": {
//           "required": true,
//           "content": {
//             "application/json": {
//               "schema": {
//                 "type": "object",
//                 "properties": {
//                   "email": {
//                     "type": "string",
//                     "description": "User email",
//                     "example": "user@example.com"
//                   },
//                   "password": {
//                     "type": "string",
//                     "description": "User password",
//                     "example": "Password@123"
//                   }
//                 },
//                 "required": ["email", "password"]
//               }
//             }
//           }
//         },
//         "responses": {
//           "200": {
//             "description": "Login successfully",
//             "content": {
//               "application/json": {
//                 "schema": {
//                   "type": "object",
//                   "properties": {
//                     "message": {
//                       "type": "string"
//                     },
//                     "token": {
//                       "type": "string",
//                       "description": "Authentication token"
//                     },
//                     "username": {
//                       "type": "string",
//                       "description": "User name"
//                     }
//                   }
//                 }
//               }
//             }
//           },
//           "400": {
//             "description": "Please check input data"
//           },
//           "500": {
//             "description": "Internal Server Error"
//           }
//         }
//       }
//     },
//     "/users/logout": {
//       "post": {
//         "tags": ["Users"],
//         "summary": "User logout",
//         "description": "Logout a user by invalidating the provided token.",
//         "security": [
//           {
//             "bearerAuth": []
//           }
//         ],
//         "responses": {
//           "200": {
//             "description": "Logged out successfully"
//           },
//           "400": {
//             "description": "No token provided"
//           }
//         }
//       }
//     }
//   },
//   "components": {
//     "schemas": {
//       "UserSchema": {
//         "type": "object",
//         "properties": {
//           "username": {
//             "type": "string",
//             "description": "User name",
//             "example": "Test"
//           },
//           "email": {
//             "type": "string",
//             "description": "User email",
//             "example": "user@example.com"
//           },
//           "password": {
//             "type": "string",
//             "description": "User password",
//             "example": "Password@123"
//           },
//           "phone": {
//             "type": "string",
//             "description": "User phone number",
//             "example": "9551766353"
//           }
//         },
//         "required": ["username", "email", "password", "phone"]
//       }
//     },
//     "securitySchemes": {
//       "bearerAuth": {
//         "type": "http",
//         "scheme": "bearer",
//         "bearerFormat": "JWT"
//       }
//     }
//   }
// }
// const swaggerSpec = swaggerJsdoc(options)
// function swaggerDocs(app, port) {
//   app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
//   // Documentation in JSON format
//   app.get('/docs.json', (req, res) => {
//     res.setHeader('Content-Type', 'application/json')
//     res.send(swaggerSpec)
//   })
// }
// export default swaggerDocs