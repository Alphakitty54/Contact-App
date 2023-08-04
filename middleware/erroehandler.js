const { content } = require("../content.js");
const errorhandler = (err, req, res, next ) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch(statusCode){
    case content.VALIDATION_ERROR:
      res.json({
        title:"Validation Failed",
        message : err.message, 
        stackTrace: err.stack
      });
      break;
     case content.NOT_FOUND:
      res.json({
        title:"NOT FOUND",
        message : err.message, 
        stackTrace: err.stack
      });
    case content.UNAUTHORIZED:
      res.json({
        title:"UNAUTHORIZED",
        message : err.message, 
        stackTrace: err.stack
      });
    case content.FORBIDDEN:
      res.json({
        title:"FORBIDDEN",
        message : err.message, 
        stackTrace: err.stack
      });
    case content.SERVER_ERROR: 
      res.json({
        title:"SERVER ERRPE",
        message : err.message, 
        stackTrace: err.stack
      });
    default:
      console.log("No error");
      break;
  }
  res.json({});
};
module.exports=  errorhandler;