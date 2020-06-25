import {Component, OnInit, ViewChild} from '@angular/core';
import { IdeasService } from '../../services/ideas.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoginRequest} from '../../models/loginrequest.model';
import {LoginResponse} from '../../models/loginresponse.model';
import {Idea} from '../../models/idea.model';
import {MatTableDataSource} from '@angular/material/table';
import { MatTable } from '@angular/material/table';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})

export class IdeasComponent implements OnInit {
  userTable: FormGroup;
  control: FormArray;
  myformArray = new FormArray([]);
  mode: boolean;
  touchedRows: any;
  ideasResponse$: Idea[];
  updatedIdea: Idea;
  newIdeaID: string;
  selectedIdea: Idea;
  // displayedColumns: string[] = ['content', 'impact', 'ease', 'confidence', 'average_score', 'none'];
  constructor(private ideaService: IdeasService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.touchedRows = [];
    this.userTable = this.fb.group({
      tableRows: this.fb.array([])
    });
    this.control = this.userTable.get('tableRows') as FormArray;
    this.getIdeas();
  }

  ngAfterOnInit() {
    this.control = this.userTable.get('tableRows') as FormArray;
  }

  noIdeas(): boolean{
    return (this.control.length === 0);
  }

  calculateAvg(group: FormGroup){
      this.selectedIdea = group.getRawValue();
      if ((this.selectedIdea.impact != null) && (this.selectedIdea.ease != null) && (this.selectedIdea.confidence != null))
      {
        return ((Number(this.selectedIdea.impact) + Number(this.selectedIdea.ease) + Number(this.selectedIdea.confidence)) / 3).toFixed(2);
      }
  }

  getIdeas(){
    const control =  this.userTable.get('tableRows') as FormArray;
    return this.ideaService.getIdeas()
      .subscribe(data => {
          this.ideasResponse$ = data;
          for (const ideasResponse$Item of this.ideasResponse$) {
            if (ideasResponse$Item.average_score != null) {
              ideasResponse$Item.average_score = parseFloat(ideasResponse$Item.average_score.toFixed(2));
            }
            this.control.push(this.loadIdea(ideasResponse$Item, false));
          }
        },
        err => console.error(err),
        () =>  console.log('get ideas call done'));
  }

  addRow() {
    const control =  this.userTable.get('tableRows') as FormArray;
    this.control.push(this.loadIdea(new Idea(), true));
  }

  deleteRow(index: number, group: FormGroup) {
    const control =  this.userTable.get('tableRows') as FormArray;
    this.selectedIdea = group.getRawValue();
    return this.ideaService.deleteIdea(this.selectedIdea.id)
      .subscribe(data => {
          control.removeAt(index);
          },
        err => console.error(err),
        () =>  console.log('Idea ' + this.selectedIdea.id + 'deleted'));
  }

  editRow(group: FormGroup) {
    group.get('isEditable').setValue(true);
  }

  doneRow(group: FormGroup) {
    this.selectedIdea = group.getRawValue();
    group.get('isEditable').setValue(false);
    if (this.selectedIdea.id == null) {
      console.log('Adding a new idea');
      return this.ideaService.createIdea(this.selectedIdea)
        .subscribe(data => {
            this.newIdeaID = data.id;
            // tslint:disable-next-line:no-debugger
            // debugger;
            console.log('added new idea with id ' + this.newIdeaID);
          },
          err => console.error(err),
          () => this.updateView(group));
    }
    else {
      console.log('updating idea ' + this.selectedIdea);
      return this.ideaService.updateIdea(this.selectedIdea)
        .subscribe(data => {
            this.updatedIdea = data;
            console.log('Idea updated, content ' + this.updatedIdea.content);
          },
          err => console.error(err),
          () => group.get('average_score').setValue(parseFloat(this.updatedIdea.average_score.toFixed(2))));
    }
  }

  updateView(group: FormGroup){
    group.get('id').setValue(this.newIdeaID);
    group.get('average_score').setValue(this.calculateAvg(group));
  }

  saveUserDetails() {
    console.log(this.userTable.value);
  }

  get getFormControls() {
    const control = this.userTable.get('tableRows') as FormArray;
    return control;
  }

  loadIdea(newIdea: Idea, editable: boolean): FormGroup {
    return this.fb.group({
      id: [newIdea.id, Validators.required],
      content: [newIdea.content, Validators.required],
      impact: [newIdea.impact, [Validators.required]],
      ease: [newIdea.ease, [Validators.required]],
      confidence: [newIdea.confidence, [Validators.required]],
      average_score: [newIdea.average_score],
      isEditable: [editable]
    });
  }
}
