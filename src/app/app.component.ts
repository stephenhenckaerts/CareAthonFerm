import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from "@angular/core";
import { ImageService } from './services/ImageService';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  log: string;
  image = null;
  receivedData;
  videoWidth = 0;
  videoHeight = 0;
  @ViewChild("video", { static: true }) videoElement: ElementRef;
  @ViewChild("canvas", { static: true }) canvas: ElementRef;

  constructor(private renderer: Renderer2, private imageService: ImageService) {}

  ngOnInit() {
    this.startCamera();
  }

  sendImage() {
    if(this.image) {
      this.imageService.sendImage(this.image).subscribe(data => {
        this.receivedData = data;        
      });
      if(this.receivedData.received) {
        this.log = "Logged in";
      }
    }
  }

  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);
    } else {
      alert("Sorry, camera not available.");
    }
  }

  handleError(error) {
    console.log("error: ", error);
  }

  attachVideo(stream) {
    this.renderer.setProperty(
      this.videoElement.nativeElement,
      "srcObject",
      stream
    );
    this.renderer.listen(this.videoElement.nativeElement, "play", event => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }

  capture(event: any): void {
    this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
    this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
    this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
    this.image = this.canvas.nativeElement.toDataURL("image/png");
  }

  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };
}
