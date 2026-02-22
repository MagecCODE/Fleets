export class Inventory {
    constructor(
        public id: number,
        public unitfleet: number,
        public dni_emp: string,
        public item_name: string,
        public quantity: number,
        public status: string
    ){}
}