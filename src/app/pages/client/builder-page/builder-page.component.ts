import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { SBForm } from '../../../models/form.model';
import { AddCollaboratorsComponent } from '../../../components/general/add-collaborators/add-collaborators.component';
import { TitleComponent } from '../../../components/survey-creation/title/title.component';
import { BlockComponent } from '../../../components/survey-creation/block/block.component';
import { SideBarService } from '../../../services/side-bar.service';
import { ColorSchemeService } from '../../../services/color-scheme.service';
import { SBBlock } from '../../../models/block.model';
import { SBColorScheme } from '../../../models/colorScheme';
import { colorSchemes } from '../../../color-schemes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AccountSetupService } from '../../../services/account-setup.service';

@Component({
  selector: 'app-builder-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AddCollaboratorsComponent,
    TitleComponent,
    BlockComponent,
  ],
  templateUrl: './builder-page.component.html',
  styleUrl: './builder-page.component.scss',
})
export class BuilderPageComponent implements OnChanges {
  @Input() form!: SBForm;
  // timeout: NodeJS.Timeout | undefined;
  timeout: any;
  allColorSchemes = colorSchemes;

  constructor(
    private sidebarService: SideBarService,
    private colorSchemeService: ColorSchemeService,
    private accountSetupService: AccountSetupService
  ) {
    this.sidebarService.currentStyle.subscribe({
      next: (style) => {
        if (style) {
          switch (style['type']) {
            case 'question':
              this.form.blocks.forEach((block) => {
                block.questions.forEach((question) => {
                  question.title.style.size = style.value;
                });
              });
              break;
            case 'text':
              // this.form.text.style = style.value;
              break;
            case 'block-header':
              this.form.blocks.forEach((block) => {
                block.title.style.size = style.value;
              });
              break;
            case 'title-header':
              this.form.title.title.style.size = style.value;
              break;
          }
        }
      },
    });
  }

  ngOnInit(): void {
    // this.timeout = setInterval(() => this.clg(), 5000);
    this.colorSchemeService.currentColorScheme.subscribe({
      next: (colorScheme) => {
        if (colorScheme) {
          this.form.colorScheme = colorScheme;
        }
      },
    });
  }

  clg() {
    console.log(this.form);
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

  changeColorScheme(colorScheme: SBColorScheme) {
    this.colorSchemeService.change(colorScheme);
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['form']) {
      this.form = changes['form'].currentValue;
    }
  }

  handleImageChange(event: any) {
    if (event.target.files) {
      const fd = new FormData();
      fd.append('profilePicture', event.target.files[0]);
      fd.append('email', 'gasicen109@tospage.com');
      fd.append('firstName', 'lala');
      fd.append('lastName', 'Yad');
      fd.append('phoneNumber', '02323232342424');
      fd.append('location', 'Accra');
      fd.append('timeZone', 'Africa/Accra');
      fd.append('refId', '45c88ad20c9ba9fe1ecae0b6505c23b6');

      for (let pair of fd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      this.postForm(fd);
    }
  }

  postForm(form: FormData) {
    this.accountSetupService.post(form).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
