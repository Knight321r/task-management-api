const fs = require('fs').promises;
const path = require('path');

class FileStorage {
  constructor(filename) {
    this.filepath = path.join(__dirname, `../data/${filename}`);
  }

  async read() {
    try {
      const data = await fs.readFile(this.filepath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async write(data) {
    await fs.mkdir(path.dirname(this.filepath), { recursive: true });
    await fs.writeFile(this.filepath, JSON.stringify(data, null, 2));
  }
}

module.exports = FileStorage;