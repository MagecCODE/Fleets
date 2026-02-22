import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DotaPage } from './dota.page';

describe('DotaPage', () => {
  let component: DotaPage;
  let fixture: ComponentFixture<DotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
