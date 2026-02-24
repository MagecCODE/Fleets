// Constantes para manejar los ENUM de cara a las profesiones y los roles de los empleados, 
// así evitamos hardcodear strings en el código y facilitamos su mantenimiento.
// 
// NOTA:USamos la formula de node antigua de constantates y mpodules.exports para mantener la compatibilidad 
// con el resto del código que usa require().
const PROFESSIONS = {
    ENFERMERO: 'Enfermero',
    TES: 'Tecnico en Emergencias Sanitarias',
    FACULTATIVO: 'Facultativo',
    LOGISTIC: 'Botiquin',
    MRO: 'Mantenimiento',
    ADMIN: 'Jefatura'
};

const ROLES = {
    ADMIN: 'Admin',
    LOGISTIC: 'Logistics',
    MRO: 'Mro',
    SANITARY: 'Sanitary'
};

const INCIDENCE_STATUS = {
    PENDING: 'Pendiente',
    INPROGRESS: 'En proceso',
    RESOLVED: 'Resuelta'
};

const INCIDENCE_TYPES = {
    MECHANICAL: 'Mecanica',
    MATERIAL: 'Material',
    PATIENT: 'Paciente',
    SERVICE: 'Servicio',
    OTHER: 'Otro'
};

const INVENTORY_STATUS = {
    STOCK: 'Stock',
    STOCK_OUT: 'Stock Out'
};

const UNIT_TYPES = {
    MEDICALIZADA: 'Medicalizada',
    SANITARIZADA: 'Sanitizada',
    SVB: 'Soporte Vital Basico',
    NO_URGENTE: 'No Urgente'
};

// Exportación compatible con require()
module.exports = {
    PROFESSIONS,
    ROLES,
    INCIDENCE_STATUS,
    INCIDENCE_TYPES,
    INVENTORY_STATUS,
    UNIT_TYPES
};