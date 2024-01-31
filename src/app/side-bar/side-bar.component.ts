import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextSizes, sizes } from './sizes';
import { SideBarService } from '../services/side-bar.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  pageHexColor: string = '#80BBFF';
  // constructor(private service: UploadedLogoService) {}

  @Input() uploaded_logo!: string | ArrayBuffer | null; // Adjust the type accordingly

  // ngOnInit() {
  //   this.service.data.subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.uploaded_logo = res;
  //     },
  //   });
  // }
  sizes = sizes;

  constructor(private sidebarService: SideBarService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['uploaded_logo']) {
      const newUploadedLogo = changes['uploaded_logo'].currentValue;
      console.log('uploaded_logo changed:', newUploadedLogo);
    }
  }

  onPageHexInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.pageHexColor = target.value;
  }

  handleOpenPopup() {
    // this.service.appearanceOpenUploadPopup('openPopUp')
  }

  handleFontChange(
    event: Event,
    type: 'question' | 'text' | 'block-header' | 'title-header'
  ) {
    const value = (event.target as HTMLInputElement).value;
    this.sidebarService.changeStyle({
      type,
      value: value as TextSizes,
    });
  }
}
