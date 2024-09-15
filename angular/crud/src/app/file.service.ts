import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor() { }

  readFile(filePath: string): Promise<string> {
    return (window as any).electron.readFile(filePath)
      .then((response: any) => response.error ? Promise.reject(response.error) : response);
  }

  writeFile(filePath: string, content: string): Promise<void> {
    return (window as any).electron.writeFile(filePath, content)
      .then((response: any) => response.error ? Promise.reject(response.error) : undefined);
  }

  deleteFile(filePath: string): Promise<void> {
    return (window as any).electron.deleteFile(filePath)
      .then((response: any) => response.error ? Promise.reject(response.error) : undefined);
  }
}
