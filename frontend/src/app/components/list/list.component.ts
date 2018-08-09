import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IssueService } from '../../services/issue.service';
import { Issue } from '../models/issue.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  columns = [
    'Type',
    'First translation',
    'Second Translation',
    'Difficulty',
    'Status',
    'Actions'
    ]
  
  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    // Fetch all documents
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService
      .getIssues()
      .subscribe((data: Issue[]) => {
        this.issues = data;
        console.log('Data requested');
        console.log(this.issues);
      });
  }

  editIssue(id) {
    this.router.navigate([`edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
