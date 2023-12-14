import { Competition } from './../../Interfaces/Competition';
import { Component ,OnInit} from '@angular/core';
import { CompetitionService } from '../../Services/Competition/competition-service.service';


@Component({
  selector: 'app-competitions-table',
  standalone: true,
  imports: [],
  templateUrl: './competitions-table.component.html',
  styleUrl: './competitions-table.component.css'
})
export class CompetitionsTableComponent implements OnInit{

  constructor(private competitionService: CompetitionService){}

  public Competition: Competition[] = [];

  ngOnInit(): void{
    this.getAllCompetitions();
  }

  getAllCompetitions(){
    this.competitionService.getAllCompetitions().subscribe(
      (competitions: Competition[]) => {
        this.Competition = competitions;
        console.log(this.Competition);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
