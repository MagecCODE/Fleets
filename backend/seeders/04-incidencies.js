"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    const incidencies = [
      // 🟧 MECÁNICAS (MRO o TES)
      { unitfleet: 1000, dni_emp: "55555555E", incidence_type: "Mecánica", description: "Ruidos en el motor al arrancar.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 2003, dni_emp: "66666666F", incidence_type: "Mecánica", description: "Fallo intermitente en el alternador.", date: new Date(), status: "En proceso", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 3004, dni_emp: "88888888H", incidence_type: "Mecánica", description: "Vibración en la dirección a baja velocidad.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },

      // 🟧 MATERIAL (Logistics o Sanitary)
      { unitfleet: 1004, dni_emp: "33333333C", incidence_type: "Material", description: "Faltan gasas estériles en el botiquín.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 2001, dni_emp: "44444444D", incidence_type: "Material", description: "Reposición de mascarillas completada.", date: new Date(), status: "Resuelta", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 3002, dni_emp: "77777777G", incidence_type: "Material", description: "Tijeras sanitarias extraviadas.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },

      // 🟦 PACIENTE (solo sanitarios)
      { unitfleet: 1003, dni_emp: "12121212J", incidence_type: "Paciente", description: "Paciente mareado durante traslado.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 2004, dni_emp: "10101010K", incidence_type: "Paciente", description: "Atención por hipoglucemia.", date: new Date(), status: "Resuelta", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 3002, dni_emp: "20202020L", incidence_type: "Paciente", description: "Paciente con dolor torácico.", date: new Date(), status: "En proceso", createdAt: new Date(), updatedAt: new Date() },

      // 🟦 SERVICIO (Admin o Sanitary)
      { unitfleet: 4001, dni_emp: "11111111A", incidence_type: "Servicio", description: "Retraso en la salida por falta de documentación.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 2001, dni_emp: "22222222B", incidence_type: "Servicio", description: "Coordinación con central completada.", date: new Date(), status: "Resuelta", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 3003, dni_emp: "30303030M", incidence_type: "Servicio", description: "Conflicto con paciente durante traslado.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },

      // 🟦 FACULTATIVOS
      { unitfleet: 4004, dni_emp: "99999999I", incidence_type: "Paciente", description: "Paciente con reacción alérgica severa.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 2002, dni_emp: "13131313T", incidence_type: "Paciente", description: "Paciente inconsciente, valoración avanzada.", date: new Date(), status: "En proceso", createdAt: new Date(), updatedAt: new Date() },

      // 🟧 OTRO (cualquiera)
      { unitfleet: 1003, dni_emp: "18181818Y", incidence_type: "Otro", description: "Problemas con el GPS de la unidad.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 3000, dni_emp: "14141414U", incidence_type: "Otro", description: "Actualización de software completada.", date: new Date(), status: "Resuelta", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 4003, dni_emp: "15151515V", incidence_type: "Otro", description: "Unidad mal estacionada reportada por policía.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 2002, dni_emp: "16161616W", incidence_type: "Otro", description: "Revisión de inventario solicitada.", date: new Date(), status: "En proceso", createdAt: new Date(), updatedAt: new Date() },
      { unitfleet: 1002, dni_emp: "19191919Z", incidence_type: "Otro", description: "Incidencia administrativa pendiente de validar.", date: new Date(), status: "Pendiente", createdAt: new Date(), updatedAt: new Date() }
    ];

    return queryInterface.bulkInsert("incidencies", incidencies);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("incidencies", null, {});
  }
};