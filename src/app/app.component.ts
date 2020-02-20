import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "CareAthonFerm";

  constructor() {}

  submitImage() {
    let image = document.getElementById("faceImage").getAttribute("src");
    console.log(image);
  }
}
