import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { SBImage } from './models/image.model';
import { ImageComponent } from './components/image/image.component';
import { FormsModule } from '@angular/forms';
import { SBForm } from './models/form.model';
import { BlockComponent } from './components/block/block.component';
import { SBBlock } from './models/block.model';

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
  ],
})
export class AppComponent implements OnInit {
  image = new SBImage('https://picsum.photos/200/300');
  form = new SBForm();

  ngOnInit(): void {}

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
}
