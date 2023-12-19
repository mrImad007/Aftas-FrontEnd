import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Member } from '../../../Interfaces/Member';
import { identityDocumentType } from 'src/app/Interfaces/identityDocumentType';
import { MemberService } from 'src/app/services/Member/member-services.service';
import { Router } from '@angular/router';

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
    identiyNumber: '',
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
      id: this.fb.control(null),
      membershipNumber: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      nationality: this.fb.control('', [Validators.required]),
      identityNumber: this.fb.control('', [Validators.required]),
      identificationDocumentType: this.fb.control(identityDocumentType.CIN, [Validators.required]),
      membershipDate: this.fb.control(new Date(), [Validators.required]),
      competitionIds: this.fb.control([]),
    });
  }

  onSubmit() {
    const {
      num,
      name,
      familyName,
      nationality,
      identiyNumber,
      identityDocumentType,
      accessionDate,
    } = this.memberForm.value;

    this.newMember = {
      num,
      name,
      familyName,
      nationality,
      identiyNumber,
      identityDocumentType,
      accessionDate,
    };

    this.memberService.createMember(this.newMember).subscribe(
      (member) => {
        this.members.push(member);
        console.log(member);
        this.memberForm.reset();

        Swal.fire({
          title: 'Success!',
          text: 'Member created successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        console.error('Error creating member:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to create member. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
    this.router.navigate(['/Dashboard']);
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

}
