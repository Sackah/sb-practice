import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgToastService } from 'ng-angular-popup';
import { SurveyFormService } from '../../../services/SurveyForm/survey-form.service';
import { DraftSurveySchedulingService } from '../../../services/draft-survey-scheduling/draft-survey-scheduling.service';
import { GetCollaboratorService } from '../../../services/getCollaboratorData/get-collaborator.service';
import { SaveSurveyCreationService } from '../../../services/saveSurvey/save-survey-creation.service';
import { SendSurveyPopupService } from '../../../services/send-SurveyPopup/send-survey-popup.service';
import { SurveyBackgroundTextColorService } from '../../../services/survey-background-text-color/survey-background-text-color.service';
import { SurveyCreationLogicConditionService } from '../../../services/survey-creation-logic-condition/survey-creation-logic-condition.service';
import { SchedulerPopupService } from '../../../services/survey-schedulerPopup/scheduler-popup.service';
import { SurveyIdService } from '../../../services/surveyId/survey-id.service';
import { SBColorScheme } from '../../USER/Pages/servey-creation/components/models/colorScheme';
import { SBForm } from '../../USER/Pages/servey-creation/components/models/form.model';
import { SendSurveyPopupComponent } from '../../USER/Pages/servey-creation/components/components/send-survey-popup/send-survey-popup.component';
import { SurveyCreationPreviewComponent } from '../../USER/Pages/servey-creation/components/survey-creation-space/components/survey-creation-preview/survey-creation-preview.component';
import { AppearanceSideNavComponent } from '../../USER/Pages/servey-creation/components/survey-creation-space/components/appearance-side-nav/appearance-side-nav.component';
import { SurveySchedulerPopupComponent } from '../../USER/Pages/servey-creation/components/components/survey-scheduler-popup/survey-scheduler-popup.component';
import { QuestionAdditionHubComponent } from '../../USER/Pages/servey-creation/components/questions-creation-space/components/question-hub/question-hub.component';
import { SurveyResponseComponent } from '../../USER/Pages/servey-creation/components/survey-creation-space/components/survey-response/survey-response.component';
import { IndividualSurveyResponseComponent } from '../../USER/Pages/servey-creation/components/survey-creation-space/components/individual-survey-response/individual-survey-response.component';
import { AdminQuestionHubComponent } from './components/admin-question-hub/admin-question-hub.component';
import { SaveTemplateTriggerService } from '../../../services/admin/save-template-trigger/save-template-trigger.service';
import { AdminQuestionPreviewComponent } from "./components/admin-question-preview/admin-question-preview.component";

@Component({
    selector: 'app-create-template',
    standalone: true,
    templateUrl: './create-template.component.html',
    styleUrl: './create-template.component.scss',
    imports: [
        NavigationBarComponent,
        SendSurveyPopupComponent,
        SurveyCreationPreviewComponent,
        AppearanceSideNavComponent,
        SurveySchedulerPopupComponent,
        QuestionAdditionHubComponent,
        SurveyResponseComponent,
        IndividualSurveyResponseComponent,
        AdminQuestionHubComponent,
        AdminQuestionPreviewComponent
    ]
})
export class CreateTemplateComponent implements OnInit, OnDestroy {
  constructor(
    private colorScheme: SurveyBackgroundTextColorService,
    private logicCondition: SurveyCreationLogicConditionService,
    private surveyFormService: SurveyFormService,
    private savedButton: SaveSurveyCreationService,
    private route: Router,
    private store: Store,
    private surveyIdService: SurveyIdService,
    private toast: NgToastService
  ) {}

  form = new SBForm();
  componentStatus: string = 'questions';
  isSchedulePopup: boolean = false;
  magicWand!: boolean;
  isPreview: boolean = false;
  surveyModal:boolean = true

  ngOnInit() {
    this.setBlocksCount();

    this.logicCondition.currentConditionQuestion.subscribe({
      next: (res) => {
        this.form.blocks.forEach((block, i) => {
          let blockInd = i;
          block.questions.forEach((question, i) => {
            if (
              res &&
              question.conditions &&
              res.questionIndex === i &&
              res.blockIndex === blockInd
            ) {
              question.conditions.blockIndex = res.blockIndex;
              question.conditions.questionIndex = res.questionIndex;
              question.conditions.choice = res.choice.trim();
              question.conditions.conditionalOptions = res.conditionalOptions;
              question.conditions.question = res.question.trim();
              question.conditions.type = res.type;
              question.conditions.answer = res.answer;
            }
          });
        });
      },
    });

    //  color scheme
    this.colorScheme.currentColorScheme.subscribe({
      next: (colorScheme) => {
        if (colorScheme) {
          this.form.colorScheme = colorScheme;
        }
      },
    });

    this.surveyFormService.dataForm.subscribe({
      next: (res) => {
        if (!res) {
          this.setSurveyForm();
        } else {
          this.form = res;
        }
      },
    });
  }

  ngDoCheck(): void {
    if (this.formLength !== this._formLength) {
      this.setBlocksCount();
      this._formLength = this.formLength;
    }
  }
  

  
  private _formLength = this.form.blocks.length;

  get formLength(): number {
    return this.form.blocks.length;
  }

  setSurveyForm() {
    this.surveyFormService.setSurveyForm(this.form);
  }

  setBlocksCount() {
    this.logicCondition.getNumberOfBlocks(this.form.blocks.length);
  }

  receiveMessage(formReceived: SBForm) {
    this.form = formReceived;
  }

  changeColorScheme(colorScheme: SBColorScheme) {
    this.colorScheme.setColorScheme(colorScheme);
  }

  switchComponent(message: string) {
    if (message === 'settings') {
      this.toast.info({
        detail: 'NOTE',
        summary: 'Feature not available',
        duration: 2000,
      });
      return;
    }
    this.componentStatus = message;
  }

  openAppearanceSideNav(message: boolean) {
    this.magicWand = message;
  }

  handlePreviewStatusEmit(status: boolean) {
    this.isPreview = status;
  }

  handleExitSurvey() {
    const response = confirm('Do you want to exit this survey?');

    if (response) {
      this.route.navigate(['/user/home']);
    }
  }

  ngOnDestroy(): void {
    this.surveyIdService.setSurveyId(undefined);

    this.savedButton.setIsSaved(false);
  }
}
