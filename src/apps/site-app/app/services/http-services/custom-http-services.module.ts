import { HttpService } from "./../http.service";
import { DataStorageService } from "./../data-storage.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductHttpService } from "./product.http.service";
import { UserHttpService } from "./user.http.service";
import { StripeHttpService } from "./stripe.http.service";
import { PostHttpService } from "./post.http.service";
import { AuthHttpService } from "./auth.http.service";
import { CurrentUserHttpService } from "./current.user.http.service";
import { SessionHttpService } from "./session.http.service";

@NgModule({
    declarations: [],
    imports: [ CommonModule ],
    exports: [],
    providers: [
        DataStorageService,
        HttpService,
        ProductHttpService,
        UserHttpService,
        StripeHttpService,
        PostHttpService,
        AuthHttpService,
        SessionHttpService,
        CurrentUserHttpService
    ],
})
export class CustomHttpServicesModule {}