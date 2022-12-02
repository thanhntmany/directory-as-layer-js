const mainApp = require("../mainApp");


mainApp.initAsync("./dal.json", app => {
  console.dir(app, {"showHidden": true, "depth":null})
});
