import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ResponseModel } from "../models/ResponseModel";

const BASEAPIURL: string = "https://groot.beer-krokodil.be/stekkerdoos";

@Injectable({ providedIn: "root" })
export class ImageService {
  constructor(public http: HttpClient) {}

  sendImage(data: FormData): Observable<ResponseModel[]> {
    return this.http
      .post<ResponseModel[]>(BASEAPIURL, data)
      .pipe(map(this.parseResponseData));
  }

  parseResponseData(data: any[]): ResponseModel[] {
    return Object.keys(data).map(key => {
      let response = data[key];
      return new ResponseModel(response.found, response.childName);
    });
  }
}
