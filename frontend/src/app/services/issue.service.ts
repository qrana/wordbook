import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from '../../../node_modules/rxjs';
import { Issue } from '../components/models/issue.model';
import { findLast } from '../../../node_modules/@angular/compiler/src/directive_resolver';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  // Backend server URI
  // Set in /backend/server.js
  uri = 'http://localhost:4000';

  // The name of the MongoDB database collection
  collection = 'issues';

  constructor(private http: HttpClient) { }

  // Fetch all documents
  getIssues() {
    return this.http.get(`${this.uri}/${this.collection}`);
  }
  
  // Fetch ids of up to 10 documents
  getIssueIds() {
    return this.http.get(`${this.uri}/${this.collection}/ids`);
  }
  
  // Fetch a single document by _id
  getIssueById(id) {
    return this.http.get(`${this.uri}/${this.collection}/${id}`);
  }

  // Check whether the attempt was the correct translation
  getResult(id, attempt) {
    return this.http.get(`${this.uri}/${this.collection}/check/${id}&${attempt}`)
  }
  
  // Create new document
  addIssue(type, language1, language2) {
    const issue = {
      type: type,
      language1: language1,
      language2: language2,
    };
    return this.http.post(`${this.uri}/${this.collection}/add`, issue);
  }
  
  // Update existing document
  updateIssue(id, type, language1, language2, difficulty, status) {
    const issue = {
      type: type,
      language1: language1,
      language2: language2,
      difficulty: difficulty,
      status: status
    };
    return this.http.post(`${this.uri}/${this.collection}/update/${id}`, issue);
  }

  // Delete existing document
  deleteIssue(id) {
    return this.http.delete(`${this.uri}/${this.collection}/delete/${id}`);
  }
}
