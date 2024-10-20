import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadComponent: () => import("./modules/home/home.component").then((module) => module.HomeComponent),
  },
  {
    path: "signin",
    loadComponent: () => import("./modules/signin/signin.component").then((module) => module.SigninComponent),
  },
  {
    path: "signup",
    loadComponent: () => import("./modules/signup/signup.component").then((module) => module.SignupComponent),
  },
];
