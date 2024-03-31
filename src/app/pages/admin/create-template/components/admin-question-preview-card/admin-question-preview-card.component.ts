import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SBForm } from '../../../../USER/Pages/servey-creation/components/models/form.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-question-preview-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-question-preview-card.component.html',
  styleUrl: './admin-question-preview-card.component.scss',
})
export class AdminQuestionPreviewCardComponent implements OnInit {
  selectedItem!: string;
  isMenuOpen = false;
  isOption: boolean = false;
  @Input() form!: SBForm;

  constructor(private cd: ChangeDetectorRef) {}

  displayQuestion!: boolean;
  selectOptions: string[] = [];
  selectElements!: string;
  opt!: string;
  currentIndex = 0;
  cardBlockIndexArray: number[] = [];
  isPrevious: boolean = false;
  isNext: boolean = false;

  // Array to store the indices of questions
  questionsIndex: { blockIndex: number; questionIndex: number }[] = [];
  // Array to store the indices of blocks
  blocksIndex: number[] = [];
  BLOCKINDEX!: number;
  block!: number;
  QUESTIONINDEX!: number;

  ConditionalQuestion: {
    choice: string;
    question: string;
    conditionalOptions: string[];
    type: string;
    answer: string;
    condiQuestionIndex: number;
  }[] = [];

  ngOnInit(): void {
    this.form.blocks.forEach((block, i) => {
      this.cardBlockIndexArray.push(i);
    });

    this.handleNextText();
  }

  handleSeletion(option: string) {
    this.isMenuOpen = false;
    this.selectedItem = option;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // LOGIC

  selectedOption(opt: string, index: number) {
    // Create new arrays from the existing ones
    let newQuestionsIndex = [...this.questionsIndex];
    let newBlocksIndex = [...this.blocksIndex];

    // Iterate over each block
    this.form.blocks.forEach((block, blockInd) => {
      // Iterate over each question in the block
      block.questions.forEach((question, questionInd) => {
        const conditions = question.conditions;
        // Check if the current block and question match the conditions
        if (
          blockInd === conditions?.blockIndex &&
          questionInd === conditions?.questionIndex &&
          question.options.includes(opt)
        ) {
          this.isOption = true;
          const questionIdentifier = {
            blockIndex: blockInd,
            questionIndex: questionInd,
          };
          // If the selected option matches the condition
          if (conditions.choice === opt) {
            // Add the question to the questionsIndex if it's not already there
            if (
              !newQuestionsIndex.some(
                (q) =>
                  q.blockIndex === blockInd && q.questionIndex === questionInd
              )
            ) {
              newQuestionsIndex.push(questionIdentifier);
              this.questionsIndex = [...newQuestionsIndex];
              this.cd.detectChanges();
            }
            // Add the block to the blocksIndex if it's not already there
            if (!newBlocksIndex.includes(blockInd)) {
              newBlocksIndex.push(blockInd);
              this.blocksIndex = [...newBlocksIndex];
              this.cd.detectChanges();
            }
          } else {
            // If the selected option doesn't match the condition, remove the question and block from the indices
            newQuestionsIndex = newQuestionsIndex.filter(
              (q) =>
                q.blockIndex !== blockInd || q.questionIndex !== questionInd
            );
            newBlocksIndex = newBlocksIndex.filter((i) => i !== blockInd);
            this.questionsIndex = [...newQuestionsIndex];
            this.blocksIndex = [...newBlocksIndex];
            this.cd.detectChanges();
          }
        }
      });
    });
  }

  shouldDisplayQuestion(questionIndex: number): boolean {
    // Return true if the question is in the questionsIndex
    return this.questionsIndex.some(
      (q) =>
        q.blockIndex === this.currentIndex && q.questionIndex === questionIndex
    );
  }

  getBlockIndex(index: number) {
    this.block = index;
    this.BLOCKINDEX = index++;
  }

  getCurrQuestionIndex(index: number) {
    this.QUESTIONINDEX = index;
  }

  // card

  handlePreviousClick() {
    this.isPrevious = true;

    this.isNext = false;

    this.handleNextText();
  }

  nextText!: string;

  handleNextClick() {
    this.isNext = true;

    this.isPrevious = false;

    this.handleNextText();
  }

  handleNextText() {
    if (this.currentIndex === this.cardBlockIndexArray.length - 1) {
      this.nextText = 'Submit';
    } else {
      this.nextText = 'Next';
    }
  }

  navigate(step: number): void {
    const newIndex = this.currentIndex + step;
    if (newIndex >= 0 && newIndex < this.cardBlockIndexArray.length) {
      this.currentIndex = newIndex;
      this.handleNextClick();
    }
  }
}
