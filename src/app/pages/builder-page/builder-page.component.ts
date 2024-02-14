import { Component, Input } from '@angular/core';
import { SBForm } from '../../models/form.model';
import { AddCollaboratorsComponent } from '../../components/add-collaborators/add-collaborators.component';
import { TitleComponent } from '../../components/title/title.component';
import { BlockComponent } from '../../components/block/block.component';
import { SideBarService } from '../../services/side-bar.service';
import { ColorSchemeService } from '../../services/color-scheme.service';
import { SBBlock } from '../../models/block.model';
import { SBColorScheme } from '../../models/colorScheme';
import { colorSchemes } from '../../color-schemes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
export class BuilderPageComponent {
  @Input() form!: SBForm;
  // timeout: NodeJS.Timeout | undefined;
  timeout: any;
  allColorSchemes = colorSchemes;

  constructor(
    private sidebarService: SideBarService,
    private colorSchemeService: ColorSchemeService
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

  handleImageChange(event: any) {
    if (event.target.files) {
      const image = new FormData();
      image.append('file', event.target.files[0]);

      for (let pair of image.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
    }
  }
}
