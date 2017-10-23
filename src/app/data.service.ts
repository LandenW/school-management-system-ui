import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { User } from "./user";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/expand';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/do';




@Injectable()
export class DataService {
  
    private baseUrl = 'https://aqueous-everglades-19542.herokuapp.com/api/';

    options = { withCredentials: true};
    private currentUser: User;
    found = false;
    userChanged: Subject<User>;

    constructor (private http: Http) {this.userChanged = new Subject<User>();}

    getRecords(endpoint: string): Observable<any[]> {
        let apiUrl = this.baseUrl+endpoint;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRecord(endpoint: string, id): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getTeacherAssignments(endpoint: string, id: number, endpoint2: string): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}/${endpoint2}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getMultRecords(endpoint: string, gradeLevel:number, endpoint2: string): Observable<any[]> {
        let apiUrl = `${this.baseUrl}${endpoint}/${gradeLevel}/${endpoint2}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    deleteRecord(endpoint: string, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.delete(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    editRecord(endpoint: string, record:object, id:number): Observable<object> {
        let apiUrl = `${this.baseUrl}${endpoint}/${id}`;
        return this.http.put(apiUrl, record)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addRecord(endpoint: string, record:object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}`;
        console.log(apiUrl)
        console.log(record)
        return this.http.post(apiUrl, record)
            .map(this.extractData);
    }


    addStudentRecord(endpoint: string, teacherId:number, endpoint2: string, record:object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}/${teacherId}/${endpoint2}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record)
            .map(this.extractData);
    }

    addAssignment(endpoint: string, teacherId:number, endpoint2: string, record:object): Observable<any> {
        let apiUrl = `${this.baseUrl}${endpoint}/${teacherId}/${endpoint2}`;
        console.log(apiUrl)
        return this.http.post(apiUrl, record)
            .map(this.extractData);
    }

    getGradesForOneRecord(endpoint: string, endpoint2: string, id): Observable<any[]> {
        let apiUrl = `${this.baseUrl}${endpoint}/${endpoint2}/${id}`;
        return this.http.get(apiUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    login(endpoint: string, username: string, password: string): Observable<User>{
        let apiUrl = `${this.baseUrl}${endpoint}`;      
        const payload = { username, password }; //creates property with name email to value of the same name; like email: email, password: password              
        return this.http
          .put(apiUrl, payload, this.options)
          .map(response => response.status === 200 ? response.json(): null) //this produces a User object; response is juat a variable name
          .do(user=> this.currentUser = user) //resets current user field
          .do(user => this.userChanged.next(user));//when a user goes by - emit an event; user here is just a variable name
      }
    

      logout(endpoint: string): Observable<User>{
        let apiUrl = `${this.baseUrl}${endpoint}`;        
        return this.http
          .delete(apiUrl, this.options)
          .map(response => null) //TODO come back and finish failure
          .do(user=> this.currentUser = null) //resets current user field
          .do(user=> this.userChanged.next(null)); //broadcast stuff happened    
      }
    
      getCurrentUser() { 
       return this.currentUser;
      }

    private extractData(res: Response) {
        let results = res.json();
        return results || [];
    }

    private handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if(typeof error._body === "string"){
            errMsg = error._body
        }else{
            if (error instanceof Response) {
                if(error.status === 0){
                    errMsg = "Error connecting to API"
                }else{
                    const errorJSON = error.json();
                    errMsg = errorJSON.message;
                }
            }
        }

        return Observable.throw(errMsg);
    }


}