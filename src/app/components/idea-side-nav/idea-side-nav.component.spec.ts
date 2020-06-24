import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaSideNavComponent } from './idea-side-nav.component';

describe('IdeaSideNavComponent', () => {
  let component: IdeaSideNavComponent;
  let fixture: ComponentFixture<IdeaSideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdeaSideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
