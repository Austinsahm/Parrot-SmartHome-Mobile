import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LineChartMultipleSourcesComponent } from './line-chart-multiple-sources.component';

describe('LineChartMultipleSourcesComponent', () => {
  let component: LineChartMultipleSourcesComponent;
  let fixture: ComponentFixture<LineChartMultipleSourcesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LineChartMultipleSourcesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LineChartMultipleSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
