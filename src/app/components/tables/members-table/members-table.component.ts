import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Member } from '../../../Models/Member';
import { identityDocumentType } from 'src/app/Models/identityDocumentType';
import { MemberService } from 'src/app/services/Member/member-services.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styleUrls: ['./members-table.component.css'],
})
export class MembersTableComponent implements OnInit {

  public memberForm!: FormGroup;
  public currentPage = 1;
  public itemsPerPage = 2;
  public totalMembers = 0;

  identityDocumentTypeEnum = identityDocumentType;

  constructor(private fb: FormBuilder, private memberService: MemberService, private router: Router) {}

  public members: Member[] = [];

  newMember: Member = {
    num: 0,
    name: '',
    familyName: '',
    nationality: '',
    identityNumber: '',
    identityDocumentType: identityDocumentType.CIN,
    accessionDate: new Date()
  };

  ngOnInit(): void {
    this.initializeForm();
    this.getMembers();
    console.log(this.getMembers());
    
  }

  private initializeForm() {
    this.memberForm = this.fb.group({
      num: this.fb.control('', [Validators.required]),
      familyName: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      nationality: this.fb.control('', [Validators.required]),
      identityNumber: this.fb.control('', [Validators.required]),
      identityDocumentType: this.fb.control(identityDocumentType.CIN, [Validators.required]),
      accessionDate: this.fb.control(new Date(), [Validators.required]),
    });
  }

  onSubmit() {
    const {
      num,
      name,
      familyName,
      nationality,
      identityNumber,
      identityDocumentType,
      accessionDate,
    } = this.memberForm.value;

    this.newMember = {
      num,
      name,
      familyName,
      nationality,
      identityNumber,
      identityDocumentType,
      accessionDate,
    };

    this.memberService.createMember(this.newMember).subscribe(
      (member) => {
        this.members.push(member);
        console.log(member);
        this.memberForm.reset();
        if(member != null){
          Swal.fire({
            title: 'Success!',
            text: 'Member created successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }else{
          Swal.fire({
            title: 'Error!',
            text: 'Member Already Existing.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      (error) => {
        console.error('Error creating member:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create member.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
    this.router.navigate(['/Members']);
  }

  getMembers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    this.memberService.getAllMembers().subscribe(
      (members: any) => {
        // this.members = members.content.slice(startIndex, endIndex);
        this.members = members;
        console.log(this.members);
        
        this.totalMembers = members.totalElements;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  generateMembershipNumber() {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    this.memberForm.patchValue({
      membershipNumber: 'M' + randomNumber,
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getMembers();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getMembers();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalMembers / this.itemsPerPage);
  }

  deleteMember(num: string): void{
    console.log("Member num : "+num);
    this.memberService.deleteMember(num).subscribe(
      (response) => {
        console.log("response: "+response);
      }
    );
  }

  deleteMemberConfirmation(num: string): void {
    if (num !== undefined) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteMember(num);
          Swal.fire('Deleted!', 'Member has been deleted.', 'success');
          this.router.navigate(['/Members']);
        } else {
          console.log('Delete canceled by the user.');
        }
      });
      this.router.navigate(['/Members']);
    } else {
      console.error('Cannot delete Member without a valid ID.');
    }
  }

}
