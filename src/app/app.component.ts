import { Component } from '@angular/core';
import { Web3Service } from './web3.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'scampaign';

  constructor(private web3Service: Web3Service) {}

  /*ngOnInit() {
    this.web3Service.registerNewCampaign();
  }*/
}
