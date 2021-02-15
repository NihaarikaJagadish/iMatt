import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MainGame } from "../../services/mainGame.service";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OverlayServiceService } from './overlay-service.service';
@Component({
  selector: 'app-main-game',
  templateUrl: './main-game.component.html',
  styleUrls: ['./main-game.component.css'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class MainGameComponent implements OnInit {
  firstLetter = ["2","3","4","5","6","7","8","9","10","A","J","K","Q"];
  lastLetter = ["C","D","H","S"];
  player = [[],[],[]];
  dealer = [[]];
  totalCardsofPlayer;
  handGoal = 21;
  score = 21;
  limitOfCards = 30;
  timeForTotalGame = 30;
  timeForEachDraw = 0;
  repitionOfCards = true;
  numberOfCardsStartingDealer = 1;
  numberOfCardsStartingPlayer = 2;
  valueOfAce = 1;
  scoreObtainedPlayer = 0;
  scoreObtainedDealer = 0;

  flip: string = 'inactive';

  isActive1 = true;
  isActive2 = false;


 ngAfterViewInit() {
  //  this.service.showOverlay(1);
 }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }
  constructor(private dialog:MatDialog,private gameService : MainGame, private service: OverlayServiceService) { }

  ngOnInit(): void {
  //  this.service.showOverlay(1);


    // this.gameService.mainGame({"exID" : "EC-001"}).subscribe((res) => {
    //   console.log(res);
    // },(err) =>{
    //   console.log(err);
    // })

    for(var i = 0; i <this.numberOfCardsStartingDealer;i++){
      var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
      var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
      var finalString = "../../assets/cards/" + item1 + item2 + ".png";
      this.dealer[0].push(finalString);
      this.scoreObtainedDealer = this.scoreObtainedDealer + Number(this.charToNumber(item1));
    }
    this.dealer[0].push("../../assets/cards/BLANK.png");
    for(var i = 0; i <this.numberOfCardsStartingPlayer;i++){
      var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
      var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
      var finalString = "../../assets/cards/" + item1 + item2 + ".png";
      this.player[0].push(finalString);
      this.scoreObtainedPlayer = this.scoreObtainedPlayer + Number(this.charToNumber(item1));
    }
    this.totalCardsofPlayer = 2;
    this.openDialog();


  }

  openDialog(){
    const dialRef = this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda'
      },
      backdropClass: 'my-backdrop-dialog'
      
    });

    dialRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.service.showOverlay(1);
    });

  }
  advice(){
    console.log("advice pressed");
  }
  help(){
    console.log("advice pressed");
    this.openDialog();
  }

  charToNumber(ch){
    if(ch == 'A'){
      return 1;
    }
    else if(ch == 'J' || ch == 'K' || ch == 'Q'){
      return 11;
    }
    else{
      return ch;
    }
  }

  addCard(){
    var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
    var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
    var finalString = "../../assets/cards/" + item1 + item2 + ".png";
    if(this.totalCardsofPlayer <10 && this.totalCardsofPlayer < this.limitOfCards){
      this.player[0].push(finalString);
      this.totalCardsofPlayer = this.totalCardsofPlayer + 1;
    }
    else if(this.totalCardsofPlayer >= 10 && this.totalCardsofPlayer <20 && this.totalCardsofPlayer < this.limitOfCards){
      this.player[1].push(finalString);
      this.totalCardsofPlayer = this.totalCardsofPlayer + 1;
    }
    else if(this.totalCardsofPlayer >= 20 && this.totalCardsofPlayer <this.limitOfCards && this.totalCardsofPlayer < this.limitOfCards ){
      this.player[2].push(finalString);
      this.totalCardsofPlayer = this.totalCardsofPlayer + 1;
    }
  }

  totalTimeEvent(event){
    console.log(event);
    if(event["action"] == "done"){
      Swal.fire({
        text: "You have used up all the time alloted!!",
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'Okay',
        confirmButtonColor: 'red'
      }).then(result => {
      })

    }

  }

}
