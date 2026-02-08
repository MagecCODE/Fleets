// Constantes para manejar los ENUM de cara a las profesiones y los roles de los empleados, 
// así evitamos hardcodear strings en el código y facilitamos su mantenimiento.
export const PROFESSIONS = {
    ENFERMERO: 'Enfermero',
    TES: 'Técnico en Emergencias Sanitarias',
    FACULTATIVO: 'Facultativo'
};

export const ROLES = {
    ADMIN: 'Admin',
    LOGISTIC: 'Logistics',
    MOR: 'Mro',
    SANITARY: 'Sanitary'
};

export const INCIDENCE_STATUS = {
    PENDING: 'Pendiente',
    INPROGRESS: 'En proceso',
    RESOLVED: 'Resuelta'
};

export const INCIDENCE_TYPES = {
    MECHANICAL: 'Mecánica',
    MATERIAL: 'Material',
    PATIENT: 'Paciente',
    SERVICE: 'Servicio',
    OTHER: 'Otro'
};

export const INVENTORY_STATUS = {
    STOCK: 'Stock',
    STOCK_OUT: 'Stock Out'
};

export const UNIT_TYPES = {
    MEDICALIZADA: 'Medicalizada',
    SANITARIZADA: 'Sanitizada',
    SOPORTE_VITAL_BASICO: 'Soporte Vital Básico',
    NO_URGENTE: 'No Urgente'
};