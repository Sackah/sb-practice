import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './components/title/title.component';
import { SBImage } from './models/image.model';
import { ImageComponent } from './components/image/image.component';
import { FormsModule } from '@angular/forms';

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
  ],
})
export class AppComponent implements OnInit {
  image = new SBImage('https://picsum.photos/200/300');
  ngOnInit(): void {}

  showPopup = false;
  url: string = '';

  onEditImage() {
    this.showPopup = true;
  }

  changeImage(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.image.changeUrl(this.url);
      console.log('edit image');
    }
  }

  onDeleteImage() {
    console.log('delete image');
  }
}
