'use strict';


// @@ Export
exports.exec = function(payload, app) {
  console.log("Running a LS command");
  app.data.stack.forEach(element => {
    console.log(element)
  });
};
