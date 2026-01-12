import { Component } from '@angular/core';

@Component({
  selector: 'app-allocate-promos',
  standalone: true,
  imports: [],
  templateUrl: './allocate-promos.component.html',
  styleUrl: './allocate-promos.component.css'
})
export class AllocatePromosComponent {
  DOOHCloudTvButton = "DOOH";

  DOOHCloudTvButtonToggle(text: any) {
    this.DOOHCloudTvButton = text;
  }

}
