'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    

      await queryInterface.bulkInsert('blogs', [{
        name: 'John Doe',
        start_date: '1-1-2024',
        end_date: '30-1-2024',
        description: 'Hello Word',
        tecnologies: '{vuejs}'
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    
      
      await queryInterface.bulkDelete('blogs', null, {});
     
  }
};
