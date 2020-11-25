import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillagerListComponent } from './villager-list.component';

describe('VillagerListComponent', () => {
  let component: VillagerListComponent;
  let fixture: ComponentFixture<VillagerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VillagerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
