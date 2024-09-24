import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'details',
        component: PersonalDetailsComponent
      }
    ]),
  ],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {}