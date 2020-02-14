import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray , FormBuilder, FormControlName } from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {
 get experience()  {return this.profileForm.get('experienceForm') as FormArray; }
 get skills() {return this.profileForm.get('SkillsForm') as FormArray; }
  myForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillsCtrl = new FormControl();
  SkillsInput: any ;
  auto: any ;
  Skls: string[] = [''];
  allSkills: string[] = ['French', 'English', 'tech', 'communication'];
  filteredSkills: Observable< string[] >;
  // @ViewChild('SkillsInput') fruitInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete: MatAutocomplete;
  hide = true;
  profileForm = new FormGroup({
    infoForm : new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    lastName : new FormControl('', Validators.required),
    email : new FormControl('', [ Validators.required , Validators.email]),
    mobile : new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*') , Validators.minLength(10)])}),
    SkillsForm: new FormArray ([]),
    experienceForm : new FormArray([this.addxp()])


  });


  constructor() {  this.filteredSkills = this.skillsCtrl.valueChanges.pipe(
    startWith(null),
    map((skl: string | null) => skl ? this._filter(skl) : this.allSkills.slice()));
   }

  ngOnInit() {

  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.skills.push(new FormControl(value));

    }
    if (input) {
      input.value = '';
    }
    this.skillsCtrl.setValue(null);
  }
  remove(i): void {
 this.skills.removeAt(i);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(new FormControl(event.option.viewValue));
    this.SkillsInput.nativeElement.value = '';
    this.skillsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(Skl => Skl.toLowerCase().indexOf(filterValue) === 0);
  }

   addclick() {
    this.experience.push(this.addxp()) ;
  }
  addxp() {
    return new FormGroup({
      Post :  new FormControl('',[Validators.required]),
      Society : new FormControl(''),
      date1 : new FormControl (''),
      date2 : new FormControl (''),
    });


  }
  delete(i) {
    this.experience.removeAt(i);
  }
}
