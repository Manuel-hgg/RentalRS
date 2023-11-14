export class Location {
    idLocation: string;
    community: string;
    provinces: string[];

    constructor(idLocation: string,
                community: string,
                provinces: string[]) {
        this.idLocation = idLocation;
        this.community = community;
        this.provinces = provinces;
    }
}
