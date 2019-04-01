import { Component, OnInit, Input } from "@angular/core";
import { PostInfoModel } from "../../../../models/post-info.modet";

@Component({
    selector: "mc-post-list",
    templateUrl: "./post-list.component.html",
    styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent {
    @Input() posts: PostInfoModel[] = [];

    public get displayPosts() {
        const tempArray = this.posts.slice(0);
        return tempArray.reverse();
    }

    public isReadOnly: boolean = true;

    public editorOptions: Object = {
        toolbarInline: true,
        charCounterCount: false,
        toolbarButtons: []
    };

    public visible(post: PostInfoModel) {
        return post.planTypes.map(x => x.name).join(" | ");
    }

    constructor() { }
}
