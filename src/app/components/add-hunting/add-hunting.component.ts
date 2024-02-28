import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Competition } from 'src/app/Models/Competition';
import { Fish } from 'src/app/Models/Fish';
import { Member } from 'src/app/Models/Member';
import Swal from 'sweetalert2';
import { CompetitionService } from 'src/app/services/Competition/competition-service.service';
import { MemberService } from 'src/app/services/Member/member-services.service';
import { Router } from '@angular/router';
import { FishService } from 'src/app/Services/Fish/fish-service.service';
import { HuntingService } from 'src/app/Services/Hunting/hunting-service.service';

@Component({
  selector: 'app-add-hunting',
  templateUrl: './add-hunting.component.html',
  styleUrls: ['./add-hunting.component.css']
})
export class AddHuntingComponent implements OnInit {

  public huntingForm!: FormGroup;

  public competitions: Competition[] = [];

  public members: Member[] = [];

  public fishes: Fish[] = [];

  constructor(private fb: FormBuilder,
     private competitionService: CompetitionService,
      private memberService: MemberService,
       private fishService: FishService,
        private router: Router,
         private huntingService: HuntingService) {}


  ngOnInit(): void {
    this.huntingForm = this.fb.group({
      competition_id: this.fb.control(null),
      member_id: this.fb.control(0, Validators.required),
      fish_id: this.fb.control(null),
      numberOfFish: this.fb.control(1),
      averageWeight: this.fb.control(0),
    });
    this.getCompetitions();
    this.getMembers();
    this.getFishes();
    console.log(this.getFishes());
  }

  onAddHunting() {
    const { competition_id, member_id, fish_id,numberOfFish,averageWeight } = this.huntingForm.value;
    const name = fish_id;
    this.fishService.checkFishWeight({ name, averageWeight }).subscribe(
      (response: any) => {
        if (response === true) {
          this.huntingService.addHunting({ member_id, competition_id, fish_id, numberOfFish }).subscribe(
            (addedHunting: any) => {
              if (addedHunting) {
                Swal.fire({
                  title: 'Success!',
                  text: 'Hunting added successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                this.huntingForm.reset();
                this.router.navigate(['/Dashboard']);
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: 'Member isn\'t existing in the competition.',
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              }
            },
            (updateError) => {
              console.error(updateError);
              Swal.fire({
                title: 'Error!',
                text: 'Failed to add hunting.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            }
          );
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Fish weight is below the average range. Please select another fish.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to check fish weight.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
    
  }

  getMembers() {
    this.memberService.getAllMembers().subscribe(
      (members: any) => {
        this.members = members;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCompetitions() {
    this.competitionService.getAllCompetitions().subscribe(
      (competition: any) => {
        this.competitions = competition;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getFishes() {
    this.fishService.getAllfishes().subscribe(
      (fish: any) => {
        this.fishes = fish;
        console.log(this.fishes);
        
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
