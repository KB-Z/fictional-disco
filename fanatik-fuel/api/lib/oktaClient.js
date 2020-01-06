const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: 'https://dev-732359.okta.com',
  token: '00jTdEtP8LaKW9ehVwW8OT86HvKUU-Tgmsz8uNkBKj'
});

module.exports = client;
