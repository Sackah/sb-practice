import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SBForm } from '../../../../USER/Pages/servey-creation/components/models/form.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-question-preview-classic',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-question-preview-classic.component.html',
  styleUrl: './admin-question-preview-classic.component.scss',
})
export class AdminQuestionPreviewClassicComponent {
  selectedItem!: string;
  isMenuOpen = false;
  isOption: boolean = false;
  @Input() form!: SBForm;

  constructor(private cd: ChangeDetectorRef) {}

  displayQuestion!: boolean;
  selectOptions: string[] = [];
  selectElements!: string;
  opt!: string;

  ConditionalQuestion: {
    choice: string;
    question: string;
    conditionalOptions: string[];
    type: string;
    answer: string;
    condiQuestionIndex: number;
  }[] = [];

  handleSeletion(option: string) {
    this.isMenuOpen = false;
    this.selectedItem = option;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  questionsIndex: { blockIndex: number; questionIndex: number }[] = [];
  blocksIndex: number[] = [];
  BLOCKINDEX!: number;
  block!: number;
  QUESTIONINDEX!: number;

  selectedOption(opt: string, index: number) {
    let newQuestionsIndex = [...this.questionsIndex];
    let newBlocksIndex = [...this.blocksIndex];

    this.form.blocks.forEach((block, blockInd) => {
      block.questions.forEach((question, questionInd) => {
        const conditions = question.conditions;

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

          if (conditions.choice === opt) {
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
            if (!newBlocksIndex.includes(blockInd)) {
              newBlocksIndex.push(blockInd);
              this.blocksIndex = [...newBlocksIndex];
              this.cd.detectChanges();
            }
          } else {
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

  shouldDisplayQuestion(blockIndex: number, questionIndex: number): boolean {
    return this.questionsIndex.some(
      (q) => q.blockIndex === blockIndex && q.questionIndex === questionIndex
    );
  }

  getBlockIndex(index: number) {
    this.block = index;
    this.BLOCKINDEX = index++;
  }

  getCurrQuestionIndex(index: number) {
    this.QUESTIONINDEX = index;
  }
}
