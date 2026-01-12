import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-view-daily-screen-runs',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './view-daily-screen-runs.component.html',
  styleUrl: './view-daily-screen-runs.component.css'
})
export class ViewDailyScreenRunsComponent {
  
}
