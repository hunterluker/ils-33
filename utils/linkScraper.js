const request = require('request');
const cheerio = require('cheerio');
const chalk = require('chalk');
const ora = require('ora');

// Start loader
const spinner = ora('Scraping internal links...').start();

setTimeout(() => {
  spinner.color = 'cyan';
  spinner.text = 'Scraping internal links...';
}, 5000);

// Make a request to the domain
request('http://books.toscrape.com/', (error, response, html) => {
  // Check for errors and ok status code
  if (!error && response.statusCode === 200) {
    // Stop spinner
    spinner.stop();

    // Grab html of domain with cheerio
    const $ = cheerio.load(html);

    // Check for links
    const numLinks = $('a').length;
    if (numLinks === 0) {
      console.log(chalk.red('No links found. Try another domain.'));
    }

    // Log every link found
    $('a').each((i, a) => {
      const link = $(a).attr('href');

      console.log(chalk.cyan(`${link}`));
    });
  }
});
