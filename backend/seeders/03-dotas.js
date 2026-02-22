"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const units = [
      1000,1001,1002,1003,1004,1005,1006,1007,1008,1009,
      2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,
      3000,3001,3002,3003,3004,3005,3006,3007,3008,3009,
      4000,4001,4002,4003,4004,4005,4006,4007,4008,4009
    ];

    const tes = [13,14,15,16,17,18,19];
    const enf = [7,8,9,10,11,12];
    const fac = [20,21,22,23,24,25];

    const dotas = [];

    for (let i = 0; i < units.length; i++) {
      dotas.push({
        unitfleet: units[i],
        driveId: tes[i % tes.length],
        sanitId: enf[i % enf.length],
        facultId: fac[i % fac.length],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert("dotas", dotas);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("dotas", null, {});
  }
};