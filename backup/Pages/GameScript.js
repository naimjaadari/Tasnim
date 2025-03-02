var Table = [3, 2, 3, 2, 1, 3, 2, 2, 1, 2];


function Guess(ch) {
    for(i = 1; i <= 3; i++){
        var id = "Box" + i
        var box = document.getElementById(id)
        var False = document.getElementById('False' + i)
        var Correct = document.getElementById('Correct' + i)

        if(i != Table[ch[0]]){
            box.style.border = "0.5vmin solid red";
            box.style.background = "rgba(255, 0, 0, 0.395)"
            box.style.transform = "scale(1.1)"
            False.style.display = "flex"
        }else{
            box.style.border = "0.5vmin solid lime";
            box.style.background = "rgba(0, 255, 0, 0.395)"
            box.style.transform = "scale(1.1)"
            Correct.style.display = "flex"
        }
    }
    var Correct = Table[ch[0]]
    var UserSelect = ch[1]
    var Answer = false
    if(UserSelect == Correct){
        Answer = true
    }

    document.getElementById('Next').style.display = "flex"
    window.parent.postMessage({ type: 'changeBox1', text: Answer, Q:ch[0] }, '*');
}

function NextQ(){
    document.getElementById('Next').style.display = "none"
    window.parent.postMessage({ type: 'OpenNextQ'}, '*');
}



function Guess2(ch) {
    var Box1 = document.getElementById('Box1');
    var Box2 = document.getElementById('Box2');
    var Box3 = document.getElementById('Box3');
    Box2.style.display = "flex"
    
    for(i = 1; i <= 3; i++){
        var id = "Box" + i
        var box = document.getElementById(id)
        var False = document.getElementById('False' + i)
        var Correct = document.getElementById('Correct' + i)

        if(i != Table[ch[0]]){
            box.style.border = "0.5vmin solid red";
            box.style.background = "rgba(255, 0, 0, 0.395)"
            box.style.transform = "scale(1.1)"
            False.style.display = "flex"
        }else{
            box.style.border = "0.5vmin solid lime";
            box.style.background = "rgba(0, 255, 0, 0.395)"
            box.style.transform = "scale(1.1)"
            Correct.style.display = "flex"
        }
    }


    var Correct = Table[ch[0]]
    var UserSelect = ch[1]
    var Answer = false
    if(UserSelect == Correct){
        Answer = true
    }

    document.getElementById('Next').style.display = "flex"
    window.parent.postMessage({ type: 'changeBox1', text: Answer, Q:ch[0] }, '*');
}

function Correct(ch) {
    var Box2 = document.getElementById('Box2');
    Box2.style.border = "0.5vmin solid lime";
    Box2.style.background = "rgba(0, 255, 0, 0.395)"
    Box2.style.transform = "scale(1.1)"
    window.parent.postMessage({ type: 'Complete'}, '*');
}


function Reset(num){
    var Box1 = document.getElementById('Box1');
    var Box2 = document.getElementById('Box2');
    var Box3 = document.getElementById('Box3');
    if(num == 1){
        Box1.style.display = "none"
    }else{
        Box3.style.display = "none"
    }


}