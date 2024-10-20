import { Component } from "@angular/core";

import { MainComponent } from "../../shared/layouts/main/main.component";

@Component({
  selector: "app-signin",
  standalone: true,
  imports: [MainComponent],
  templateUrl: "./signin.component.html",
  styleUrl: "./signin.component.scss"
})
export class SigninComponent {

}
