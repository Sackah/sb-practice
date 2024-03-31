import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '../../components/survey-creation/title/title.component';
import { ImageComponent } from '../../components/survey-creation/image/image.component';
import { FormsModule } from '@angular/forms';
import { SBForm } from '../../models/form.model';
import { BlockComponent } from '../../components/survey-creation/block/block.component';
import { SideBarComponent } from '../../components/general/side-bar/side-bar.component';
import { AddCollaboratorsComponent } from '../../components/general/add-collaborators/add-collaborators.component';
import { BuilderPageComponent } from '../../pages/client/builder-page/builder-page.component';
import { PreviewPageComponent } from '../../pages/client/preview-page/preview-page.component';
import { FilterPageComponent } from '../../pages/client/filter-page/filter-page.component';
import { SocketPageComponent } from '../../pages/client/socket-page/socket-page.component';

@Component({
  selector: 'app-client-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    TitleComponent,
    ImageComponent,
    BlockComponent,
    SideBarComponent,
    AddCollaboratorsComponent,
    BuilderPageComponent,
    PreviewPageComponent,
    FilterPageComponent,
    SocketPageComponent,
    RouterLink,
  ],
})
export class ClientEntryComponent {
  form = new SBForm();
  pages: 'builder' | 'preview' | 'filter' | 'socket' = 'builder';

  togglePages(page: typeof this.pages) {
    this.pages = page;
  }
}
