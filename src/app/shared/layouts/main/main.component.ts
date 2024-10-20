import { Component } from "@angular/core";

import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss"
})
export class MainComponent {

}
