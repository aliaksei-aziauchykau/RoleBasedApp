export class PostInfoModel {
    public title: string;
    public message: string;
    public tags: string[] = [];
    public planTypes: PlanTypeModel[] = [];
}

export class PlanTypeModel {
    public name: string;
    public id: string;
}