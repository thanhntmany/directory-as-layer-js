const main = require("../mainApp");


main.initAsync("./dal.json", app => {
  console.dir(app, {"showHidden": true, "depth":null})
});
