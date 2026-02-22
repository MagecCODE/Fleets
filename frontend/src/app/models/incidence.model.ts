export class Incidence {
    constructor(
        public id: number,
        public unitfleet: number,
        public dni_emp: string,
        public incidence_type: string,
        public description: string,
        public date: Date,
        public status: string
    ){}
}