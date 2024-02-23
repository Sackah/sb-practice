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
import { BuilderPageComponent } from './pages/builder-page/builder-page.component';
import { PreviewPageComponent } from './pages/preview-page/preview-page.component';
import { FilterPageComponent } from './pages/filter-page/filter-page.component';

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
    BuilderPageComponent,
    PreviewPageComponent,
    FilterPageComponent,
  ],
})
export class AppComponent {
  form = new SBForm();
  // showBuilderPage = true;
  pages: 'builder' | 'preview' | 'filter' = 'builder';

  togglePages(page: typeof this.pages) {
    this.pages = page;
    // this.showBuilderPage = !this.showBuilderPage;
  }
}
