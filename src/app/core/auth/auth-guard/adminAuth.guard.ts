import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class CanActivateAdminGuard implements CanActivate {
  status: any;
  constructor(private authService: AuthService, private router: Router) {}
  handleGuard() {
    if (this.authService.getToken()) {
      return true;
    } else {
      this.router.navigateByUrl(`auth/login`);
      return false;
    }
  }

  canActivate() {
    return this.handleGuard();
  }
}
