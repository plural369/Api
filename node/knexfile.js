module.exports = {
  client: "mysql",
  connection:
  process.env.DB_URL || 
  process.env.JAWSDB_MARIA_URL || 
  /*"mysql://lew33xik942af7e7:pih53jbwxjf6befi@dt3bgg3gu6nqye5f.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/fzn4jx3jifyqu0ml"*/
  "mysql://root@127.0.0.1:3306/teste-node?reconnect=true",
  dateStrings: true,
  timezone: "UTC-3",
};