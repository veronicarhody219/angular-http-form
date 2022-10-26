import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Course } from 'src/app/interface/course';
import { ProductService } from 'src/app/service/product.service';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  isFetching: boolean = false;
  editMode: boolean = false;
  currentId: string;
  url: string =
    'https://course-angular-app-default-rtdb.asia-southeast1.firebasedatabase.app';
  allCourses: Course[] = [];

  @ViewChild('myForm') form: NgForm;

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.onGetCourse();
  }

  onGetCourse() {
    this.isFetching = true;
    this.productService.getCourses().subscribe((courses) => {
      this.allCourses = courses;
      this.isFetching = false;
    });
  }
  onSubmit(course: Course) {
    if (!this.editMode) {
      this.productService.createCourse(course);
    } else {
      this.productService.updateCourse(this.currentId, course);
    }
  }

  onDeleteCourse(id: string) {
    this.productService.deleteCourse(id);
  }
  onDeleteAllCourse() {
    this.productService.deleteAllCourse();
  }
  onUpdateCourse(id: string) {
    this.currentId = id;
    const currentProduct = this.allCourses.find((p) => p.id === id);
    this.form.setValue({
      fname: currentProduct.fname,
      lname: currentProduct.lname,
      email: currentProduct.email,
      address: currentProduct.address,
      gender: currentProduct.gender,
    });

    this.editMode = true;
  }
}
