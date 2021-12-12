import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Web3Service } from '../web3.service';


@Component({
  selector: 'app-campaign-spawn',
  templateUrl: './campaign-spawn.component.html',
  styleUrls: ['./campaign-spawn.component.css']
})
export class CampaignSpawnComponent implements OnInit{
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  name: string;
  fundgoal: number;
  expiry: number;

  constructor(private web3service: Web3Service, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    
  }

  setName() {
    this.name = (<HTMLInputElement>document.getElementById("name")).value;
  }

  setFundGoal() {
    this.fundgoal = Number((<HTMLInputElement>document.getElementById("fundgoal")).value);
  }

  setExpiry() {
    this.expiry = Number((<HTMLInputElement>document.getElementById("expiry")).value);
  }

  spawnNewCampaign() {
    this.web3service.newCampaign(this.name, this.fundgoal, this.expiry)
  }
}
