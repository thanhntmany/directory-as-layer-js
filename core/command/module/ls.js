'use strict';


// @@ Export
exports.exec = function(payload, app) {
  console.log("Running a LS command");
  app.base.stack.layers.forEach(element => {
    console.log(element)
  });
};
