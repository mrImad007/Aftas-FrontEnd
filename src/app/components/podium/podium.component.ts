import { Component, Input, OnInit } from '@angular/core';
import { Ranking } from 'src/app/Interfaces/Ranking';
import { RankingService } from 'src/app/services/Ranking/ranking-services.service';

@Component({
  selector: 'app-podium',
  templateUrl: './podium.component.html',
  styleUrls: ['./podium.component.css']
})
export class PodiumComponent implements OnInit{
  public TopTree : Ranking[] = [];
  @Input() CompetitionId! : number 

  constructor(private rankingService : RankingService){}

  ngOnInit(): void {
    this.getTopTree(this.CompetitionId);
  }

  getTopTree(id:number){
    this.rankingService.getTopMembers(id).subscribe(
      (topTree: any)=>{
        this.TopTree = topTree.slice(0,3);
      }
    )
  }

}
