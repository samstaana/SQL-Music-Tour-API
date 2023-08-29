'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('bands', [{
      band_name: 'Jimmy and the Beanbags',
      genre: 'Country Western',
      available_start_time: '18:00:00',
      available_end_time: '22:00:00'
    },
    {
      band_name: 'Jim Morrison has a Cat',
      genre: 'Alternative',
      available_start_time: '12:00:00',
      available_end_time: '12:10:00'
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('bands', null, {});
  }
};
