import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageModule } from "./home-page/home-page.module";
import { LoginPageModule } from "./login-page/login-page.module";
import { RegistrationPageModule } from "./registration-page/registration-page.module";
import { UserPageModule } from "./user-page/user-page.module";
import { ProductPageModule } from "./product-page/product-page.module";
import { NotFoundPageModule } from "./not-found-page/not-found-page.module";
import { AdminPageModule } from "./admin-page/admin-page.module";
import { SetupStripePageModule } from "./setup-stripe-page/setup-stripe-page.module";

@NgModule({
    imports: [
        CommonModule,
        HomePageModule,
        AdminPageModule,
        LoginPageModule,
        RegistrationPageModule,
        UserPageModule,
        ProductPageModule,
        NotFoundPageModule,
        SetupStripePageModule
    ],
    declarations: [],
    exports: [],
    providers: [],
})
export class PagesModule {}