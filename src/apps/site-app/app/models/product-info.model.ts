import { PlanTypeModel } from "./post-info.modet";

export class ProductInfo {
    public productName: string;
    public productPath: string;
    public category: string;
    public description: string;
    public isDeployed: boolean;
    public isMyOwnProduct: boolean;
    public plans: PlanTypeModel[];
    public tags: string[];
}