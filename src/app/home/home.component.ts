import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { CourseServices } from '../services/courses.service';
import { UserService } from '../services/user.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(
      private router: Router,
      private CoursesService: CourseServices,
      public user: UserService) {
     
    }

    ngOnInit() {
      this.reloadCourses();

    }

    reloadCourses() {

      this.beginnersCourses$ = this.CoursesService.loadCoursesByCategory("BEGINNER");

      this.advancedCourses$ = this.CoursesService.loadCoursesByCategory("ADVANCED");

    }

}
