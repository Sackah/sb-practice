import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { SurveyFormService } from '../../../../../services/SurveyForm/survey-form.service';
import { GetCollaboratorService } from '../../../../../services/getCollaboratorData/get-collaborator.service';
import { SurveyCardViewService } from '../../../../../services/surveycardView/survey-card-view.service';
import { WindowWidthService } from '../../../../../services/window-width/window-width.service';
import { SBForm } from '../../../../USER/Pages/servey-creation/components/models/form.model';
import { AdminQuestionPreviewClassicComponent } from '../admin-question-preview-classic/admin-question-preview-classic.component';
import { AdminQuestionPreviewCardComponent } from '../admin-question-preview-card/admin-question-preview-card.component';

@Component({
  selector: 'app-admin-question-preview',
  standalone: true,
  templateUrl: './admin-question-preview.component.html',
  styleUrl: './admin-question-preview.component.scss',
  imports: [
    AdminQuestionPreviewClassicComponent,
    AdminQuestionPreviewCardComponent,
  ],
})
export class AdminQuestionPreviewComponent implements OnInit {
  @Output() handlePreviewEmit: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() form!: SBForm;

  getOption: string[] = [];

  conditionBlock!: number;
  conditionQuestion!: number;
  getBlockNumber: number[] = [];
  getQuestionNumber: number[] = [];
  conditionStatus!: boolean;
  conditionOption!: string;

  device_screen: string = 'laptop';
  cardLayout: string = 'classic';
  isCollaborator!: boolean;

  constructor(
    private cd: ChangeDetectorRef,
    private window: WindowWidthService,
    private cardViewService: SurveyCardViewService
  ) {}

  ngOnInit() {
    this.checkScreenWidth();

    let item = localStorage.getItem('cardView');

    if (item !== null) {
      this.cardLayout = JSON.parse(item);
    } else {
      this.cardLayout = 'classic';
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

  checkScreenWidth() {
    const width = this.window.nativeWindow.innerWidth;

    if (width >= 1024) {
      this.device_screen = 'laptop';
    } else if (width < 1024 && width > 768) {
      this.device_screen = 'tablet';
    } else {
      this.device_screen = 'mobile';
    }

    this.cd.detectChanges();
  }

  getWidth() {
    if (this.device_screen === 'laptop') {
      return '65%';
    } else if (this.device_screen === 'tablet') {
      return '768px';
    } else {
      return '360px';
    }
  }

  handleDeviceScreen(screen: string) {
    this.device_screen = screen;
  }

  handleCardLayout(layout: string) {
    this.cardLayout = layout;
    localStorage.setItem('cardView', JSON.stringify(layout));
    this.cardViewService.setCardView(layout);
  }

  handlePreviewStatus(): void {
    this.handlePreviewEmit.emit(false);
  }

  handleAccessElement(e: Event) {
    e.preventDefault();
  }
}
