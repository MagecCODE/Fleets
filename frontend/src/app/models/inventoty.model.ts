export class Inventory {
    constructor(
        public id: number,
        public unit_fleet: number,
        public dni_emp: string,
        public item_name: string,
        public quantity: number,
        public status: string
    ){}
}