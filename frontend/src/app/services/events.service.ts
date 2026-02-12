import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from '../../environment';
import {EventRead, EventSource, EventType} from '../models/event';

type EventParams = {limit?: number; offset?: number; event_type?: EventType; event_source?: EventSource; media_id?: number};

function filterParams<T extends Record<string, unknown>>(params?: T): Record<string, string | number> | undefined {
  if (!params) return undefined;
  return Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== null)) as Record<string, string | number>;
}

@Injectable({providedIn: 'root'})
export class EventsService {
  private readonly http = inject(HttpClient);

  readonly eventsUrl = `${environment.apiUrl}events/` as const;

  getEvents = (params?: EventParams) => this.http.get<EventRead[]>(this.eventsUrl, {params: filterParams(params)});

  getEvent = (eventId: number) => this.http.get<EventRead>(`${this.eventsUrl}${eventId}`);

  getEventsByMediaId = (mediaId: number, params?: {limit?: number; offset?: number}) =>
    this.http.get<EventRead[]>(`${this.eventsUrl}media/${mediaId}`, {params: filterParams(params)});
}
