import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DotaDetailPage } from './dota-detail.page';

describe('DotaDetailPage', () => {
  let component: DotaDetailPage;
  let fixture: ComponentFixture<DotaDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DotaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
