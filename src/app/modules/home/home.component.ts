import { Component } from "@angular/core";

import { MainComponent } from "../../shared/layouts/main/main.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [MainComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss"
})
export class HomeComponent {

}
