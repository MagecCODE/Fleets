"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("employees", [

      // 🟥 ADMIN (Profesión: Jefatura)
      { name: "Laura", surname: "Martín", dni: "11111111A", password: "pass", email: "laura.admin@example.com", phone: "600100100", prof: "Jefatura", rol: "Admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "Carlos", surname: "Benítez", dni: "22222222B", password: "pass", email: "carlos.admin@example.com", phone: "600200200", prof: "Jefatura", rol: "Admin", createdAt: new Date(), updatedAt: new Date() },

      // 🟧 LOGISTICS (Profesión: Botiquín)
      { name: "Raúl", surname: "García", dni: "33333333C", password: "pass", email: "raul.logistic@example.com", phone: "600300300", prof: "Botiquín", rol: "Logistics", createdAt: new Date(), updatedAt: new Date() },
      { name: "Patricia", surname: "Santos", dni: "44444444D", password: "pass", email: "patricia.logistic@example.com", phone: "600400400", prof: "Botiquín", rol: "Logistics", createdAt: new Date(), updatedAt: new Date() },

      // 🟩 MRO (Profesión: Mantenimiento)
      { name: "Sergio", surname: "Mendoza", dni: "55555555E", password: "pass", email: "sergio.mro@example.com", phone: "600500500", prof: "Mantenimiento", rol: "Mro", createdAt: new Date(), updatedAt: new Date() },
      { name: "Lucía", surname: "Torres", dni: "66666666F", password: "pass", email: "lucia.mro@example.com", phone: "600600600", prof: "Mantenimiento", rol: "Mro", createdAt: new Date(), updatedAt: new Date() },

      // 🟦 SANITARY — Enfermeros
      { name: "María", surname: "Suárez", dni: "77777777G", password: "pass", email: "maria.sanitary@example.com", phone: "600700700", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "David", surname: "Sosa", dni: "12121212J", password: "pass", email: "david.sanitary@example.com", phone: "601000000", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Irene", surname: "López", dni: "10101010K", password: "pass", email: "irene.sanitary@example.com", phone: "601100100", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Samuel", surname: "Viera", dni: "20202020L", password: "pass", email: "samuel.sanitary@example.com", phone: "601200200", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Claudia", surname: "Pérez", dni: "30303030M", password: "pass", email: "claudia.sanitary@example.com", phone: "601300300", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Tomás", surname: "Alonso", dni: "17171717X", password: "pass", email: "tomas.sanitary@example.com", phone: "602400400", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Silvia", surname: "Domínguez", dni: "16161616W", password: "pass", email: "silvia.sanitary@example.com", phone: "602300300", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Rubén", surname: "Santos", dni: "19191919Z", password: "pass", email: "ruben.sanitary@example.com", phone: "602600600", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Iago", surname: "Montes", dni: "27272727E", password: "pass", email: "iago.sanitary@example.com", phone: "604900900", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Noelia", surname: "Cabrera", dni: "28282828F", password: "pass", email: "noelia.sanitary@example.com", phone: "605000000", prof: "Enfermero", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },

      // 🟦 SANITARY — TES
      { name: "Pedro", surname: "López", dni: "88888888H", password: "pass", email: "pedro.sanitary@example.com", phone: "600800800", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Óscar", surname: "Vega", dni: "90909090N", password: "pass", email: "oscar.sanitary@example.com", phone: "601400400", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Nerea", surname: "Sánchez", dni: "40404040O", password: "pass", email: "nerea.sanitary@example.com", phone: "601500500", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Jorge", surname: "Díaz", dni: "50505050P", password: "pass", email: "jorge.sanitary@example.com", phone: "601600600", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Rosa", surname: "Gómez", dni: "60606060Q", password: "pass", email: "rosa.sanitary@example.com", phone: "601700700", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Héctor", surname: "Navarro", dni: "70707070R", password: "pass", email: "hector.sanitary@example.com", phone: "601800800", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Verónica", surname: "Gil", dni: "18181818Y", password: "pass", email: "veronica.sanitary@example.com", phone: "602500500", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Alberto", surname: "Ruiz", dni: "81818181A", password: "pass", email: "alberto.sanitary@example.com", phone: "602600600", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Beatriz", surname: "Moreno", dni: "82828282B", password: "pass", email: "beatriz.sanitary@example.com", phone: "602700700", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "César", surname: "Hernández", dni: "83838383C", password: "pass", email: "cesar.sanitary@example.com", phone: "602800800", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Diana", surname: "Santos", dni: "84848484D", password: "pass", email: "diana.sanitary@example.com", phone: "602900900", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Eduardo", surname: "Pérez", dni: "85858585E", password: "pass", email: "eduardo.sanitary@example.com", phone: "603000000", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Fátima", surname: "García", dni: "86868686F", password: "pass", email: "fatima.sanitary@example.com", phone: "603100100", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Gustavo", surname: "Lorenzo", dni: "87878787G", password: "pass", email: "gustavo.sanitary@example.com", phone: "603200200", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Helena", surname: "Martínez", dni: "89898989H", password: "pass", email: "helena.sanitary@example.com", phone: "603300300", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Ismael", surname: "Dorta", dni: "91919191I", password: "pass", email: "ismael.sanitary@example.com", phone: "603400400", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Julia", surname: "Benítez", dni: "92929292J", password: "pass", email: "julia2.sanitary@example.com", phone: "603500500", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Kevin", surname: "Suárez", dni: "93939393K", password: "pass", email: "kevin.sanitary@example.com", phone: "603600600", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Lorena", surname: "Viera", dni: "94949494L", password: "pass", email: "lorena.sanitary@example.com", phone: "603700700", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Manuel", surname: "Sosa", dni: "95959595M", password: "pass", email: "manuel.sanitary@example.com", phone: "603800800", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Nadia", surname: "Reyes", dni: "96969696N", password: "pass", email: "nadia.sanitary@example.com", phone: "603900900", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Óliver", surname: "González", dni: "97979797O", password: "pass", email: "oliver.sanitary@example.com", phone: "604000000", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Patricia", surname: "Díaz", dni: "98989898P", password: "pass", email: "patricia2.sanitary@example.com", phone: "604100100", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Quique", surname: "López", dni: "99999990Q", password: "pass", email: "quique.sanitary@example.com", phone: "604200200", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Raquel", surname: "Navarro", dni: "10101010R", password: "pass", email: "raquel.sanitary@example.com", phone: "604300300", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Samuel", surname: "Gil", dni: "11111112S", password: "pass", email: "samuel2.sanitary@example.com", phone: "604400400", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Tamara", surname: "Pérez", dni: "12121213T", password: "pass", email: "tamara.sanitary@example.com", phone: "604500500", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Ulises", surname: "Martín", dni: "13131313U", password: "pass", email: "ulises.sanitary@example.com", phone: "604600600", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Valeria", surname: "Serrano", dni: "14141414V", password: "pass", email: "valeria.sanitary@example.com", phone: "604700700", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "William", surname: "Acosta", dni: "15151515W", password: "pass", email: "william.sanitary@example.com", phone: "604800800", prof: "Técnico en Emergencias Sanitarias", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },

      // 🟦 SANITARY — Facultativos
      { name: "Elena", surname: "Castro", dni: "99999999I", password: "pass", email: "elena.sanitary@example.com", phone: "600900900", prof: "Facultativo", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Iván", surname: "Torres", dni: "13131313T", password: "pass", email: "ivan.sanitary@example.com", phone: "602000000", prof: "Facultativo", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Marta", surname: "Reyes", dni: "14141414U", password: "pass", email: "marta.sanitary@example.com", phone: "602100100", prof: "Facultativo", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
      { name: "Gonzalo", surname: "Hernández", dni: "15151515V", password: "pass", email: "gonzalo.sanitary@example.com", phone: "602200200", prof: "Facultativo", rol: "Sanitary", createdAt: new Date(), updatedAt: new Date() },
  
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("employees", null, {});
  }
};