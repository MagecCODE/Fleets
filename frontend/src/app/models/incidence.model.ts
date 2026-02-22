export class Incidence {
    constructor(
        public id: number,
        public unit_fleet: number,
        public dni_emp: string,
        public incidence_type: string,
        public description: string,
        public incidence_date: Date,
        public status: string
    ){}
}