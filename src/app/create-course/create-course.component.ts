import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";
import { Course } from "../model/course";
import { catchError, concatMap, last, map, take, tap } from "rxjs/operators";
import { from, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { AngularFireStorage } from "@angular/fire/storage";
import firebase from "firebase/app";
import Timestamp = firebase.firestore.Timestamp;
import { CourseServices } from "../services/courses.service";

@Component({
  selector: "create-course",
  templateUrl: "create-course.component.html",
  styleUrls: ["create-course.component.css"],
})
export class CreateCourseComponent implements OnInit {
  courseId: string;
  percentageChanges$: Observable<number>;
  iconUrl: string;

  form = this.fb.group({
    description: ["", Validators.required],
    category: ["BEGINNER", Validators.required],
    url: ["", Validators.required],
    longDescription: ["", Validators.required],
    promo: [false],
    promoStartAt: [null],
  });

  constructor(
    private fb: FormBuilder,
    private coursesService: CourseServices,
    private afs: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {
    this.courseId = this.afs.createId();
  }

  uploadThumbnail(event) {
    const file: File = event.target.files[0];
    console.log(file.name);

    const filePath = `courses/${this.courseId}/${file.name}`;
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    })

    this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges()
    .pipe(
      last(),
      concatMap(() => this.storage.ref(filePath).getDownloadURL()),
      tap(url => this.iconUrl = url),
      catchError(err => {
          console.log(err);
          alert("Could not create thumnail url.");
          return throwError(err);
        }) 
    )
    .subscribe();
  }

  onCreateCourse() {
    const val = this.form.value;

    const newCourse: Partial<Course> = {
      description: val.description,
      url: val.url,
      longDescription: val.longDescription,
      promo: val.promo,
      categories: [val.category],
    };

    newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);

    this.coursesService
      .createCourse(newCourse, this.courseId)
      .pipe(
        tap((course) => {
          console.log("Created new course: ", course);
          this.router.navigateByUrl("/courses");
        }),
        catchError((err) => {
          console.log(err);
          alert("Couldn't create the course");
          return throwError(err);
        })
      )
      .subscribe();
  }
}
