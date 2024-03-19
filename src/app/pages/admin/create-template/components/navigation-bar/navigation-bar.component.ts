import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SurveyFormService } from '../../../../../services/SurveyForm/survey-form.service';
import { SurveyIdService } from '../../../../../services/surveyId/survey-id.service';
import { TimeSavedSurveycreationService } from '../../../../../services/timeSavedSurveyCreation/time-saved-surveycreation.service';
import { SaveTemplateTriggerService } from '../../../../../services/admin/save-template-trigger/save-template-trigger.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
  timeSaved: any;
  surveyTitle!: string;
  previousSurveyTitle: string = '';
  surveyId!: string;
  isCollaborator!: boolean;
  @Output() magicWandBoolean: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() handleOpenStatus: boolean = false;
  @Output() handlePreviewEmit: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private service: TimeSavedSurveycreationService,
    private surveyForm: SurveyFormService,
    private toast: NgToastService,
    private serviceSurveyId: SurveyIdService,
    private triggerTemplateSave: SaveTemplateTriggerService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['surveyId']) {
    }
  }

  ngOnInit() {
    console.log(this.surveyId);
    this.service.time.subscribe({
      next: (res) => {
        this.timeSaved = res;
      },
    });

    this.getSurveyTitle();

    this.getLocallyStoredEditStatus();

    this.serviceSurveyId.surveyIdData.subscribe({
      next: (res) => {
        if (res) {
          this.surveyId = res;
        }
      },
    });
  }

  ngDoCheck(): void {
    if (this.surveyTitle !== this.previousSurveyTitle) {
      this.previousSurveyTitle = this.surveyTitle;
    }

    this.surveyForm.dataForm.subscribe({
      next: (res) => {
        if (res) {
          this.surveyTitle = res?.surveyTitle.title.titleName;
          this.previousSurveyTitle = this.surveyTitle;
        }
      },
    });
  }

  getSurveyTitle() {
    this.surveyForm.dataForm.subscribe({
      next: (res) => {
        if (res) {
          this.surveyTitle = res?.surveyTitle.title.titleName;
          this.previousSurveyTitle = this.surveyTitle;
        }
      },
    });
  }

  handlePreviewStatus(): void {
    this.handlePreviewEmit.emit(true);
  }

  handleOpenAppearance() {
    if (this.isCollaborator) {
      this.magicWandBoolean.emit(!this.handleOpenStatus);
    } else {
      return;
    }
  }

  getLocallyStoredEditStatus() {
    var editItem = localStorage.getItem('edit');
    if (editItem !== null) {
      var edit: boolean = JSON.parse(editItem);
      if (this.isCollaborator === undefined) {
        this.isCollaborator = edit;
      }
    }
  }

  onSaveClick() {
    this.triggerTemplateSave.setTriggerSave(true);
  }
}
