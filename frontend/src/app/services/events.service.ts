import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment';
import {EventRead, EventType} from '../models/event';

@Injectable({providedIn: 'root'})
export class EventsService {
  private readonly http = inject(HttpClient);

  readonly eventsUrl = `${environment.apiUrl}events/` as const;

  getEvents = (params?: {limit?: number; offset?: number; event_type?: EventType; media_id?: number}) =>
    this.http.get<EventRead[]>(this.eventsUrl, {params: params as Record<string, string | number>});

  getEvent = (eventId: number) => this.http.get<EventRead>(`${this.eventsUrl}${eventId}`);

  getEventsByMediaId = (mediaId: number, params?: {limit?: number; offset?: number}) =>
    this.http.get<EventRead[]>(`${this.eventsUrl}media/${mediaId}`, {params: params as Record<string, string | number>});
}
