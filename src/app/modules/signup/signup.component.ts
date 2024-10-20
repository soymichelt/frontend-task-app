import { Component } from "@angular/core";

import { MainComponent } from "../../shared/layouts/main/main.component";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [MainComponent],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss"
})
export class SignupComponent {

}
