const waitSync = require("wait-sync");

var craigslist = require("node-craigslist"),
  client = new craigslist.Client({
    city: "seattle"
  });

client
  //.list()
  .search("xboxone")
  .then(listings => {
    listings.forEach(listing => {
      waitSync(1);
      console.log(listing.url);
      client.details(listing, function(err, result) {
        if (!result) {
          console.error(err.body);
        } else {
          console.log("result");
        }
      });
    });
    process.exit();
  })
  .catch(err => {
    console.error(err);
  });
