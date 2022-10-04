   // deck (rock, paper, scissor)
   const deck = document.querySelectorAll('.deck span');

   // comment
   let user_comment = document.getElementById("user_comment");
   let comp_comment = document.getElementById("comp_comment");
   let status_comment = document.getElementById("status");

   // screen
   const user = document.getElementById("user");
   const comp = document.getElementById("comp");

   // choice
   let comp_choice;
   let user_choice;

   // default score
   let comp_score=0,user_score=0;
   let status;

    // levels & turns    
   const level = document.getElementById("level")
   const turns = document.getElementById("turns")
   const levelName = document.getElementById("levelname")
   let currentLevel = 1;
   let currentTurns=3;
   

   let  alertScreen = document.querySelector(".alertScreen");
   let alertLevel = document.getElementById("alertLevel");
   let alertComment = document.getElementById("alertComment");

   let  nameMap ={
    1 : "Beginner",
    2 : "Trainee",
    3 : "Expert",
    }

    let themeMap={
    "Beginner":["linear-gradient(to right, #3a7bd5, #085379)","#085379"],
    "Trainee":["linear-gradient(to right, #7474bf, #348ac7)","#7474bf"],
    "Expert":["linear-gradient(to right, #8e0e00, #1f1c18)","#2a2424"], 
    }

   const levelupAlert=(alert_currentLevel=1,alert_levelName="Beginner",alert_comment="Best of Luck!")=>{
    alertScreen.classList.add("show")
        alertLevel.innerHTML = `Level ${alert_currentLevel}  ( ${alert_levelName} )`
        alertComment.innerText =alert_comment
    setTimeout(() => {
        alertScreen.classList.remove("show")
    }, 2700);
    } 
    levelupAlert()

     const retryAlert=(alert_comment)=>{
         alertLevel.innerHTML = ``
            alertScreen.classList.add("show")
        alertComment.innerText =alert_comment;
        setTimeout(() => {
            alertScreen.classList.remove("show")
        }, 2700);
    }
    
    
    
    // score updation
    const scoreUpdate=()=>{
       user_score>=0&&user_score<10 ? user.innerText="0"+user_score : user.innerText=user_score;
       comp_score>=0&&comp_score<10 ? comp.innerText="0"+comp_score : comp.innerText=comp_score;
    }
    
    const level_turnsUpdate=()=>{
        level.innerText = currentLevel;
        turns.innerText = currentTurns;
    }
    
    // before updation
    const beforeUpdate=()=>{
        user_comment.innerText=user_choice.id;
        comp_comment.innerText="--";
        status_comment.innerText="Making move..."
    }
    // comment updation
    const commentupdate=(ch_user,ch_comp,status)=>{
        user_comment.innerText=ch_user;
        comp_comment.innerText=ch_comp;
        status_comment.innerText=status;
    }
    
    const levelUp=()=>{
        currentLevel++;
        // turns reset
        currentTurns=3;
    //level name   
    levelName.innerText=nameMap[currentLevel];
    // theme
    document.documentElement.style.setProperty('--deeplightblue', themeMap[nameMap[currentLevel]][1]);
    document.documentElement.style.setProperty('--deepblue', themeMap[nameMap[currentLevel]][0]);
    console.log("current level= ",nameMap[currentLevel]);
    reset();
    levelupAlert(currentLevel,nameMap[currentLevel],"Best of Luck!")
}

