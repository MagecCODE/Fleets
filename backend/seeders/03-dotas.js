"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const medicalizadas = [1000,1001,1002,1003,1004];
    const sanitizadas   = [2000,2001,2002,2003,2004];
    const svb           = [3000,3001,3002,3003,3004];
    const noUrgente     = [4000,4001,4002,4003,4004];

    const tesMed = [17,18,19,20,21];
    const tesSan = [22,23,24,25,26];
    const tesSvb = [27,28,29,30,31,32,33,34,35,36];
    const tesNu  = [37,38,39,40,41,42,43,44,45,46];

    const enfMed = [7,8,9,10,11];
    const enfSan = [12,13,14,15,16];

    const fac = [47,48,49,50,51];

    const dotas = [];

    // 🟩 MEDICALIZADAS
    let iTesMed = 0, iEnfMed = 0, iFac = 0;
    medicalizadas.forEach(unit => {
      dotas.push({
        unitfleet: unit,
        driveId: tesMed[iTesMed++],
        sanitId: enfMed[iEnfMed++],
        facultId: fac[iFac++],
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // 🟧 SANITARIZADAS
    let iTesSan = 0, iEnfSan = 0;
    sanitizadas.forEach(unit => {
      dotas.push({
        unitfleet: unit,
        driveId: tesSan[iTesSan++],
        sanitId: enfSan[iEnfSan++],
        facultId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // 🟦 SVB
    let iTesSvb = 0;
    svb.forEach(unit => {
      dotas.push({
        unitfleet: unit,
        driveId: tesSvb[iTesSvb++],
        sanitId: tesSvb[iTesSvb++],
        facultId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // 🟩 NO URGENTE
    let iTesNu = 0;
    noUrgente.forEach(unit => {
      dotas.push({
        unitfleet: unit,
        driveId: tesNu[iTesNu++],
        sanitId: iTesNu < tesNu.length ? tesNu[iTesNu++] : null,
        facultId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    return queryInterface.bulkInsert("dotas", dotas);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("dotas", null, {});
  }
};