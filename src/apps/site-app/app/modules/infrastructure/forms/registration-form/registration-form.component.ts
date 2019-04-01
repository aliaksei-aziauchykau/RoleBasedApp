import { Component, OnInit } from "@angular/core";
import { RegistrationInfoModel } from "../../../../models/registration-info.model";
import { Endpoints } from "../../../../../../../core/endpoints";
import { HttpService } from "../../../../services/http.service";
import { Router } from "@angular/router";
import { Validators, FormGroup, FormControl, AbstractControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { confirmedFieldValidator } from "../helpers/custom-form.validators";
import { ValueChecker } from "root_module/apps/site-app/app/utils/value-checker.utils";


@Component({
    selector: "mc-registration-form",
    templateUrl: "./registration-form.component.html",
    styleUrls: ["./registration-form.component.scss"]
})
export class RegistrationFormComponent implements OnInit {
    private registrationInfo: RegistrationInfoModel = new RegistrationInfoModel();

    public registrationForm: FormGroup = this.formBuilder.group({
        nickName: ["", Validators.required],
        email: ["", Validators.email],
        password: ["", Validators.compose([
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(12)
        ])],
        confirmPassword: ["", Validators.required],
        role: ["", Validators.required]
    }, { validators: confirmedFieldValidator(["confirmPassword", "password"]) });

    public get nickNameControl(): AbstractControl {
        return this.registrationForm.get("nickName");
    }
    public get emailControl(): AbstractControl {
        return this.registrationForm.get("email");
    }
    public get passwordControl(): AbstractControl {
        return this.registrationForm.get("password");
    }
    public get confirmPasswordControl(): AbstractControl {
        return this.registrationForm.get("confirmPassword");
    }
    public get roleControl(): AbstractControl {
        return this.registrationForm.get("role");
    }

    constructor(private readonly httpService: HttpService,
        private readonly router: Router,
        private readonly formBuilder: FormBuilder) { }

    ngOnInit(): void {
    }

    public getValidationControl(name: string) {
        const control: AbstractControl = this.registrationForm.get(name);
        return control;
    }

    private get isValidEnteredPassword(): boolean {
        const result: boolean = this.passwordControl.valid;
        return result;
    }

    private get isValidConfirmedPassword(): boolean {
        const result: boolean = (!ValueChecker.isValid(this.registrationForm.errors) || !ValueChecker.isValid(this.registrationForm.errors.confirmedField))
            && this.confirmPasswordControl.valid;
        return result;
    }

    private onSubmit() {
        this.httpService.invokePost(Endpoints.Registration(), {
            nickName: this.registrationInfo.nickName,
            email: this.registrationInfo.email,
            password: this.registrationInfo.confirmPassword
        }).subscribe(
            (data: any) => this.router.navigate(["/login"]),
            (error: any) => console.error(error)
        );
    }
}
