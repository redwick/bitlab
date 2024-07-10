import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {FileUrl} from "./file-url";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  @Output() closed = new EventEmitter<string>();

  contacts = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    text: new FormControl('', [Validators.required]),
    topic: new FormControl('offer'),
  });

  loaded: FileUrl[] = [];
  dragOver = false;

  constructor(private http: HttpClient) {
  }

  commit() {
    this.closed.emit('success');
  }

  close() {
    this.closed.emit('close');
  }
  onFilesDrop(event: DragEvent) {
    event.preventDefault();
    this.handleFileInput(event.dataTransfer!.files);
  }
  handleFileInput(files: FileList | null) {
    if (files != null){
      for (let x = 0; x < files.length; x++){
        let file = files.item(x);
        if (file != null){
          const formData: FormData = new FormData();
          formData.append('file', file, file.name);
          this.http.post<string>('https://it-bitlab.ru/rest/uploadFile', formData).subscribe(res => {
            this.loaded.push(
              new FileUrl(file.name, res)
            );
          });
        }
      }
    }
  }

  removeFile(file: FileUrl) {
    this.loaded.splice(this.loaded.indexOf(file), 1);
  }
}
