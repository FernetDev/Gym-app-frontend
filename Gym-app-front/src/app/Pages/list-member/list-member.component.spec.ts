import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMemberComponent } from './list-member.component';

describe('ListMemberComponent', () => {
  let component: ListMemberComponent;
  let fixture: ComponentFixture<ListMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
