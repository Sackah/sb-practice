import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './components/survey-creation/title/title.component';
import { SBImage } from './models/image.model';
import { ImageComponent } from './components/survey-creation/image/image.component';
import { FormsModule } from '@angular/forms';
import { SBForm } from './models/form.model';
import { BlockComponent } from './components/survey-creation/block/block.component';
import { SBBlock } from './models/block.model';
import { SideBarComponent } from './components/general/side-bar/side-bar.component';
import { SideBarService } from './services/side-bar.service';
import { colorSchemes } from './color-schemes';
import { SBColorScheme } from './models/colorScheme';
import { ColorSchemeService } from './services/color-scheme.service';
import { AddCollaboratorsComponent } from './components/general/add-collaborators/add-collaborators.component';
import { BuilderPageComponent } from './pages/builder-page/builder-page.component';
import { PreviewPageComponent } from './pages/preview-page/preview-page.component';
import { FilterPageComponent } from './pages/filter-page/filter-page.component';
import { SocketPageComponent } from './pages/socket-page/socket-page.component';

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
    SideBarComponent,
    AddCollaboratorsComponent,
    BuilderPageComponent,
    PreviewPageComponent,
    FilterPageComponent,
    SocketPageComponent,
  ],
})
export class AppComponent {
  form = new SBForm();
  // showBuilderPage = true;
  pages: 'builder' | 'preview' | 'filter' | 'socket' = 'builder';

  togglePages(page: typeof this.pages) {
    this.pages = page;
    // this.showBuilderPage = !this.showBuilderPage;
  }
}
