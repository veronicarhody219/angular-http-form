import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Course } from '../interface/course';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url: string =
    'https://course-angular-app-default-rtdb.asia-southeast1.firebasedatabase.app';
  allCourses: Course[] = [];

  constructor(private http: HttpClient) {}

  createCourse(course: Course) {
    const header = new HttpHeaders({ myHeaders: 'ngocdiep' });
    console.log(course);
    this.http
      .post(`${this.url}/course.json`, course, { headers: header })
      .subscribe((res) => console.log(res));
  }

  getCourse() {}
  getCourses() {
    return this.http.get(`${this.url}/course.json`).pipe(
      map((res) => {
        const courses = [];
        for (let key in res) {
          if (res.hasOwnProperty(key)) {
            courses.push({ ...res[key], id: key });
          }
        }
        return courses;
      })
    );
  }
  updateCourse(id: string, course: Course) {
    return this.http.put(`${this.url}/course/${id}.json`, course).subscribe();
  }

  deleteCourse(id: string) {
    this.http.delete(`${this.url}/course/${id}.json`).subscribe();
  }
  deleteAllCourse() {
    this.http.delete(`${this.url}/course.json`).subscribe();
  }
}
