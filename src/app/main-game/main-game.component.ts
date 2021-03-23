import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import Swal from 'sweetalert2';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MainGame } from "../../services/mainGame.service";
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OverlayServiceService } from './overlay-service.service';
import { Observable, ObservableInput } from 'rxjs';


import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import {Router, NavigationEnd } from '@angular/router';
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
  dealer = [[],[],[]];
  totalCardsofPlayer = 0;
  totalCardsofDealer = 0;
  handGoal = 21;
  score = 21;
  limitOfCards = 30;
  limitOfCardForDealer = 0;
  timeForTotalGame = 30;
  timeForEachDraw = 0;
  repitionOfCards = true;
  numberOfCardsStartingDealer = 1;
  numberOfCardsStartingPlayer = 2;
  valueOfAce = 1;
  scoreObtainedPlayer = 0;
  scoreObtainedDealer = 0;
  temp =[];

  stopGame = false;
  flagVar = false;

  flip: string = 'inactive';

  isActive1 = true;
  isActive2 = false;

  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isTablet: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Tablet)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isMedium: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Medium)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


 ngAfterViewInit() {
  //  this.service.showOverlay(1);
 }

  toggleFlip() {
    this.flip = (this.flip == 'inactive') ? 'active' : 'inactive';
  }
  constructor(private breakpointObserver: BreakpointObserver,private dialog:MatDialog,private gameService : MainGame, private service: OverlayServiceService) { }
  checkNatural(who){
    var count = 0;
    if(this.temp.indexOf("10") != -1){
      count = count + 1;
    }
    if(this.temp.indexOf("J")!= -1){
      count = count + 1;
    }
    if(this.temp.indexOf("K")!= -1){
      count = count + 1;
    }
    if(this.temp.indexOf("Q")!= -1){
      count = count + 1;
    }
    if(count>=2){
      Swal.fire({
        text: "The "+ who+ " Has won the game as he has a Natural!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Okay',
        confirmButtonColor: 'green'
      }).then(result => {
      })
    }
    else{
      return false;
    }

  }
  ngOnInit(): void {
  //  this.service.showOverlay(1);
//   {
//     "id": 1,
//     "code": "EC001",
//     "hand_goal": 21,
//     "card_limit": 20,
//     "game_time_limit": "-1.00",
//     "round_time_limit": "-1.00",
//     "repeat_cards": true,
//     "score_to_reach": "100.00",
//     "dealer_visible_deck_count": 2,
//     "starting_deck_count": "2.00"
// }

    this.gameService.mainGame().subscribe((res) => {
      this.handGoal = res[0]["hand_goal"];
      // this.limitOfCards = res[0]["card_limit"];
      this.limitOfCards = 30
      // this.limitOfCardForDealer = Math.abs(this.limitOfCards * 0.5);
      this.limitOfCardForDealer = this.limitOfCards;

      this.timeForTotalGame = parseInt(res[0]["game_time_limit"]);

      if(this.timeForTotalGame < 0){
        this.timeForTotalGame = 0;
        this.flagVar = true;
      }
      this.timeForEachDraw = parseInt(res[0]["round_time_limit"]);
      if(this.timeForEachDraw<0){
        this.timeForEachDraw =0;
        this.flagVar = true;
      }
      this.repitionOfCards = res[0]["repeat_cards"];
      this.score = res[0]["score_to_reach"];
      this.numberOfCardsStartingDealer = res[0]["dealer_visible_deck_count"];
      this.numberOfCardsStartingPlayer = res[0]["starting_deck_count"];
      this.temp = [];
      for(var i = 0; i <this.numberOfCardsStartingDealer;i++){
        var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
        this.temp.push(item1);
        // this.checkNatural("Dealer");
        var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
        var finalString = "../../assets/cards/" + item1 + item2 + ".png";
        this.dealer[0].push(finalString);
        this.scoreObtainedDealer = this.scoreObtainedDealer + Number(this.charToNumber(item1));
        this.totalCardsofDealer = this.totalCardsofDealer + 1;
      }
      this.temp= [];
      this.dealer[0].push("../../assets/cards/BLANK.png");
      for(var i = 0; i <this.numberOfCardsStartingPlayer;i++){
        var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
        this.temp.push(item1);
        // this.checkNatural("Player");
        var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
        var finalString = "../../assets/cards/" + item1 + item2 + ".png";
        this.player[0].push(finalString);
        this.scoreObtainedPlayer = this.scoreObtainedPlayer + Number(this.charToNumber(item1));
        this.totalCardsofPlayer = this.totalCardsofPlayer + 1;
      }
      this.openDialog();

    },(err) =>{
      console.log(err);
    })
  }

  checkSoft(){
    if(this.scoreObtainedDealer < 17){
      var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
      this.temp.push(item1);
      var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
      var finalString = "../../assets/cards/" + item1 + item2 + ".png";
      this.dealer[0].push(finalString);
      this.scoreObtainedDealer = this.scoreObtainedDealer + Number(this.charToNumber(item1));
    }
    else{
      return;
    }
  }

  dealerShow(){
    this.dealer[0].pop();
    var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
        this.temp.push(item1);
        var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
        var finalString = "../../assets/cards/" + item1 + item2 + ".png";
        this.dealer[0].push(finalString);
        this.scoreObtainedDealer = this.scoreObtainedDealer + Number(this.charToNumber(item1));
    // this.checkSoft();
  }

  dealerDrawCards(){
    this.dealer[0].pop();
    var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
    this.temp.push(item1);
    var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
    var finalString = "../../assets/cards/" + item1 + item2 + ".png";
    this.dealer[0].push(finalString);
    this.scoreObtainedDealer = this.scoreObtainedDealer + Number(this.charToNumber(item1));
    this.dealer[0].push("../../assets/cards/BLANK.png");
    if(this.scoreObtainedDealer>this.handGoal){
      Swal.fire({
        text: "The dealer had a bust",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Okay',
        confirmButtonColor: 'red'
      }).then(result => {
      })
      return;
    }
    if(this.totalCardsofPlayer> this.limitOfCards){
      this.checkScore()
      Swal.fire({
        text: "The dealer decided to stand",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Okay',
        confirmButtonColor: 'red'
      }).then(result => {
      })
    }
    // this.dealerDrawCards();
  }
  checkFinalScore(){
    if((this.handGoal - this.scoreObtainedDealer) < (this.handGoal - this.scoreObtainedPlayer)){
      this.stopGame = true
      Swal.fire({
        text: "The Dealer decided to stand and he wins!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Okay',
        confirmButtonColor: 'red'
      }).then(result => {
      })
    }
    else{
      this.stopGame = true
      Swal.fire({
        text: "The Dealer had a Bust and the Player wins!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Okay',
        confirmButtonColor: 'red'
      }).then(result => {
      })
    }
  }
  checkScoreDealer(){
    if(this.scoreObtainedDealer >this.handGoal){
      this.stopGame = true
      Swal.fire({
        text: "It is a bust!! The Player wins the Game!",
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Okay',
        confirmButtonColor: 'red'
      }).then(result => {
      })
    }

  }

  dealerFunction(){
    if(!this.stopGame){
        console.log(this.dealer);
        var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
        var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
        var finalString = "../../assets/cards/" + item1 + item2 + ".png";
        if(this.totalCardsofDealer <10 && this.totalCardsofDealer < this.limitOfCardForDealer){
          this.dealer[0].push(finalString);
          this.scoreObtainedDealer = this.scoreObtainedDealer + Number(this.charToNumber(item1));
          this.totalCardsofDealer = this.totalCardsofDealer + 1;
          this.checkScoreDealer();
        }
        else if(this.totalCardsofDealer >= 10 && this.totalCardsofDealer < 20 && this.totalCardsofDealer < this.limitOfCardForDealer){
          this.dealer[1].push(finalString);
          this.scoreObtainedDealer = this.scoreObtainedDealer + Number(this.charToNumber(item1));
          this.totalCardsofDealer = this.totalCardsofDealer + 1;
          this.checkScoreDealer();
        }
        else if(this.totalCardsofDealer >= 20 && this.totalCardsofDealer < 30 && this.totalCardsofDealer < this.limitOfCardForDealer){
          this.dealer[2].push(finalString);
          this.scoreObtainedDealer = this.scoreObtainedDealer + Number(this.charToNumber(item1));
          this.totalCardsofDealer = this.totalCardsofDealer + 1;
          this.checkScoreDealer();
        }
        else{
          this.checkFinalScore();
        }
        if(this.totalCardsofDealer == this.limitOfCardForDealer){
          this.checkFinalScore();
        }
    }
    
  }
 
  loopFunction(){
    setInterval(() => this.dealerFunction(),2000)
  }

  standFunc(){
    if(!this.stopGame){
        Swal.fire({
          text: "The Player Decided to Stand. The Dealer will now play",
          showCancelButton: false,
          confirmButtonText: 'Okay',
          confirmButtonColor: 'red'
        }).then(result => {
          this.dealer[0].pop()
          this.loopFunction();
        })
    }
    
  }
  openDialog(){
    const dialRef = this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda'
      },
      backdropClass: 'my-backdrop-dialog'
      
    });

    dialRef.afterClosed().subscribe(result => {
      // this.service.showOverlay(1);
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

  checkScore(){
    if(this.scoreObtainedPlayer >this.handGoal){
    this.stopGame = true;
      Swal.fire({
        text: "It is a bust!! The Dealer wins the Game!",
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Okay',
        confirmButtonColor: 'red'
      }).then(result => {
      })
    }
  }

  addCard(){
    if(!this.stopGame){
        var item1 = this.firstLetter[Math.floor(Math.random() * this.firstLetter.length)];
        var item2 = this.lastLetter[Math.floor(Math.random() * this.lastLetter.length)];
        var finalString = "../../assets/cards/" + item1 + item2 + ".png";
        if(this.totalCardsofPlayer <10 && this.totalCardsofPlayer < this.limitOfCards){
          this.player[0].push(finalString);
          this.totalCardsofPlayer = this.totalCardsofPlayer + 1;
          this.scoreObtainedPlayer = this.scoreObtainedPlayer + Number(this.charToNumber(item1));
          this.checkScore();
        }
        else if(this.totalCardsofPlayer >= 10 && this.totalCardsofPlayer <20 && this.totalCardsofPlayer < this.limitOfCards){
          this.player[1].push(finalString);
          this.totalCardsofPlayer = this.totalCardsofPlayer + 1;
          this.scoreObtainedPlayer = this.scoreObtainedPlayer + Number(this.charToNumber(item1));
          this.checkScore();
        }
        else if(this.totalCardsofPlayer >= 20 && this.totalCardsofPlayer <30 && this.totalCardsofPlayer < this.limitOfCards ){
          this.player[2].push(finalString);
          this.totalCardsofPlayer = this.totalCardsofPlayer + 1;
          this.scoreObtainedPlayer = this.scoreObtainedPlayer + Number(this.charToNumber(item1));
          this.checkScore();
        }
    }
  }

  totalTimeEvent(event){
    if(event["action"] == "done" && this.flagVar == false){
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