const reset=()=>{
    user_comment.innerText="--";
    comp_comment.innerText="--";
    status_comment.innerText="Make your move!"
   }

   const retry=()=>{
    currentLevel=1;
    currentTurns=3;
    levelName.innerText=nameMap[currentLevel];
    document.documentElement.style.setProperty('--deeplightblue', themeMap[nameMap[currentLevel]][1]);
    document.documentElement.style.setProperty('--deepblue', themeMap[nameMap[currentLevel]][0]);
    comp_score=0;
    user_score=0;
    // resetting commenting
    reset();
    // retryAlert("You Lose! Try Again")
   }

   const noDraw=()=>{
    // creating a temp array from NodeList
    let temp = Array.from(deck);
    // removing the user's choice from temp array
    temp.splice(temp.indexOf(user_choice),1);
    // choosing maths choice randomly 
    comp_choice = temp[Math.floor(Math.random() * temp.length)];
    // pushing the item that was removed 
    temp.push(user_choice)
   }
   const cheatMap={
    "Rock":document.getElementById("Paper"),
    "Paper":document.getElementById("Scissor"),
    "Scissor":document.getElementById("Rock"),
   }
   const cheat=()=>{
    comp_choice = cheatMap[user_choice.id]
   }

    const judge=()=>{
    
    if(user_choice.id === comp_choice.id){
        status="Draw!";
        commentupdate(user_choice.id,comp_choice.id,status);
    }
    // CONDITION 1
    if(user_choice.id==="Rock"&&comp_choice.id==="Paper"){
        // user lose
        status="You Lose!";
        commentupdate(user_choice.id,comp_choice.id,status);
        comp_score++;
    }
    else if(user_choice.id==="Paper"&&comp_choice.id==="Rock"){
        //user win
        status="You Win!";
        commentupdate(user_choice.id,comp_choice.id,status);
        user_score++;
    }
    // CONDITION 2
    else if(user_choice.id==="Paper"&&comp_choice.id==="Scissor"){
        //user lose
        status="You Lose!";
        commentupdate(user_choice.id,comp_choice.id,status);
        comp_score++;
    }
    else if(user_choice.id==="Scissor"&&comp_choice.id==="Paper"){
        //user win
        status="You Win!";
        commentupdate(user_choice.id,comp_choice.id,status);
        user_score++;
    }
    // CONDITION 3
    else if(user_choice.id==="Scissor"&&comp_choice.id==="Rock"){
        //user lose
        status="You Lose!";
        commentupdate(user_choice.id,comp_choice.id,status);
        comp_score++;
    }
    else if(user_choice.id==="Rock"&&comp_choice.id==="Scissor"){
        //user win
        status="You Win!";
        commentupdate(user_choice.id,comp_choice.id,status);
        user_score++;
    }
    }

    deck.forEach(item=>{
        item.addEventListener('click',function(){
            if(currentTurns>0){

            // user's choice
            user_choice = item;
            // level_turnsUpdate()
            // console.log(currentTurns)
            
            
            beforeUpdate();
            
            // loading start 
            document.querySelector(".loading").style.visibility="visible"
            
            setTimeout(() => {

                // loading over after 3s
                document.querySelector(".loading").style.visibility="hidden"
                
                /*
                
                ****  LEVEL 1!! EASY PEASY  ****
                
                */
               
               if(currentLevel===1){
                    // comp's choice
                    comp_choice = deck[Math.floor(Math.random() * deck.length)];
                    console.log("comp choice LVL 1",comp_choice)
                }

                /*
                
                    ****  LEVEL 2!! REMOVED DRAW!!  ****
                
                */

                else if(currentLevel>=2){
                       noDraw();
                       user_score>3 ? cheat() : false
                }
                
                judge();
                scoreUpdate();
                level_turnsUpdate();

                // if draw then no turns
                status!="Draw!"?currentTurns-- : 0;
                // if turns = 0 and user's score is >=1 level up LEVEL 1
                if(currentTurns === 0 && user_score>=1){
                    level_turnsUpdate();
                    if(currentLevel===1){
                        levelUp();
                    }else if(currentLevel===2 && user_score>=3){
                        levelUp();
                    }else if(currentLevel===3 && user_score>=5){
                        levelUp();
                    }else{
                        retry();
                        scoreUpdate();
                        level_turnsUpdate();
                        console.log("turns="+currentTurns+"\nlevel="+currentLevel+"\nscore="+user_score)
                        retryAlert("You Lose! Try again")
                    }
                }else if(currentTurns === 0 && user_score<1){
                    retry();
                    scoreUpdate();
                    level_turnsUpdate();
                    console.log("turns="+currentTurns+"\nlevel="+currentLevel+"\nscore="+user_score)
                    retryAlert("You Lose! Try again")
                }

                level_turnsUpdate();
            }, 3000);

        }  //turns checking


        })

   })  // extracting items 

