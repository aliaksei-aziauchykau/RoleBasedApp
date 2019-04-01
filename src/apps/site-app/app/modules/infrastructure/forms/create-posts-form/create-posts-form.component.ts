import { Component, OnInit, Input } from "@angular/core";
import { PostInfoModel, PlanTypeModel } from "../../../../models/post-info.modet";
import { PostHttpService } from "../../../../services/http-services/post.http.service";
import { CommandService } from "../../../../services/command.service";
import { CommandType } from "../../../../enums/command-type.enum";
import { DataStorageService } from "../../../../services/data-storage.service";
import { SafeComponent } from "../../../../utils/safe-component.abstract";
import { ProductInfo } from "../../../../models/product-info.model";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "mc-create-posts-form",
    templateUrl: "./create-posts-form.component.html",
    styleUrls: ["./create-posts-form.component.scss"]
})
export class CreatePostsFormComponent extends SafeComponent implements OnInit {

    @Input() plans: PlanTypeModel[] = [];
    @Input() model: PostInfoModel = new PostInfoModel();

    public editorOptions: Object = {
        // toolbarInline: true,
        // charCounterCount: false,
        toolbarButtons: ["bold", "italic", "underline", "undo", "redo"]
    };

    public selectedPlan: PlanTypeModel;
    public productIndo: ProductInfo;

    constructor(
        private readonly postHttpService: PostHttpService,
        private readonly commandService: CommandService,
        private readonly route: ActivatedRoute
        ) {
            super();
         }

    ngOnInit(): void {
        const defaultPlan: PlanTypeModel =  <PlanTypeModel> {name: "free"};
        this.plans = [defaultPlan].concat(this.plans);
    }

    planOnChange(newObj: PlanTypeModel) {
        this.selectedPlan = newObj;

        !this.model.planTypes.some(x => x.name === newObj.name)
            && this.model.planTypes.push(newObj);
    }

    submit() {
        this.postHttpService.createPost(this.route.snapshot.params["id"], this.model)
            .do(() => this.commandService.commandInvoker.next(CommandType.GetPostList))
            .subscribe();
    }

    removePlan(index: number) {
        this.model.planTypes.splice(index, 1);
    }
}
