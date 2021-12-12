import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSpawnComponent } from './campaign-spawn.component';

describe('CampaignSpawnComponent', () => {
  let component: CampaignSpawnComponent;
  let fixture: ComponentFixture<CampaignSpawnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignSpawnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSpawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
