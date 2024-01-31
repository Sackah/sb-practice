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
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  image = new SBImage('https://picsum.photos/200/300');
  form = new SBForm();
  // timeout: NodeJS.Timeout | undefined;
  timeout: any;

  constructor(private sidebarService: SideBarService) {
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

  // .................

  items: any[] = [
    /* Your array of items */
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
    'sam',
    'daniel',
    'tonita',
    'mark',
  ];
  itemsPerPage: number = 10; // Number of items to display per page
  currentPage: number = 1;

  get itemsOnCurrentPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.items.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }
}
