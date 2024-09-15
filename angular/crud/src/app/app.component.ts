import { Component } from '@angular/core';

import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  filePath = 'test.txt';
  fileContent = '';

  constructor(private fileService: FileService) {}

  createFile() {
    this.fileService.writeFile(this.filePath, this.fileContent)
      .then(() => {alert('File Created')
      this.fileContent = ''})
      .catch(err => alert('Error: ' + err));
  }

  readFile() {
    this.fileService.readFile(this.filePath)
      .then(content => this.fileContent = content)
      .catch(err => alert('Error: ' + err));
  }

  updateFile() {
    this.fileService.writeFile(this.filePath, this.fileContent)
      .then(() => alert('File Updated'))
      .catch(err => alert('Error: ' + err));
  }

  deleteFile() {
    this.fileService.deleteFile(this.filePath)
      .then(() => alert('File Deleted'))
      .catch(err => alert('Error: ' + err));
  }
}
