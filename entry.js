const fs = require("fs");
const chalk = require("chalk");

const addEntry = (_title, _body) => {
  const entries = loadEntries();
  const duplicateEntry = entries.find(entry => entry.title === _title);
  if (!duplicateEntry) {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    entries.push({
      title: _title,
      body: _body,
      date: `${day}/${month}/${year}`
    });
    saveEntries(entries);
    console.log(chalk.bold.bgBlue.white("Entry Added!"));
  } else {
    console.log(chalk.bold.bgRed.white("Title Already Taken!"));
    console.log(chalk.bold.bgGreen.white("Use list command to view all options."));
  }
};

const loadEntries = () => {
  try {
    const dataBuffer = fs.readFileSync("entries.json");
    const dataString = dataBuffer.toString();
    return JSON.parse(dataString);
  } catch (e) {
    return [];
  }
};

const saveEntries = notes => {
  const data = JSON.stringify(notes);
  fs.writeFileSync("entries.json", data);
};

const removeEntry = title => {
  const entries = loadEntries();
  const updatedEntries = entries.filter(entry => entry.title !== title);
  if (entries.length !== updatedEntries.length) {
    saveEntries(updatedEntries);
    console.log(
      chalk.bold.bgBlue.white(`Entry with the title ${title} is removed!`)
    );
  } else {
    console.log(chalk.bold.bgRed.white("No Such Entry!"));
    console.log(chalk.bold.bgGreen.white("Use list command to view all options."));
  }
};

const readEntry = _title => {
  const entries = loadEntries();
  const searchedEntry = entries.find(entry => entry.title === _title);
  if (!searchedEntry) {
    console.log(chalk.bold.bgRed.white("No Such Entry!"));
    console.log(chalk.bold.bgGreen.white("Use list command to view all options."));
  } else {
    console.log(
      chalk.bgBlue.white.bold("Title: ") +
        chalk.italic(`${searchedEntry.title}`)
    );

    console.log(
      chalk.bgBlue.white.bold("Noted On: ") +
        chalk.italic(`${searchedEntry.date}`)
    );

    console.log(
      chalk.bgBlue.white.bold("Body: ") +
        chalk.italic(`${searchedEntry.body}`)
    );
    
  }
};

const listEntries = () => {
  const entries = loadEntries();

  if (entries.length == 0) {
    console.log(chalk.bgRed.white.bold("No Entries Yet!"));
    console.log(chalk.bold.bgGreen.white("Use Option --help to view all options."));
    return;
  }
  console.log(chalk.bgBlue.white.bold("Your Entries:"));
  entries.forEach(entry => {
    console.log(`${entry.title}`);
  });
};

module.exports = {
  addEntry: addEntry,
  removeEntry: removeEntry,
  listEntries: listEntries,
  readEntry: readEntry
};
