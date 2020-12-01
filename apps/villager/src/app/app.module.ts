import { ApiModule } from '@animal-crossing/api';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


import { VillagerComponent } from './villager/villager.component';
import { EditComponent } from './edit/edit.component';
import { VillagerListComponent } from './villager-list/villager-list.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { BirthdayCalendarComponent } from './birthday-calendar/birthday-calendar.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './+state/reducers';
import { VillagerEffects } from './+state/effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [AppComponent, VillagerComponent, VillagerListComponent, NavComponent, BirthdayCalendarComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'villagers',
        component: VillagerListComponent
      },
      {
        path: 'villagers/:id',
        component: VillagerComponent
      },
      {
        path: 'edit',
        component: EditComponent
      },
      {
        path: 'birthdays',
        component: BirthdayCalendarComponent
      }
    ], { initialNavigation: 'enabled' }),
    ReactiveFormsModule, 
    MatInputModule, 
    MatCardModule,
    BrowserAnimationsModule,
    ApiModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    StoreModule.forRoot({villagerReducer: reducers}),
    EffectsModule.forRoot([VillagerEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
