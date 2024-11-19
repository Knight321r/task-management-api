class Store {
    constructor() {
      this.users = [];
      this.tasks = [];
    }
  
    // Static instance for global access
    static getInstance() {
      if (!Store.instance) {
        Store.instance = new Store();
      }
      return Store.instance;
    }
  }
  
  module.exports = Store.getInstance();