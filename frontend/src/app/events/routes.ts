import {Route} from '@angular/router';
import {EventsComponent} from './events.component';

export default [{path: '', loadComponent: () => EventsComponent}] as Route[];
