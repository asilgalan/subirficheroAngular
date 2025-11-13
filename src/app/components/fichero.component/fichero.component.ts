import { Component, inject } from '@angular/core';
import { FileService } from '../../services/file.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { File } from '../../interface/file';

@Component({
  selector: 'app-fichero',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fichero.component.html',
  styleUrl: './fichero.component.css',
})
export class FicheroComponent {
  private fileservice = inject(FileService);
  private fb = inject(FormBuilder);

  createForm: FormGroup = this.fb.group({
    fileName: ['', [Validators.required]],
    fileContent: ['', [Validators.required]]
  });

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;
      
      this.createForm.patchValue({
        fileName: file.name,        
        fileContent: base64.split(',')[1]
      });
    };

    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.createForm.invalid) {
      console.log('Formulario inválido');
      return;
    }


    const {fileName,fileContent}=this.createForm.value;
    
    const newfile :File= {
      fileName: fileName,
      fileContent:fileContent
    };

    this.fileservice.createFile(newfile).subscribe({
      next: (response) => {
        console.log('Archivo subido exitosamente', response);
        this.createForm.reset();
      },
      error: (error) => {
        console.error('Error al subir archivo', error);
      }
    });
  }
}