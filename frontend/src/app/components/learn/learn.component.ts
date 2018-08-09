import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Issue } from '../models/issue.model'
import { IssueService } from '../../services/issue.service'
import { DISABLED } from '../../../../node_modules/@angular/forms/src/model';

class Id {
  _id: string;
}

class Result {
  result: number;
  correct: string;
}

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {


  learnForm: FormGroup;
  toLearn: Id[];
  currentWord: string;
  result: string;
  id: string;
  done: boolean = false;
  totalWords: number;
  progress = 0;
  buttonText: string;

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
  ) {
    this.learnForm = this.fb.group({
      attempt: ['', Validators.required],
    });
  }

  getIssueIds() {
    this.issueService
      .getIssueIds()
      .subscribe((data: Id[]) => {
        console.log('ids:', data);
        this.toLearn = data;
        this.totalWords = data.length;
        this.getIssue();
      });
  }

  getIssue() {
    this.buttonText = 'Check';
    var id = this.toLearn.pop();
    this.id = id._id;
    this.issueService.getIssueById(this.id)
      .subscribe((issue: Issue) => {
        this.currentWord = issue.language1;
      });
  }

  checkWord(attempt: string) {
    this.buttonText = 'Continue';
    this.learnForm.get('attempt').disable();
    this.issueService.getResult(this.id, attempt)
      .subscribe((response: Result) => {
        if (response.result) {
          this.result = 'Correct!';
        } else {
          this.result = `Incorrect! The correct answer was "${response.correct}".`;
        }
        this.progress += 100 / this.totalWords;
      });
    }
    
    continue(attempt: string) {
    if (this.buttonText == 'Continue') {
      if (this.toLearn.length === 0) {
        this.done = true;
      } else {
        this.result = '';
        this.learnForm.get('attempt').setValue('');
        this.learnForm.get('attempt').enable();
        this.getIssue()
      }
    } else {
      this.learnForm.get('attempt').enable();
      this.checkWord(attempt);
    }
  }
  
  skip() {
    if (this.toLearn.length === 0) {
      this.done = true;
    } else {
      this.progress += 100 / this.totalWords;
      this.getIssue();
    }
  }

  send(event: any, attempt: string) {
    if (event.keyCode == 13) {
      this.checkWord(attempt);
    }
  }

  ngOnInit() {
    this.getIssueIds();
  }

}
