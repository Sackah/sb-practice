import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SurveyFormService } from '../../../../../services/SurveyForm/survey-form.service';
import { SurveyCreationSidenavService } from '../../../../../services/appearance-sidenav/survey-creation-sidenav.service';
import { DraftSurveySchedulingService } from '../../../../../services/draft-survey-scheduling/draft-survey-scheduling.service';
import { GetCollaboratorService } from '../../../../../services/getCollaboratorData/get-collaborator.service';
import { LogoUploadService } from '../../../../../services/logo-upload-surveyCreation/logo-upload.service';
import { SaveSurveyCreationService } from '../../../../../services/saveSurvey/save-survey-creation.service';
import { SurveyBackgroundTextColorService } from '../../../../../services/survey-background-text-color/survey-background-text-color.service';
import { SurveyCollaborationService } from '../../../../../services/survey-collaboration/survey-collaboration.service';
import { SurveyIdService } from '../../../../../services/surveyId/survey-id.service';
import { SurveyCardViewService } from '../../../../../services/surveycardView/survey-card-view.service';
import { TimeSavedSurveycreationService } from '../../../../../services/timeSavedSurveyCreation/time-saved-surveycreation.service';
import { SBBlock } from '../../../../USER/Pages/servey-creation/components/models/block.model';
import { SBColorScheme } from '../../../../USER/Pages/servey-creation/components/models/colorScheme';
import { SBForm } from '../../../../USER/Pages/servey-creation/components/models/form.model';
import { LogoUploadedComponent } from '../../../../USER/Pages/servey-creation/components/questions-creation-space/components/logo-uploaded/logo-uploaded.component';
import { TitleComponent } from '../../../../USER/Pages/servey-creation/components/components/title/title.component';
import { BlockComponent } from '../../../../USER/Pages/servey-creation/components/components/block/block.component';
import { SaveTemplateTriggerService } from '../../../../../services/admin/save-template-trigger/save-template-trigger.service';
import { TitleModalComponent } from '../title-modal/title-modal.component';

