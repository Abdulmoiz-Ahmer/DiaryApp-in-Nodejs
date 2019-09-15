const entries = require("./entry.js");

const yargs = require("yargs");

yargs.command({
  command: "add",
  describe: "Adding Entry",
  builder: {
    title: {
      describe: "Entry Title",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Entry Body",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    entries.addEntry(argv.title, argv.body);
  }
});

yargs.command({
  command: "remove",
  describe: "Removing Entry",
  builder: {
    title: {
      describe: "Entry Title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    entries.removeEntry(argv.title);
  }
});

yargs.command({
  command: "read",
  describe: "Reading Entry",
  builder: {
    title: {
      describe: "Entry Title",
      demandOption: true,
      type: "string"
    }
  },
  handler: argv => {
    entries.readEntry(argv.title);
  }
});

yargs.command({
  command: "list",
  describe: "Listing Entry",
  handler: () => {
    entries.listEntries();
  }
});
yargs.parse();
