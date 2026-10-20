const fs = require('fs');
const path = require('path');

const getUsers = async () => {
  const filePath = path.join(__dirname, '..', 'data', 'users.json');

  const data = await fs.promises.readFile(filePath, 'utf8');

  return JSON.parse(data);
};

module.exports = { getUsers };
