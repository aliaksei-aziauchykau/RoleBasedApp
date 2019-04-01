import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule }  from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

// Redux
import { NgReduxModule, NgRedux } from "@angular-redux/store";

import { AppComponent } from "./app.component";
import { SettingsService } from "./services/settings.service";
import { AppRoutingModule } from "./app-routing.module";
import { IAppState } from "./redux/app.state";
import configureStore from "./redux/config.store";
import { StorageService } from "./services/storage.service";
import { Store } from "redux";
import { CustomHttpServicesModule } from "./services/http-services/custom-http-services.module";
import { PagesModule } from "./modules/pages/pages.module";
import { PopupService } from "./services/popup.service";
import { CommandService } from "./services/command.service";
import { CustomPipesModule } from "./pipes/custom-pipes.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,

    // Http
    CustomHttpServicesModule,

    // Pages
    PagesModule,

    HttpClientModule,
    NgReduxModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SettingsService,
    StorageService,
    PopupService,
    CommandService
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: JsonInterceptorService,
    //     multi: true
    // }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(
        ngRedux: NgRedux<IAppState>,
        storageService: StorageService
    ) {
        const store: Store<IAppState> = configureStore(storageService);
        ngRedux.provideStore(store);
    }
}