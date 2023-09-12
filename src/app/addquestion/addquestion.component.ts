import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css'],
})

export class AddquestionComponent {

  questionForm: FormGroup;
  subjects: any[] = [];

  constructor(private fb: FormBuilder, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadSubjects();
  }

  initForm(): void {
    this.questionForm = this.fb.group({
      subjectId: ['', Validators.required],
      text: ['', Validators.required],
      options: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required)
      ]),
      answer: ['', Validators.required]
    });
  }



  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }

  onSubmit(): void {
    if (this.questionForm.valid) {
      this.subjectService.addQuestion(this.questionForm.value).subscribe(() => {
        alert('Question added!');
        this.questionForm.reset();
      });
    } else {
      alert('Please fill out the form corsrectly!');
    }
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  get myControl(): FormControl {
    return this.questionForm.get('myControlName') as FormControl;
  }


}
