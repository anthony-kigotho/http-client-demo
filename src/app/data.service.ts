import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  // Method to fetch JSON data
  getJsonData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts`).pipe(
      catchError(error => {
        console.error('Error fetching JSON data:', error);
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    );
  }

  // Method to fetch an image
  getImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/photos/1`, { responseType: 'blob' }).pipe(
      catchError(error => {
        console.error('Error fetching image:', error);
        return throwError(()=> new Error('Unable to fetch image.'));
      })
    );
  }

  // Method to simulate adding a new post
  addPost(newPost: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`, newPost).pipe(
      catchError(error => {
        console.error('Error adding post:', error);
        return throwError(()=> new Error('Failed to add post.'));
      })
    );
  }
}