@Component({
  selector: 'app-admin-question-hub',
  standalone: true,
  templateUrl: './admin-question-hub.component.html',
  styleUrl: './admin-question-hub.component.scss',
  imports: [
    LogoUploadedComponent,
    TitleComponent,
    TitleModalComponent,
    BlockComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminQuestionHubComponent implements OnInit, OnDestroy {
  timerId!: any;
  timeSaved: any;
  logoUrl!: string | ArrayBuffer | null;
  loader: boolean = false;
  isSaved!: boolean;
  isDraft!: boolean;
  isSaveSurvey!: boolean;
 

  @Input() openUpload!: string;
  @Output() formObject: EventEmitter<SBForm> = new EventEmitter<SBForm>();
  form!: SBForm;
  @Input() formParent!: SBForm;
  @Input() surveyModal!: boolean;

  constructor(
    private service: TimeSavedSurveycreationService,
    private sidebarService: SurveyCreationSidenavService,
    private logoService: LogoUploadService,
    private colorScheme: SurveyBackgroundTextColorService,
    private sendSurvey: SaveSurveyCreationService,
    private toast: NgToastService,
    private surveyFormService: SurveyFormService,
    private cardViewService: SurveyCardViewService,
    private serviceSurveyId: SurveyIdService,
    private triggerTemplateSave: SaveTemplateTriggerService
  ) {
    this.sidebarService.currentStyle.subscribe({
      next: (style) => {
        if (style) {
          switch (style['type']) {
            case 'question':
              this.form.blocks.forEach((block) => {
                block.questions.forEach((question) => {
                  question.title.style.fontSize = style.value;
                });
              });
              break;
            case 'text':
              // this.form.text.style = style.value;
              break;
            case 'block-header':
              this.form.blocks.forEach((block) => {
                block.title.style.fontSize = style.value;
              });
              break;
            case 'title-header':
              this.form.surveyTitle.title.style.fontSize = style.value;
              break;
          }
        }
      },
    });

    // ....font family

    this.sidebarService.currentFont.subscribe({
      next: (style) => {
        if (style) {
          switch (style['type']) {
            case 'question':
              this.form.blocks.forEach((block) => {
                block.questions.forEach((question) => {
                  question.title.style.fontFamily = style.fontFamily;
                });
              });
              break;
            case 'text':
              // this.form.text.style = style.value;
              break;
            case 'block-header':
              this.form.blocks.forEach((block) => {
                block.title.style.fontFamily = style.fontFamily;
              });
              break;
            case 'title-header':
              this.form.surveyTitle.title.style.fontFamily = style.fontFamily;
              break;
          }
        }
      },
    });

    // ....logo alignment

    this.sidebarService.currentLogoAlignment.subscribe({
      next: (style) => {
        if (style) {
          switch (style['type']) {
            case 'logo':
              this.form.logo.style.alignment = style.alignment;
              break;
          }
        }
      },
    });
  }

  ngOnInit() {
    this.isPopup = false;
    

    this.sendSurvey.isSavedStatus.subscribe({
      next: (res) => {
        this.isSaved = res;
      },
    });

    this.getLogoUrl();

    this.uploadLogoStatus();

    this.getColorScheme();

    this.onTriggerTemplateSave();

    setInterval(() => {
      localStorage.setItem('survey', JSON.stringify(this.form));
      const currentTime = new Date();
      this.timeSaved = this.formatTime(currentTime);
      this.service.setTimeSaved(this.timeSaved);
    }, 2 * 60 * 1000);

    this.surveyFormService.dataForm.subscribe({
      next: (res) => {
        if (res) {
          this.form = res;
          this.serviceSurveyId.setSurveyId(res.id as string);
        }
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['uploaded_logo']) {
      const newUploadedLogo = changes['uploaded_logo'].currentValue;
    }
    if (changes['form']) {
    }
    if (changes['isDraft']) {
    }
    if (changes['saveSurvey']) {
      this.onTriggerTemplateSave();
    }
  }

  getSurveyTemplateDetails(data: { title: string; category: string }) {
    this.form.surveyTitle.title.titleName = data.title;
    this.form.category = data.category;
  }

  btnCloseModal(status: boolean) {
    this.surveyModal = status;
  }

  sendFormObject(): void {
    this.formObject.emit(this.form);
  }

  handleCloseCategoryModal() {
    this.surveyModal = false;
  }

  getLogoUrl() {
    this.logoService.data.subscribe({
      next: (res) => {
        if (res) {
          this.form.logo.url = res as string;
        }
      },
    });
  }

  uploadLogoStatus() {
    this.logoService.openUpload.subscribe({
      next: (res) => {
        if (res === 'openPopUp') {
          this.handleOpenPop();
        }
      },
    });
  }

  getColorScheme() {
    this.colorScheme.currentColorScheme.subscribe({
      next: (colorScheme) => {
        if (colorScheme) {
          this.form.colorScheme = colorScheme;
        }
      },
    });
  }

  // onInitFunc

  changeColorScheme(colorScheme: SBColorScheme) {
    this.colorScheme.setColorScheme(colorScheme);
  }

  isTitle: boolean = false;
  isDescription: boolean = false;
  isBlockName: boolean = false;
  isQuestion: boolean = false;
  isOptions: boolean = false;

  checkForm() {
    if (this.form) {
      if (this.form.surveyTitle.title.titleName) {
        this.isTitle = true;
      }

      if (this.form.surveyTitle.description.detail) {
        this.isDescription = true;
      }

      this.form.blocks.forEach((block) => {
        if (block.title.titleName) {
          this.isBlockName = true;
        }

        block.questions.forEach((question) => {
          if (question.title.question) {
            this.isQuestion = true;
          }

          if (question.options) {
            this.isOptions = true;
          }
        });
      });
    }
  }

  onTriggerTemplateSave() {
    this.triggerTemplateSave.triggerSaveStatus.subscribe({
      next: (res) => {
        if (res === true) {
          this.isSaveSurvey = res;
          this.onSendClick();
        }
      },
    });
    this.isSaveSurvey = false;
  }

  onSendClick() {
    if (!this.isSaved) {
      if (this.isDraft) {
        this.updateSurvey();
      } else {
        this.saveSurvey();
      }
    } else {
      return;
    }
  }

  saveSurvey() {
    console.log(this.form);
    this.checkForm();
    if (
      this.isTitle &&
      this.isDescription &&
      this.isBlockName &&
      this.isQuestion &&
      this.isOptions
    ) {
      this.loader = true;
      this.cardViewService.cardView.subscribe({
        next: (value) => {
          this.form.surveyView = value;
        },
      });

      this.sendSurvey.saveSurvey(this.form).subscribe({
        next: (res) => {
          console.log(res);
          this.form.id = res.surveyId;
          this.serviceSurveyId.setSurveyId(res.surveyId);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Survey Saved Successfull',
            duration: 2000,
          });
          this.loader = false;
          const currentTime = new Date();
          this.timeSaved = this.formatTime(currentTime);
          this.service.setTimeSaved(this.timeSaved);
          this.sendSurvey.setIsSaved(true);
        },
        error: (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: err.error.message,
            duration: 2000,
          });
          this.loader = false;
        },
      });
    } else {
      this.toast.info({
        detail: 'INFORMATION',
        summary: 'Complete filling out the form',
        duration: 2000,
      });
      return;
    }

    this.sendSurvey.isSavedStatus.subscribe({
      next: (value) => {
        this.isSaved = value;
      },
    });
  }

  updateSurvey() {
    this.checkForm();
    // Update form
    if (
      this.isTitle &&
      this.isDescription &&
      this.isBlockName &&
      this.isQuestion &&
      this.isOptions
    ) {
      this.loader = true;
      if (this.form.id) {
        this.cardViewService.cardView.subscribe({
          next: (value) => {
            this.form.surveyView = value;
          },
        });

        this.sendSurvey.updateSurvey(this.form, this.form.id).subscribe({
          next: (res) => {
            this.serviceSurveyId.setSurveyId(res.id);
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Survey Updated Successfull',
              duration: 2000,
            });
            this.loader = false;
            const currentTime = new Date();
            this.timeSaved = this.formatTime(currentTime);
            this.service.setTimeSaved(this.timeSaved);
          },
          error: (err) => {
            this.toast.error({
              detail: 'ERROR',
              summary: err.error.message,
              duration: 2000,
            });
            this.loader = false;
          },
        });
        // this.websocketService.sendUpdate(this.form.id, this.form);
        // console.log('update survey');
      }
    } else {
      this.toast.info({
        detail: 'INFORMATION',
        summary: 'Complete filling out the form',
        duration: 2000,
      });
      return;
    }
  }

  formatTime(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  deleteBlock(index: number) {
    const newList = this.form.blocks.filter((_, i) => i !== index);
    this.form.blocks = [...newList];
  }

  addBlock() {
    this.form.blocks = [...this.form.blocks, new SBBlock()];
  }

  duplicateBlock(event: SBBlock, index: number) {
    const currentBlock = JSON.parse(JSON.stringify(event));
    this.form.blocks = [
      ...this.form.blocks.slice(0, index + 1),
      currentBlock,
      ...this.form.blocks.slice(index + 1),
    ];
  }

  // ...........................LOGO UPLOAD.........................................

  isPopup: boolean = false;
  logoUploadedOverlayer: boolean = false;
  @Input() uploaded_logo_popup!: string | null;

  handleOpenPop(message?: boolean) {
    this.isPopup = true;
    if (message) {
      this.isPopup = message;
    }
  }

  handleClosePop(e: Event, details?: string) {
    if (details === 'dontClose') {
      e.stopPropagation();
      return;
    }

    this.isPopup = false;
  }

  handleUploadedLogoMouseOver(message: boolean) {
    this.logoUploadedOverlayer = message;
  }

  handleUploadedLogoMouseLeave(message: boolean) {
    this.logoUploadedOverlayer = message;
  }

  // DRAG AND DROP
  draggedImage: string | null | ArrayBuffer = null;
  allowedFileTypes = [
    'jpeg',
    'jpg',
    'png',
    'gif',
    'mp4',
    'pdf',
    'psd',
    'ai',
    'doc',
    'docx',
    'ppt',
    'pptx',
  ];

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();

    const files = event.dataTransfer?.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileExtension = this.getFileExtension(file.name);

      if (this.allowedFileTypes.includes(fileExtension.toLowerCase())) {
        const reader = new FileReader();
        reader.onload = () => {
          this.draggedImage = reader.result as string;
          this.logoService.logo(this.draggedImage);
          this.form.logo.url = this.draggedImage;
        };
        reader.readAsDataURL(file);
      } else {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Invalid file type. Please upload a valid file.',
          duration: 2000,
        });
      }
    }
    this.isPopup = false;
  }

  private getFileExtension(filename: string): string {
    return filename.split('.').pop() || '';
  }

  // IMAGE UPLOAD BROWSE
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.draggedImage = fileReader.result;
        this.logoService.logo(this.draggedImage);
      };
      fileReader.readAsDataURL(input.files[0]);
    }
    this.isPopup = false;
  }

  handleDeleteLogo(message: null) {
    this.draggedImage = message;
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.logoService.appearanceOpenUploadPopup('');
  }
}
