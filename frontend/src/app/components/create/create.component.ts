import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router) {
    // Creates the createForm schema with validations.
    this.createForm = this.fb.group({
      type: ['', Validators.required],
      language1: ['', Validators.required],
      language2: ['', Validators.required],
    });
  }

  // Add a new document with the entered data and redirect to the /list route.
  addIssue(type, language1, language2) {
    this.issueService.addIssue(type, language1, language2)
      .subscribe(() => {
         this.router.navigate(['/list']);
      });
  }

  ngOnInit() {
    this.createForm.get('type').setValue('o')
  }
}