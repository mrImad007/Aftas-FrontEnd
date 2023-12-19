import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  hidden : boolean = true;
  @Input() color!: string;
  @Input() name!: string;
  @Input() title!: string;
  @Input() isEditForm : boolean = false;
  @Output() populateUpdateForm = new EventEmitter<void>();

  ngOnInit(): void {
    this.hidden = true;
  }

  constructor(){}

  Toggle() {
    if (this.isEditForm) {
      this.populateUpdateForm.emit();
    }
    this.hidden = !this.hidden;
  }
}
