export class ResponseModel {
  found: boolean;
  childName: string;

  constructor(found: boolean, childName: string) {
    this.found = found;
    this.childName = childName;
  }
}
