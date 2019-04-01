import { Singleton } from "../decorators/singleton.decorator";

@Singleton()
export class AuthenticationService {
    isLogin = false;

    login() {
        this.isLogin = true;
    }

    logout() {
        this.isLogin = false;
    }
}