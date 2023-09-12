import { Component } from '@angular/core';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  subjects: any[] = [];

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(data => {
      this.subjects = data;
    });
  }


}
