import { Component, OnInit } from "@angular/core";
import { ProductHttpService } from "../../../services/http-services/product.http.service";
import { ActivatedRoute } from "@angular/router";
import { ProductInfo } from "../../../models/product-info.model";
import { check } from "../../../utils/custom-operators";
import { SafeComponent } from "../../../utils/safe-component.abstract";
import { Observable } from "rxjs";
import { PostHttpService } from "../../../services/http-services/post.http.service";
import { CommandService } from "../../../services/command.service";
import { PostInfoModel } from "../../../models/post-info.modet";
import { CommandType } from "../../../enums/command-type.enum";
import { StripeHttpService } from "../../../services/http-services/stripe.http.service";
import { DataStorageService } from "../../../services/data-storage.service";

// scss.
import "../../../../../../../node_modules/quill/dist/quill.bubble.css";
import "../../../../../../../node_modules/quill/dist/quill.snow.css";

@Component({
    selector: "mc-product-page",
    templateUrl: "./product-page.component.html",
    styleUrls: ["./product-page.component.scss"]
})
export class ProductPageComponent extends SafeComponent implements OnInit {

    public productInfo: ProductInfo;
    public posts: PostInfoModel[] = [];

    constructor(
        private readonly productHttpService: ProductHttpService,
        private readonly postHttpService: PostHttpService,
        private readonly stripeHttpService: StripeHttpService,
        private readonly commandService: CommandService,
        private readonly dataStorageService: DataStorageService,
        private readonly route: ActivatedRoute) {
        super();
    }

    public get filteredPosts(): PostInfoModel[] {
        let result: PostInfoModel[] = [];

        if (!this.productInfo) return result;

        if (!this.productInfo.isMyOwnProduct) {
            result = this.posts.filter(x => !x.planTypes || x.planTypes.some(x => x.name === "free"));
        } else {
            result = this.posts;
        }
        return result;
    }

    ngOnInit(): void {

        const getProductInfo$ = this.productHttpService.getProductInfo(this.route.snapshot.params["id"])
            .pipe(check(this.unsubscriber, this.productInfo, (item) => this.productInfo = item));

        const getPostList = (productPath: string) => this.postHttpService.getAllPosts(productPath)
            .pipe(check(this.unsubscriber, this.posts, (item) => this.posts = item));

        // const getStripeInfo$ = this.stripeHttpService.getStripeInfo();

        this.commandService.commandInvoker
            .takeUntil(this.unsubscriber)
            .filter(type => type === CommandType.GetPostList)
            .flatMap(() => getPostList(this.productInfo.productPath))
            .subscribe();

        Observable.zip(
            getProductInfo$,
            // getStripeInfo$
        ).flatMap(x => getPostList(x[0].productPath)).subscribe();
    }
}
