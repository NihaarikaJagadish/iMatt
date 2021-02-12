import {Component, AfterViewInit, OnInit, ViewEncapsulation} from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { DialogComponent } from './dialog/dialog.component';
import { MainGame } from "../../services/mainGame.service";
import { OverlayServiceService } from './overlay-service.service'
@Component({
  selector: 'app-button-types-example',
  templateUrl: './button-types-example.component.html',
  styleUrls: ['./button-types-example.component.css']
})
export class ButtonTypesExampleComponent implements AfterViewInit, OnInit {

  isActive1 = true;
  isActive2 = false;

  firstLetter = ["2","3","4","5","6","7","8","9","10","A","J","K","Q"];
  lastLetter = ["C","D","H","S"];
  player = [[],[],[]];
  dealer = [[]];
  totalCardsofPlayer;
  handGoal:any;
  score:any;
  limitOfCards:any;
  timeForTotalGame = 0;
  timeForEachDraw:any;
  repitionOfCards:any;
  numberOfCardsStartingDealer:any;
  numberOfCardsStartingPlayer:any;
  valueOfAce = 1;
  scoreObtainedPlayer = 0;
  scoreObtainedDealer = 0;
  constructor(private dialog:MatDialog,private gameService : MainGame,private service: OverlayServiceService) { }

  ngOnInit(): void {

    this.gameService.mainGame().subscribe((res) => {
      console.log(res);
    var result = res[0];
    this.handGoal = result["hand_goal"];
    this.limitOfCards = result["card_limit"];
    this.timeForTotalGame = result["game_time_limit"];
    if(this.timeForTotalGame <0){
      this.timeForEachDraw = 0;
    }
    this.timeForEachDraw = result["round_time_limit"];
    if(this.timeForEachDraw <0){
      this.timeForEachDraw = 0;
    }
    this.repitionOfCards = result["repeat_cards"];
    this.score = result["score_to_reach"];
    this.numberOfCardsStartingDealer = result["dealer_visible_deck_count"];
    this.numberOfCardsStartingPlayer = result["starting_deck_count"];
    for(var i = 0; i <this.numberOfCardsStartingDealer ;i++){
      var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
      var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
      var finalString = "../../assets/cards/" + item1 + item2 + ".png";
      this.dealer[0].push(finalString);
    }
    this.dealer[0].push("../../assets/cards/BLANK.png");
    for(var i = 0; i <this.numberOfCardsStartingPlayer;i++){
      var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
      var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
      var finalString = "../../assets/cards/" + item1 + item2 + ".png";
      this.player[0].push(finalString);
    }
    this.totalCardsofPlayer = this.numberOfCardsStartingPlayer;
    },(err) =>{
      console.log(err);
    })

    


  }

  ngAfterViewInit() {
    this.service.showOverlay(1);
  }

  restartOnboarding() {
    this.service.showOverlay(1);
  }

  openDialog(){
    console.log("Hello");
    // this.dialog.open(DialogComponent, {
    //   data: {
    //     animal: 'panda'
    //   }
    // });
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
    if(event["action"] == "done" && this.timeForTotalGame > 0){
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
