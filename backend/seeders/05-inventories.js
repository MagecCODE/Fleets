"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const units = [
      1000,1001,1002,1003,1004,
      2000,2001,2002,2003,2004,
      3000,3001,3002,3003,3004,
      4000,4001,4002,4003,4004,
    ];

    const employees = [
      "77777777G","12121212J","10101010K","20202020L","30303030M","17171717X",
      "88888888H","90909090N","40404040O","50505050P","60606060Q","70707070R","18181818Y",
      "33333333C","44444444D"
    ];

    const items = [
      { name: "Desfibrilador", qty: 1 },
      { name: "Bombona de oxígeno", qty: 1 },
      { name: "Aspirador portátil", qty: 1 },
      { name: "Monitor de constantes", qty: 1 },
      { name: "Collarines", qty: 4 },
      { name: "Férulas", qty: 3 },
      { name: "Tabla espinal", qty: 1 },
      { name: "Gasas estériles", qty: 50 },
      { name: "Vendas", qty: 20 },
      { name: "Tijeras sanitarias", qty: 1 },
      { name: "Sueros", qty: 5 },
      { name: "Mascarillas FFP2", qty: 20 },
      { name: "Guantes", qty: 100 },
      { name: "Ambú adulto", qty: 1 },
      { name: "Ambú pediátrico", qty: 1 },
      { name: "Manta térmica", qty: 2 },
      { name: "Botiquín básico", qty: 1 },
      { name: "Linterna táctica", qty: 1 }
    ];

    const inventories = [];
    let empIndex = 0;

    for (let u = 0; u < units.length; u++) {
      const unit = units[u];

      for (let i = 0; i < items.length; i++) {

        // Estado aleatorio
        const rand = Math.random();
        let status = "Stock";
        let quantity = items[i].qty;

        if (rand < 0.20) {
          status = "Stock Out";
          quantity = 0;
        } else if (rand < 0.30) {
          status = "Stock";
          quantity = Math.max(1, Math.floor(items[i].qty * 0.2)); // bajo stock
        }

        inventories.push({
          unitfleet: unit,
          dni_emp: employees[empIndex % employees.length],
          item_name: items[i].name,
          quantity: quantity,
          status: status,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }

      empIndex++;
    }

    return queryInterface.bulkInsert("inventories", inventories);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("inventories", null, {});
  }
};