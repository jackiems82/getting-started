import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, map } from 'rxjs';
import { Api } from '../api.service';
import { Competition, Match, MatchEntry } from '../models';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {

  competitions!: Competition[];
  matchdays: number[] | null = null;
  matchList: MatchEntry[] = [];
  isInitialised = false;
  isLoading = false;

  form = new FormGroup({
    competition: new FormControl(null, Validators.required),
    matchday: new FormControl({ value: null, disabled: true }, Validators.required)
  })

  constructor(
    private apiService: Api
  ) { }

  ngOnInit(): void {
    console.log(this.isInitialised);

    this.apiService.getCompetitions().pipe(map(res => res.competitions)).subscribe(data => {
      this.competitions = data;
      this.isInitialised = true;
      console.log(this.isInitialised);

    });
    console.log(this.isInitialised);

  }

  onCompetitionChanged(competition: Competition) {
    if (competition.currentSeason.currentMatchday)
      this.matchdays = Array.from({ length: competition.currentSeason.currentMatchday }, (_, index) => index + 1);
    else this.matchdays = null;

    if (!this.matchdays)
      this.form.controls.matchday.disable();
    else
      this.form.controls.matchday.enable();
  }

  sortColumn(column: string) {
    this.matchList = this.matchList.sort((a, b) => this.sort(a, b, column))
  }

  sort(a: MatchEntry, b: MatchEntry, column?: string) {
    if (column)
      return (a as any)[column].localeCompare((b as any)[column]);
    else
      return a.kickoffTime.localeCompare(b.kickoffTime);
  }

  onSubmit(value: { competition?: Competition | null, matchday?: number | null }) {
    this.isLoading = true
    this.apiService.getMatches(value.competition!, value.matchday!).subscribe(data => this.matchList = data.matches.map(m => {
      this.isLoading = false;

      return {
        homeTeam: m.homeTeam.name,
        awayTeam: m.awayTeam.name,
        score: `${m.score.fullTime.home}:${m.score.fullTime.away}`,
        kickoffTime: `${new Date(m.utcDate).getHours().toString().padStart(2, '0')}:${new Date(m.utcDate).getMinutes().toString().padStart(2, '0')}`
      }
    })
      .sort((a, b) => this.sort(a, b, 'kickoffTime'))
      .reverse());
  }
} 
