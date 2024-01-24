'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  blog.init({
    name: DataTypes.STRING,
    start_date: DataTypes.STRING,
    end_date: DataTypes.STRING,
    timeproject: DataTypes.STRING,
    description: DataTypes.STRING,
    technologies: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'blog',
  });
  return blog;
};