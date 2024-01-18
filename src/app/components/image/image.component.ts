import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SBImage } from '../../models/image.model';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  @Input() image!: SBImage;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onEdit() {
    this.edit.emit('edit');
  }

  onDelete() {
    this.delete.emit('delete');
  }
}
