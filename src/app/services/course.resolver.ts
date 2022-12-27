import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Course } from "../model/course";
import { CourseServices } from "./courses.service";

@Injectable({
    providedIn: "root"
}) 
export class CourseResolver implements Resolve<Course> {

    constructor(private coursesService:CourseServices ) {

    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Course> {
        
        const courseUrl = route.paramMap.get('courseUrl');

        return this.coursesService.findCourseByUrl(courseUrl);
    }

}