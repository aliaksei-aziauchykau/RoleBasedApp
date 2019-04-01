export class ProductViewModel {
    public name: string;
    public description: string;
    public color: string;
    public path: string;

    constructor(data: ProductViewModel) {
        this.name = data && data.name || null;
        this.description = data && data.description || null;
        this.color = data && data.color || null;
        this.path = data && data.path || null;
    }
}
