import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { SBImage } from './models/image.model';
import { ImageComponent } from './components/image/image.component';
import { FormsModule } from '@angular/forms';
import { SBForm } from './models/form.model';
import { BlockComponent } from './components/block/block.component';
import { SBBlock } from './models/block.model';
import { PaginationComponent } from './pagination/pagination.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SideBarService } from './services/side-bar.service';
import { colorSchemes } from './color-schemes';
import { SBColorScheme } from './models/colorScheme';
import { ColorSchemeService } from './services/color-scheme.service';
import { AddCollaboratorsComponent } from './components/add-collaborators/add-collaborators.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    TitleComponent,
    ImageComponent,
    BlockComponent,
    PaginationComponent,
    SideBarComponent,
    AddCollaboratorsComponent,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  image = new SBImage('https://picsum.photos/200/300');
  form = new SBForm();
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
