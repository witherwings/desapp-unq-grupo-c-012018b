export class Reservation {
    constructor(
        public reservationId:number,
        public accepted:boolean, 
        public startYear:number,
        public startMonth:number,
        public startDayOfMonth:number,
        public endYear:number,
        public endMonth:number,
        public endDayOfMonth:number,
        public userEmail:string,
        public publicationId:number,
        public retireState:string 
    )
    { }
}