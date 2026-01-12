import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {
  images: string[] = [
    'assets/cloud1.jpg',
    'assets/cloud2.jpg',
    'assets/dooh.jpg',
    'assets/dooh1.jpg',
  ];

  currentIndex: number = 0;

  ngOnInit(): void {
    this.startImageRotation();
  }

  startImageRotation(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // Change image every 5 seconds
  }

  isCloudImage(): boolean {
    const cloudImages = [
      'assets/cloud1.jpg',
      'assets/cloud2.jpg',
      
    ];
    return cloudImages.includes(this.images[this.currentIndex]);
  }

  isDoohImage(): boolean {
    const doohImages = [
      'assets/dooh.jpg',
      'assets/dooh1.jpg',
      
    ];
    return doohImages.includes(this.images[this.currentIndex]);
  }
}
