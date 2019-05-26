const program = require('commander');
const { prompt } = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const linkScraper = require('../utils/linkScraper');

console.clear();
console.log(
  chalk.green(
    figlet.textSync('ILS-33', {
      horizontalLayout: 'default',
      verticalLayout: 'default'
    })
  )
);
console.log(
  chalk.white(
    'ILS-33 is a command line tool used to scrape all internal links of a website.'
  )
);
console.log(chalk.white('Created by Hunter Luker'));

// Questions
const questions = [
  {
    type: 'input',
    name: 'domain',
    message: 'Enter a domain to scrape'
  }
];

program.version('1.0.0', '-v, --version').description('Internal Link Scraper');

program
  .command('run')
  .alias('r')
  .description('Scrape all internal links of an entered domain')
  .action(() => {
    prompt(questions).then(answers => {
      linkScraper(answers.domain);
    });
  });

program.parse(process.argv);
