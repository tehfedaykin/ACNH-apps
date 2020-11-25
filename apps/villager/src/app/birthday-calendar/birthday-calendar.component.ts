import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { Villager, AcnhService} from '@animal-crossing/api';

@Component({
  selector: 'animal-crossing-birthday-calendar',
  templateUrl: './birthday-calendar.component.html',
  styleUrls: ['./birthday-calendar.component.less']
})
export class BirthdayCalendarComponent implements OnInit {
  public viewDate = new Date();
  public birthdays: CalendarEvent[] = [];

  constructor(private apiService: AcnhService) { }

  ngOnInit(): void {
    this.apiService.getVillagers().subscribe((villagers: Villager[]) => {
      this.birthdays = villagers.map((villager) => {
        const currYear = new Date().getFullYear();
        var [day, month] = villager.birthday.split('/');
        var birthDate = new Date(currYear, parseInt(month) - 1, parseInt(day));
        return {
          start: birthDate,
          allDay: true,
          color: {
            primary: villager.bubbleColor,
            secondary: villager.textColor
          },
          title: `${villager.name["name-USen"]} Birthday`
        }
      })
    })
  }

}
