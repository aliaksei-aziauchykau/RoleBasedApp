import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
    selector: "mc-setup-stripe-page",
    templateUrl: "./setup-stripe-page.component.html",
    styleUrls: ["./setup-stripe-page.component.scss"]
})
export class SetupStripePageComponent implements OnInit {

    isLinear = false;
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ["", Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ["", Validators.required]
        });
    }
}
