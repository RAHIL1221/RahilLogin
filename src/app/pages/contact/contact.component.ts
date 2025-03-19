import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  imports:[CommonModule],
  selector: 'app-upload',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  selectedFile: File | null = null;
  pdfUrl: SafeResourceUrl | null = null;

  // Inject DomSanitizer
  constructor(private sanitizer: DomSanitizer

  ) {}

  // Handle file selection
  onFileSelected(event: Event): void {
    
    const input = event.target as HTMLInputElement;
    
    if (input && input.files) {
      const file = input.files[0];
      if (file && file.type === 'application/pdf') {
        this.selectedFile = file;  // Store the selected PDF file
        // Create an object URL for the selected file and sanitize it
        const objectUrl = URL.createObjectURL(file);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl); // Sanitize the URL
        console.log('Selected PDF File:', file);
      } else {
        alert('Please select a valid PDF file.');
      }
    }
  }

  // Optionally, upload the file (e.g., to a server) when needed
  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      // Example: Send the file to the server using an HTTP POST request
      // this.httpClient.post('your-server-endpoint', formData).subscribe(response => {
      //   console.log('File uploaded successfully', response);
      // });
    } else {
      alert('No file selected!');
    }
  }
}