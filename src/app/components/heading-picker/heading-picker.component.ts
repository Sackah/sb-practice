import { Component, OnInit } from '@angular/core';
import { SBHeading } from '../../models/heading.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-heading-picker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './heading-picker.component.html',
  styleUrl: './heading-picker.component.scss',
})
export class HeadingPickerComponent implements OnInit {
  heading!: SBHeading;
  headingText = '';

  ngOnInit(): void {
    this.heading = new SBHeading();
    this.headingText = this.heading.text;
  }

  addHeading() {
    // this.heading.text = this.headingText;
  }
}
