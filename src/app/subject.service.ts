import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Fetch all subjects
  getSubjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/subjects`);
  }

  // Fetch questions by subject ID
  getQuestionsBySubject(subjectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/questions?subjectId=${subjectId}`);
  }

  // Add a new subject
  addSubject(subject: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/subjects`, subject);
  }

  // Add a new question
  addQuestion(question: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/questions`, question);
  }

  getUserScores(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/questions?userId=${userId}`);
  }


  updateUserScore(userId: number, subjectId: string, score: number): Observable<any> {
    console.log('userId:', userId);
    console.log('subjectId:', subjectId);
    console.log('score:', score);

    const scoreUpdate = {};
    scoreUpdate[`score.${subjectId}`] = score;
    console.log('scoreUpdate:', scoreUpdate);

    return this.http.patch<any>(`${this.API_URL}/users/${userId}`, scoreUpdate);
  }


  getTotalScore(userId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${userId}`).pipe(
      map(user => {
        let totalScore = 0;
        for (let key in user) {
          if (key.startsWith("score.")) {
            totalScore += user[key];
          }
        }
        user.totalScore = totalScore;
        return user;
      }),
      switchMap(updatedUser => {
        // Once we have updated the user object with the totalScore, we make an HTTP PATCH request to save it back
        return this.http.patch<any>(`${this.API_URL}/users/${userId}`, { totalScore: updatedUser.totalScore }).pipe(
          // Return the updated user after saving
          map(() => updatedUser)
        );
      })
    );
  }


  getUserDetails(userId: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/users/${userId}`);
  }

}
