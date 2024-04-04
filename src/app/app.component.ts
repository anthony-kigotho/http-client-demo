import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Fetch JSON data
    this.dataService.getJsonData().subscribe({
      next: data => {
        console.log('JSON Data:', data)
      },
      error: error => {
        console.error('Error fetching JSON data:', error)
      }
  });

    // Fetch image
    this.dataService.getImage().subscribe({
      next: image => {
        const reader = new FileReader();
        reader.onload = () => {
          console.log('Image:', reader.result);
        };
        reader.readAsDataURL(image);
      },
      error: error => {
        console.error('Error fetching image:', error)
      }
  });

    // Add a new product
    const newProduct = {
      title: 'New Product',
      body: 'Description of the new product'
    };
    this.dataService.addProduct(newProduct).subscribe({
      next: response => {
        console.log('Product added successfully:', response)
      },
      error: error => {
        console.error('Error adding product:', error)
      }
  });
  }
}
