const NotFound = require("../errors/notfound");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const response = await this.model.findByIdAndDelete(id);
      if (!response) {
        throw new NotFound("Couldn't find", id);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
  async get(id) {
    try {
      const response = await this.model.findById(id);
      if (!response) {
        throw new NotFound("Couldn't find", id);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const response = await this.model.find();
      return response;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const response = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!response) {
        throw NotFound(`couldn't find ${id}`);
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = CrudRepository;
