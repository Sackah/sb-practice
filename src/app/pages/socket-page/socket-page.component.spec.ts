import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketPageComponent } from './socket-page.component';

describe('SocketPageComponent', () => {
  let component: SocketPageComponent;
  let fixture: ComponentFixture<SocketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocketPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
