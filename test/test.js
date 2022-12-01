const main = require("../");


main.initAsync("dal.json", app => {
  console.log(app)
});
