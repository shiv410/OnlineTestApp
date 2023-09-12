import { Component } from '@angular/core';
import { SubjectService } from '../subject.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-displayquestion',
  templateUrl: './displayquestion.component.html',
  styleUrls: ['./displayquestion.component.css']
})
export class DisplayquestionComponent {

  questions: any[] = [];
  currentQuestionIndex = 0;
  quizForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private subjectService: SubjectService,
    public authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    let subjectId: number = 0;

    if (this.route.snapshot.paramMap) {
      subjectId = +this.route.snapshot.paramMap.get('subjectId')!;
    }
    this.loadQuestions(subjectId);
    this.buildQuizForm();

  }

  loadQuestions(subjectId: number): void {
    this.subjectService.getQuestionsBySubject(subjectId).subscribe(data => {
      this.questions = data;
    });
  }

  buildQuizForm(): void {
    this.quizForm = this.fb.group({
      answer: ['']
    });
  }

  nextQuestion(): void {
    if (this.quizForm.value.answer === this.questions[this.currentQuestionIndex].answer) {
      this.userScore++;
    }
    this.quizForm.reset();
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      alert(`Quiz completed! Your score is ${this.userScore} out of ${this.questions.length}`);
    }
  }


  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  resetQuiz(): void {
    this.currentQuestionIndex = 0;
    this.userScore = 0;
    this.quizForm.reset();
  }


  userScore = 0;
  isScoreSaved = false;
  isQuizSubmitted = false;
  totalScore: number = 0;


  submitQuiz(): void {
    if (this.quizForm.value.answer === this.questions[this.currentQuestionIndex].answer) {
      this.userScore++;
    }


    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    this.subjectService.updateUserScore(this.authService.currentUserValue.id, subjectId!, this.userScore).subscribe(() => {
      this.isQuizSubmitted = true;
    });


    this.subjectService.getTotalScore(this.authService.currentUserValue.id).subscribe(total => {
      this.totalScore = total;
      console.log(total);
    });


    // alert(`Quiz completed! Your score is ${this.userScore} out of ${this.questions.length}`);
    this.isQuizSubmitted = true;
    this.resetQuiz();
    this.router.navigate(['/']);

  }

}
