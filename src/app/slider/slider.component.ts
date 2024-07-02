import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  slides = [
    {
      image: 'path-to-your-image/image1.png',
      title: 'Manage My Health',
      description: 'Inlogic has transformed Manage My Health, making healthcare accessible to over 1.85 million Kiwis...'
    },
    {
      image: 'path-to-your-image/image2.png',
      title: 'Project',
      description: 'Online digital health platform to enable individuals and healthcare providers to manage health anytime, anywhere...'
    }
  ];

  currentSlide = 0;

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.slides.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.slides.length - 1) ? 0 : this.currentSlide + 1;
  }
}
