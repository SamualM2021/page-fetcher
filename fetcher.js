const needle  = require('needle');
const fs = require('fs');

const fetchArguments = process.argv.slice(2);
const website = fetchArguments[0];
const filePath = fetchArguments[1];
console.log(`Downloading from ${website} to the specific filepath...`);

/**
 * Fetches content from a website and returns its content to the callback
 * @param {the callback to give page content to} callback
 */
const fetchPage = function(callback) {
  needle.get(website, function(error, response) {
    if (!error && response.statusCode === 200) {
      console.log('Writing to File...');
      fs.writeFile(filePath, response.body, (error, data) => {
        if (!error) {
          return callback(data);
        } else {
          console.log(`Error writing to file ${error}`);
        }
      });
    } else {
      console.log(`${website} is an invalid website: Received: `);
      console.log("body:", response && response.body);
      console.log("statusCode:", response && response.statusCode);
      console.log("error", error);
    }
  });
};

/**
 * After the file has finished writing we do another asynchronous function to
 * read it and print how much data was saved to their filepath
 */
const printDownloadMessage = function() {
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (!error) {
      console.log(`Downloaded and saved ${data.length} bytes to ${filePath}`);
    }
  });

};

fetchPage(printDownloadMessage);
