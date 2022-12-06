'use strict';
const path = require('path');
const AppCli = require('./core/app-cli/app-cli');
const JSONio = require('./core/helper/json-io')


// console.dir(appCli, {"depth": null});

// console.clear();
// console.log("Directory As Layer JS ©Thanhnt.many");
// console.log("\nStack:")
// console.log(" 3 - source-code")
// console.log(" 2 - build-instraction")
// console.log(" 1 - production")
// console.log(" 0 - base")
// console.log("\nTree view: ~/lab/astraiers-ecosystem/astraiers-server-core-ubuntu/")
// console.log("   0   1   2   3          │");
// console.log("  ↴  |   |   |   |    1   ├─ dir1/");
// console.log("   * |   |   |   |    2   │  ├─ asdasd ");
// console.log("   * |   |   |   |    3   │  ├─ asdasd ");
// console.log("   * |   |   |   |    4   │  └─ asdasd ");
// console.log("     |   |↴  |↴  |    5   ├─ dir2/");
// console.log("     |   |↴  |↴  |    6   │  └─ dir1/");
// console.log("     |   | * |   |    7   │     ├─ asdasd ");
// console.log("     |   | * | * |    8   │     ├─ asdasd ");
// console.log("     |   | * |   |    9   │     └─ asdasd ");
// console.log("  ↴  |↴  |   |↴  |   10   ├─ dir1/");
// console.log("  <N>| * |   | * |   11   │  ├─ asdasd ");
// console.log("  <N>| * |   | * |   12   │  ├─ asdasd ");
// console.log("   * |<N>|   | * |   13   │  └─ asdasd ");
// console.log("  ↴  |   |   |↴  |   14   └─ dir1/");
// console.log("   * |   |   | * |   15      ├─ asdasd ");
// console.log("   * |   |   | * |   16      ├─ asdasd ");
// console.log("  <N>|   |   | * |   17      └─ asdasd ");
// console.log("");

const appCli = AppCli.exec(process.argv.slice(2));

console.dir(appCli.cliData, {"depth": null});
