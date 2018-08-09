import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  // Creates the updateForm schema with validations.
  createForm() {
    this.updateForm = this.fb.group({
      type: ['', Validators.required],
      language1: '',
      language2: '',
      difficulty: '',
      status: ''
    });
  }

  ngOnInit() {
    // Autopopulate the input fields with the selected document data.
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('type').setValue(this.issue.type);
        this.updateForm.get('language1').setValue(this.issue.language1);
        this.updateForm.get('language2').setValue(this.issue.language2);
        this.updateForm.get('difficulty').setValue(this.issue.difficulty);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }

  // Update the document with input data and redirect to the /list route.
  updateIssue(type, language1, language2, difficulty, status) {
    this.issueService.updateIssue(
      this.id,
      type,
      language1,
      language2,
      difficulty,
      status
    ).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }
}