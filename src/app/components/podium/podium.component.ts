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
  @Input() Competition_code! : string 
  

  constructor(private rankingService : RankingService){}

  ngOnInit(): void {
    this.getResults(this.Competition_code);
  }

  getResults(code:string){
    this.rankingService.getTopMembers(code).subscribe(
      (topTree: any)=>{
        this.TopTree = topTree;
      }
    )
  }

}
