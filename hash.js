const bcrypt = require("bcrypt");
const saltRounds = 10;
const str = "abcdPas";
let salt = "";

bcrypt.genSalt(saltRounds).then((salt) => {
  bcrypt
    .hash(str, salt)
    .then((hash) => bcrypt.compare(str, hash).then((res) => console.log(res)));
});

const henaCGItoken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDZjMTk4NmMzOTk3MjNlMDNhMGVmNyIsImlhdCI6MTY0ODgwNDI0OH0.rCDgfmRF9rY2NqzcDGC9DDuT6nJBqoihRbJ0MK5mA30";
const testUser =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDZjMWJjNmMzOTk3MjNlMDNhMGVmOSIsImlhdCI6MTY0ODgwNDI4NH0.LHSHT24qEN4zICHb9sbUZq3lL1w_0hkkEyEYS7RoXr8";
const temari =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDZjM2EzNWNkZjAzMTkxMDdlNmM5YSIsImlhdCI6MTY0ODgwNDc3MX0.QBsej_SRE0KzPrH6XgNyYF3kB-JNnyarC2o3oejBjkg";
