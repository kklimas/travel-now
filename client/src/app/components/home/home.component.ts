import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Journey } from 'src/app/models/Journey';
import { JourneyDataService } from 'src/app/services/journey-data.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  journeys: Journey[] = [];
  differentDirections: number = 0;
  imagesUrl: string[] = [];
  currentImg: string = '';
  imgIndex: number = -1;
  displaySpinner: boolean = false;

  constructor(
    private journeyService: JourneyDataService,
    private toastService: ToastService,
    private dialog: MatDialog
    ) {
    this.displaySpinner = true;
    this.journeyService.getJourneys().subscribe({
      next: (data) => {
        this.journeys = data
        this.calculateDifferentDirections();
        this.getPhotos();
        this.displaySpinner = false;
      },
      error: () => {
        this.toastService.showError()
        this.displaySpinner = false;
      }
    })
  }

  switch(x: number) {
    this.imgIndex += x;
    if (this.imgIndex < 0) this.imgIndex = this.imagesUrl.length - 1;
    if (this.imgIndex === this.imagesUrl.length) this.imgIndex = 0;
    this.currentImg = this.imagesUrl[this.imgIndex];
  }
  
  private calculateDifferentDirections() {
    this.differentDirections = [...new Set(this.journeys.map(j => j.country))].length
  }

  private getPhotos() {
    this.imagesUrl = this.journeys.map(j => j.urls[0]);
    if (this.imagesUrl.length > 0) {
      this.currentImg = this.imagesUrl[0];
      this.imgIndex = 0;
    }
  }
}
