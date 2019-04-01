
export class GenericListItem {
    name: string;
    source: any;

    constructor(data: any) {
        this.name = data && data.name || null;
        this.source = data;
    }
}