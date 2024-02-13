import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SBForm } from '../models/form.model';

@Component({
  selector: 'app-conditional',
  standalone: true,
  imports: [],
  templateUrl: './conditional.component.html',
  styleUrl: './conditional.component.scss',
})
export class ConditionalComponent implements OnInit {
  @Output() handlePreviewEmit: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() form!: SBForm;

  isMenuOpen = false;
  selectedItem!: string;

  conditionBlock!: number;
  conditionQuestion!: number;
  getBlockNumber!: string;
  getQuestionNumber!: string;
  conditionStatus!: boolean;
  conditionOption!: string;
  blockIndex: any;

  constructor() {}

  ngOnInit() {
    console.log(this.form);

    this.form.blocks.forEach((block) => {
      block.questions.forEach((question) => {
        if (question.conditions.status) {
          this.conditionStatus = question.conditions.status;
          this.getBlockNumber = question.conditions.block.conditionalBlock;
          this.getQuestionNumber =
            question.conditions.block.conditionalQuestion;
        }
      });
    });

    this.conditionBlock = Number(this.getBlockNumber) - 1;
    this.conditionQuestion = Number(this.getQuestionNumber) - 1;
  }

  // LOGIC
  blockIndices: number[] = [];

  getBlockIndex(index: number) {
    this.blockIndices.push(index);
  }

  ngAfterViewInit(): void {
    // Log the array when looping is done
    console.log('Block indices:', this.blockIndices);
  }

  handlePreviewStatus(): void {
    this.handlePreviewEmit.emit(false);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  handleSeletion(option: string) {
    this.isMenuOpen = false;
    this.selectedItem = option;
  }

  // .................. CONDTIONAL LOGIC

  blockQuestionVisible!: boolean;
  found = false;

  getLogic() {}

  //   handleOptionClick(option: string) {
  //     this.form.blocks.forEach((block) => {
  //       block.questions.forEach((question) => {
  //         if (question.conditions.Option === option) {
  //           this.blockQuestionVisible = true;
  //         } else if (question.options.includes(option)) {
  //           this.blockQuestionVisible = false;
  //         } else if (!question.options.includes(option)) {
  //           return
  //         }
  //       });
  //     });
  //   }
  // }

  handleOptionClick(option: string) {
    for (const block of this.form.blocks) {
      for (const question of block.questions) {
        if (question.conditions.Option === option) {
          this.blockQuestionVisible = true;
          this.found = true;
        } else if (question.options.includes(option)) {
          this.blockQuestionVisible = false;
          this.found = true;
        }
      }
    }

    if (!this.found) {
      return;
    }
  }
}

