import { HttpClient } from '@angular/common/http';
import { Competition, Match } from './models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  // items: Product[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getCompetitions() {
    return this.http.get<{ count: number, filters: {}, competitions: Competition[] }>('api/competitions');
  }

  getMatches(competition: Competition, matchday: number) {
    return this.http.get<{ filters: {}, resultSet: {}, competition: {}, matches: Match[] }>(`api/competitions/${competition.id}/matches`, { params: { matchday } })
  }
}