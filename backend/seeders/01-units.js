"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const units = [];

    // Medicalizadas 1000–1009
    for (let i = 1000; i <= 1009; i++) {
      units.push({
        unitfleet: i,
        typefleet: "Medicalizada",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Sanitizadas 2000–2009
    for (let i = 2000; i <= 2009; i++) {
      units.push({
        unitfleet: i,
        typefleet: "Sanitizada",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Básicas 3000–3009
    for (let i = 3000; i <= 3009; i++) {
      units.push({
        unitfleet: i,
        typefleet: "Soporte Vital Básico",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // No urgentes 4000–4009
    for (let i = 4000; i <= 4009; i++) {
      units.push({
        unitfleet: i,
        typefleet: "No Urgente",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("units", units);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("units", null, {});
  },
};
