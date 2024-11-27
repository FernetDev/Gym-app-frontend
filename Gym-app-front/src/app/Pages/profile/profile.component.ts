import { Component,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddMemberService } from '../../Services/member.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  memberId!: number;
  memberData: any = {};

  constructor(private route: ActivatedRoute, private memberService: AddMemberService) {}

  ngOnInit(): void{
    this.memberId = +this.route.snapshot.paramMap.get('id')!;

    this.memberService.obtenerMiembroId(this.memberId).subscribe((data) => {
      this.memberData = data;
    });
  }
}
  


