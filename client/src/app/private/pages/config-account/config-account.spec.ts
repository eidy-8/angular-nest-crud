import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAccount } from './config-account';

describe('ConfigAccount', () => {
  let component: ConfigAccount;
  let fixture: ComponentFixture<ConfigAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
