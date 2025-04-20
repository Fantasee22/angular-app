export class UploadFile {
  id: number;
  name: string;
  status: string;
  base64data: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.status = "";
    this.base64data = "";
  }
}
