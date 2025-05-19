//Codigos Base
let canvas = document.getElementById('canvas');
let ctx =  canvas.getContext('2d');
var botao = document.getElementById("button")
var music_end = new Audio('jogo/sound/soulsofmist.mp3');
var music_norm = new Audio('jogo/sound/maideninblack.mp3');
var music_chav = new Audio('jogo/sound/blockworld.mp3')
var music_sala6 = new Audio('jogo/sound/page7.mp3')
var music_GO = new Audio('jogo/sound/Distorted.mp3')
var music_false = new Audio('jogo/sound/wlw.mp3')

//Pre functions né?
let game_on = 0

//player
let vidas = 5;
let id_room = 0;
let chave = 0;
let mod = 0;

let poder_mov = true 

let player = { //obj_player prr
    x: 560,
    y: 720,
    largura: 80,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
player.img.src = 'jogo/imgs/trans.png';

let player_spr = { //Sprite do player que é != do obj_Player 
    x: 560,
    y: 720,
    largura: 80,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
function playerdraw(){
    if(id_room == 7){
        player_spr.img.src = 'jogo/imgs/player_escuro.png';

    }
    else if(id_room == 6){
        player_spr.img.src = 'jogo/imgs/player_escuro_fim.png';
    }
    else{
        player_spr.img.src = 'jogo/imgs/player.png';
    }
}




function vdd(){ 
    poder_mov = true;
}

function spr_segue_player(){
    let frames = 0;
    let frames_max = 0;
    if(id_room != 6 && id_room != 7){
        if(mod == 1){frames_max = 22;}
        else{frames_max = 17}
        
    }
    if(id_room == 7){
        frames_max = 25;
    }
    if(id_room == 6){
        frames_max = 2000;
        poder_mov = false;
    }

    let anim_x = (player.x - player_spr.x) / frames_max;
    let anim_y = (player.y - player_spr.y) / frames_max;

    function animar() {
        if(frames < frames_max) {
            player_spr.x += anim_x;
            player_spr.y += anim_y;
            frames ++;
            update_game();
            requestAnimationFrame(animar);
        }
        
        else{
            player_spr.x = player.x;
            player_spr.y = player.y;
            update_game();
            setTimeout(vdd(),1000 )
        }
    }

    animar();
}




//traps
let espinhos_honzy_1 = { 
    x: 160,
    y: 400,
    largura: 880,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
espinhos_honzy_1.img.src = 'jogo/imgs/espinho_hornz.png';

let espinhos_honzy_2 = { 
    x: 160,
    y: 160,
    largura: 880,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
espinhos_honzy_2.img.src = 'jogo/imgs/espinho_hornz.png';

let espinhos_honzy_3 = { 
    x: 160,
    y: 640,
    largura: 880,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
espinhos_honzy_3.img.src = 'jogo/imgs/espinho_hornz.png';

let espinhos_verty_1 = { 
    x: 160,
    y: 160,
    largura: 80,
    altura: 560,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
espinhos_verty_1.img.src = 'jogo/imgs/espinho_ver.png';

let espinhos_verty_2 = { 
    x: 560,
    y: 160,
    largura: 80,
    altura: 560,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
espinhos_verty_2.img.src = 'jogo/imgs/espinho_ver.png';

let espinhos_verty_3 = { 
    x: 960,
    y: 160,
    largura: 80,
    altura: 560,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
espinhos_verty_3.img.src = 'jogo/imgs/espinho_ver.png';

//Titulo, pq não né?
let bgtt = {
    id: 'background',
    x: 0,
    y: 0,
    largura: 2000,
    altura: 2000,
    cor: 'black',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let titulo = {
    x: 75,
    y: 240,
    altura: 600,
    largura: 1060,
    img: new Image(),   
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }
}

titulo.img.onload = function(){
    tela_inicial();
}
titulo.img.src = 'jogo/imgs/logo.png';

function tela_inicial(){
    poder_mov = false;
    bgtt.desenha();
    titulo.desenha();
}


//Muda para a game play 
function muda_tela(){
    ctx.clearRect(0,0, 10000, 10000)
    update_game();
    id_room += 1
    botao.disabled = true;
    poder_mov = true;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.fillStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.font = "50px Arial"
    ctx.textAlign = "center";
    ctx.fillText("Pressione qual quer tecla!!!", 560, 480)
    ctx.strokeText("Pressione qual quer tecla!!!", 560, 480)
    ctx.closePath();
    music_norm.play();
}



//codi do jogo...
let hud_bg = {
    x: 0,
    y: 880,
    largura: 1200,
    altura: 160,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }
}
hud_bg.img.src = 'jogo/imgs/hudbg.png';

let cr1 = {
    x: 110,
    y: 930,
    largura: 64,
    altura: 64,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }
}
cr1.img.src = 'jogo/imgs/coração.png';
let cr2 = {
    x: 160,
    y: 930,
    largura: 64,
    altura: 64,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }
}
cr2.img.src = 'jogo/imgs/coração.png';
let cr3= {
    x: 210,
    y: 930,
    largura: 64,
    altura: 64,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }
}
cr3.img.src = 'jogo/imgs/coração.png';
let cr4 = {
    x: 260,
    y: 930,
    largura: 64,
    altura: 64,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }
}
cr4.img.src = 'jogo/imgs/coração.png';
let cr5 = {
    x: 310,
    y: 930,
    largura: 64,
    altura: 64,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }
}
cr5.img.src = 'jogo/imgs/coração.png';


function hud(){
    hud_bg.desenha();
    if(vidas == 5){
        cr1.desenha()
        cr2.desenha()
        cr3.desenha()
        cr4.desenha()
        cr5.desenha()
    }
    if(vidas == 4){
        cr1.desenha()
        cr2.desenha()
        cr3.desenha()
        cr4.desenha()
    }
    if(vidas == 3){
        cr1.desenha()
        cr2.desenha()
        cr3.desenha()
    }
    if(vidas == 2){
        cr1.desenha()
        cr2.desenha()
    }
    if(vidas == 1){
        cr1.desenha()
    }

    if(chave != 0){
        chav_hud.desenha()
    }

}



function colisao(){
    const paredesX = [80, 160, 240, 320, 400, 720, 800, 880, 960, 1040];
    const paredesY = [80, 160, 240, 560, 640, 720];
    const paredeespc_1 = [480, 560, 640];
    const paredeespc_2 = [320, 400, 480];

    const espnh_vert = [160, 240, 320, 400, 480, 560, 640];
    const espnh_horz = [160, 240, 320, 400, 480, 560, 640, 720, 800, 960]

    if(paredesX.includes(player.x)){
        if (player.y == 800){
            player.y = player.y - 80;
        }
        if (player.y == 0){
            player.y = player.y + 80;
        }
    }

    if(paredesY.includes(player.y)){
        if(player.x == 0){
            player.x = player.x + 80
        }
        if(player.x == 1120){
            player.x = player.x - 80
        }
    }

    if(paredeespc_1.includes(player.x)){
        if(player.y == 800){
            if(id_room == 1 && chave == 0){
                player.y = player.y - 80;
            }
            if(id_room == 3){
                player.y = player.y - 80;
            }
            if(id_room == 4){
                player.y = player.y - 80;
            }
            if(id_room == 7){
                player.y = player.y - 80;
            }
            if(id_room == 8){
                player.y = player.y - 80;
            }
            
        }
        if(player.y == 0){
            if(id_room == 5){
                player.y = player.y + 80;
            }
            if(id_room == 2){
                if(chave ==  0){
                    player.y = player.y += 80
                }
            }
            if(id_room == 3){
                player.y = player.y + 80;
            }
            if(id_room == 7){
                player.y = player.y + 80;
            }
            if(id_room == 8){
                player.y = player.y + 80;
            }
        }
 
        
    }
    
    if(paredeespc_2.includes(player.y)){
        if(player.x == 1120){
            if(id_room == 4){
                player.x = player.x - 80;
            }
            if(id_room == 6){
                player.x = player.x - 80;
            }
            if(id_room == 2){
                player.x = player.x - 80;
            }
            if(id_room == 8){
                player.x = player.x - 80;
            }
            
        }
        if(player.x == 0){
            if(id_room == 6){
                player.x = player.x + 80;
            }
            if(id_room == 3){
                player.x = player.x + 80;
            }
            if(id_room == 7){
                player.x = player.x + 80;
            }
            if(id_room == 8){
                player.x = player.x + 80;
            }
        }
    }

    if(espnh_vert.includes(player.y)){
        
        if(id_room == 3){
            if(player.x == 160 || player.x == 960){
                player.x += 80
                player_spr.x -= 80
                if(mod == 0){vidas -= 1}
            }
         }
        if(id_room == 5){
            if(player.x == 160 || player.x == 560 || player.x == 960){
                player.x += 80
                player_spr.x -= 80
                player_spr.y -= 20
                if(mod == 0){vidas -= 1}
            }

        }
    }

    if(espnh_horz.includes(player.x)){
        
        if(id_room == 3){
            if(player.y == 400 || player.y == 640){
                player.y -= 80
                player_spr.x -= 20
                player_spr.y -= 80
                if(mod == 0){vidas -= 1}
            }
         }
        if(id_room == 4){
            if(player.y == 160 || player.y == 400 || player.x == 640){
                player.y -= 80
                player_spr.x -= 20
                player_spr.y -= 80
                if(mod == 0){vidas -= 1}
            }

        }
    }

    if(id_room == 7){
        if(player.x == 560 && player.y == 400){
            chave = 1
        }
    }

    if(id_room == 8){
        if(player.y == caixa.y && player.x == caixa.x){
            id_room = 9
        }
    }
    /* if(id_room = 6){
        if(player_spr.x == player.x && player_spr.y == player.y){
            id_room = 10
        }
    } */
    

}

function update_game(){    // Aqui atualiza constantes no jogo, apenas oq repete em todos os cenarios 
    ctx.clearRect(0,0, 10000, 10000)
    muda_sala();
    playerdraw();
    desenhar_sala();
    colisao()
    console.log("Sala:", id_room)
    console.log("PlayerX: ", player.x)
    console.log("PlayerY: ",player.y)
    console.log("Vidas: ", vidas)
    if(vidas == 0){
        id_room = 11
    }
    

}


document.addEventListener('keydown', function(evento){
    if (poder_mov != true) return;
    
    let tecla = evento.key;
    console.log(tecla);

    let vel = 80;
    if (tecla == "w"){
        player.y -= vel;
        /* player_spr.y -= vel; */
      

    }
    if(tecla == "s"){
        player.y += vel;
        /* player_spr.y += vel; */

    }
    if(tecla == "d"){
        player.x += vel;
        /* player_spr.x += vel; */

    }
    if(tecla == "a"){
        player.x -= vel;
        // player_spr.x -= vel;
    }
    if(tecla == "k"){
        if(mod == 0){
            mod = 1
        }
        else{
            mod = 0 
        }
    }
    

    poder_mov = false;
    update_game();
    spr_segue_player();
    
})


function muda_sala(){
    if(id_room == 1){  
        if(player.y < 0){
            id_room = 2
            player.y = 800
            player.x = 560
            player_spr.y = 880
            player_spr.x = 560
        }
        if(player.x < 0){
            id_room = 3
            player.x = 1120
            player.y = 400
            player_spr.x = 1200
            player_spr.y = 400
        }
        if(player.x > 1120){
            id_room = 4
            player.x = 0
            player.y = 400
            player_spr.x = -80
            player_spr.y = 400
        }
        if(player.y > 800 && chave ==1){
            id_room = 6
            player.x = 560
            player.y = 720
            player_spr.x = 560
            player_spr.y = -80
            frames_max = 1000
            poder_mov = false
        }
    }
    if(id_room == 2){
        if(player.y < 0 && chave == 1){
            id_room = 8
            player.y = 800
            player.x = 560
            player_spr.y = 880
            player_spr.x = 560
        }
        if(player.x < 0){
            id_room = 5
            player.x = 1120
            player.y = 400
            player_spr.x = 1200
            player_spr.y = 400
        }
        if(player.y > 800){
            id_room = 1
            player.x = 560
            player.y = 0
            player_spr.x = 560
            player_spr.y = -80
        }


        
    }
    if(id_room == 3){
        if(player.y < 0){
            id_room = 5
            player.y = 800
            player.x = 560
            player_spr.y = 880
            player_spr.x = 560
        }
        if(player.x > 1120){
            id_room = 1
            player.x = 0
            player.y = 400
            player_spr.x = -80
            player_spr.y = 400
        }

    }
    if(id_room == 4){

        if(player.x < 0){
            id_room = 1
            player.x = 1120
            player.y = 400
            player_spr.x = 1200
            player_spr.y = 400
        }
        
    }
    
    if(id_room == 5){
        if(player.x > 1120){
            id_room = 2
            player.x = 0
            player.y = 400
            player_spr.x = -80
            player_spr.y = 400
        }
        if(player.x < 0){
            id_room = 7
            player.x = 1120
            player.y = 400
            player_spr.x = 1200
            player_spr.y = 400
            music_chav.play();
        }
        if(player.y > 800){
            id_room = 3
            player.x = 560
            player.y = 0
            player_spr.x = 560
            player_spr.y = -80
        }
        
    }

    if(id_room == 6){

        if(player_spr.y == player.y){
            id_room = 10
        }
    }

    if(id_room == 7){
        if(player.x > 1120){
            music_chav.pause()
            music_chav.currentTime = 0;
            id_room = 5
            player.x = 0
            player.y = 400
            player_spr.x = -80
            player_spr.y = 400
            music_norm.play();
        }
        
    }

    
}

function sala_1(){
    chao_norm.desenha()
    parede_top1.desenha();
    parede_top2.desenha();
    parede_left1.desenha();
    parede_left2.desenha();
    parede_right1.desenha();
    parede_right2.desenha();
    parede_down1.desenha();
    parede_down2.desenha();
    player.desenha();
    playerdraw();
    player_spr.desenha();
    hud();
    
    if(chave == 0){
        porta.desenha();
    }
}
function sala_2(){
    chao_norm.desenha()
    parede_top1.desenha();
    parede_top2.desenha();
    parede_left1.desenha();
    parede_left2.desenha();
    parede_right3.desenha();
    parede_right2.desenha();
    parede_down1.desenha();
    parede_down2.desenha();
    if(chave == 0){
        porta_top.desenha();
    }
    player.desenha();
    playerdraw();
    player_spr.desenha();
    hud();
    
}
function sala_3(){
    chao_norm.desenha();
    parede_top1.desenha();
    parede_top3.desenha();
    parede_right1.desenha();
    parede_right2.desenha();
    parede_left3.desenha();
    parede_down3.desenha();
    espinhos_honzy_1.desenha()
    espinhos_honzy_3.desenha()
    espinhos_verty_1.desenha()
    espinhos_verty_3.desenha()
    player.desenha();
    playerdraw();
    player_spr.desenha();
    hud();
  
}
function sala_4(){
    chao_norm.desenha();
    parede_top1.desenha();
    parede_top2.desenha();
    parede_left1.desenha();
    parede_left2.desenha();
    parede_right3.desenha();
    parede_down3.desenha();
    espinhos_honzy_1.desenha()
    espinhos_honzy_2.desenha()
    espinhos_honzy_3.desenha()
    player.desenha();
    playerdraw();
    player_spr.desenha();
    hud();

}
function sala_5(){
    chao_norm.desenha();
    parede_top3.desenha();
    parede_left1.desenha();
    parede_left2.desenha();
    parede_right1.desenha();
    parede_right2.desenha();
    parede_down1.desenha();
    parede_down2.desenha();
    espinhos_verty_1.desenha()
    espinhos_verty_2.desenha()
    espinhos_verty_3.desenha()
    player.desenha();
    playerdraw();
    player_spr.desenha();
    hud();
    
}
function sala_6(){
    chao_chav.desenha();
    player.desenha();
    playerdraw();
    player_spr.desenha();
    bixo.desenha();

    

    
}
function sala_chave(){
    chao_chav.desenha();
    player.desenha();
    playerdraw();
    player_spr.desenha();
    if(chave == 0){
        chav.desenha();
    }
    if(chave == 1){  
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = '#4c0001';
        ctx.fillStyle = '#4c0001';
        ctx.font = "100px Arial"
        ctx.textAlign = "center";
        ctx.fillText("SAIA! --->", 560, 480)
        ctx.strokeText("SAIA! --->", 560, 480)
        ctx.closePath(); 

    }  
}

function Game_over(){
    chao_chav.desenha();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.font = "100px Times New Roman"
    ctx.textAlign = "center";
    ctx.fillText("Game Over...", 560, 80)
    ctx.strokeText("Game Over...", 560, 80)
    ctx.closePath();
    
    
    
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.font = "50px Times New Roman"
    ctx.textAlign = "center";
    ctx.fillText("Deixe a esuridão te dominar...", 560, 960)
    ctx.strokeText("Deixe a esuridão te dominar...", 560, 960)
    ctx.closePath();
    murte.desenha()


}

function final_falso(){
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = 'green';
    ctx.fillStyle = 'green';
    ctx.font = "150px Times New Roman"
    ctx.textAlign = "center";
    ctx.fillText("Parabens...", 560, 160)
    ctx.strokeText("Parabens...", 560, 160)
    ctx.closePath();
    
    false_end.desenha()
    
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = 'green';
    ctx.fillStyle = 'green';
    ctx.font = "50px Times New Roman"
    ctx.textAlign = "center";
    ctx.fillText("Achastes a Jade Stone... Nada acontece...", 560, 960)
    ctx.strokeText("Achastes a Jade Stone... Nada acontece...", 560, 960)
    ctx.closePath();

    console.log("Patetic0... Apenas patetic0...")
    console.log("Vc achou a luz... Mas do que isso adiata?...")
    console.log("O mundo está doente... Morrendo!...")
    console.log("Aqui na luz vc não vai encontrar nada...")
    console.log("Proxima vez seria melhor vc sair daqui do que ficar...")

}

function escuridao_final(){
    chao_chav.desenha();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.fillStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.font = "100px Times New Roman"
    ctx.textAlign = "center";
    ctx.fillText("Final?...", 560, 80)
    ctx.strokeText("Final?...", 560, 80)
    ctx.closePath();
    
    true_end.desenha();
    
    ctx.beginPath();
    ctx.lineWidth = 0;
    ctx.fillStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.font = "40px Times New Roman"
    ctx.textAlign = "center";
    ctx.fillText("Acolheu a escuridão na sua vida... A jornada pode continuar", 560, 960)
    ctx.strokeText("Acolheu a escuridão na sua vida... A jornada pode continuar", 560, 960)
    ctx.closePath();

    console.log("Abraçar a escuridao... Apenas assim vc encontra a luz...")
    console.log("Siga seu caminho agr... Encontra-ra a verdade fora daqui...")

    console.log("Dev comment: Não leve a serio, fiz isso só por diversão")
    console.log("Dev comment: Queria fazer como se fosse uma homenagem as obras de terro que cresci com...")
    console.log("Dev comment: Parece rediculo, eu sei, mas valeu a pena e estou feliz e satisfeito")
    console.log("Dev comment: Okay... Bye!... Fique com Deus... E se vc ver essa mensagem... Obg!...")
}

function sala_boss(){
    chao_boss.desenha();
    player.desenha();
    playerdraw();
    player_spr.desenha();
    hud();
    parede_top3.desenha();
    parede_left3.desenha();
    parede_right3.desenha();
    parede_down1.desenha();
    parede_down3.desenha();
    caixa.desenha();
}

function desenhar_sala(){

    
    if(id_room == 1){
        sala_1();
    }
    if (id_room == 2){
        sala_2();
        
    }
    if(id_room == 3){
        sala_3();
    }
    if(id_room == 4){
        sala_4();

    }
    if(id_room == 5){
        sala_5();
    }
    if (id_room == 6){
        music_norm.pause();
        music_norm.currentTime = 0;
        sala_6();
        music_sala6.play();

    }
    if(id_room == 7){
        music_norm.pause();
        music_norm.currentTime = 0;
        sala_chave();
        music_chav.play();
    }
    if(id_room == 8){
        sala_boss();
    }


    if(id_room == 9){
        music_norm.pause();
        music_norm.currentTime = 0;
        final_falso();
        music_false.currentTime = 98
        music_false.play()
    }
    if(id_room == 10){
        music_sala6.pause();
        music_sala6.currentTime = 0;
        music_end.play();
        escuridao_final();

        
    }
    if(id_room == 11){
        music_norm.pause();
        music_norm.currentTime = 0;
        Game_over();
        music_GO.play();
    } 

  

}






    







//Desenha 
let chao_norm = {
    x: 0,
    y: 0,
    largura: 1200,
    altura: 880,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}

let chao_fim = {
    x: 0,
    y: 0,
    largura: 1200,
    altura: 880,
    cor: '#FFFFFF',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }

}

chao_norm.img.src = 'jogo/imgs/chao_norm.png';

let chao_chav = {
    x: 0,
    y: 0,
    largura: 1200,
    altura: 1200,
    cor: 'black',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}



let chao_boss = {
    x: 0,
    y: 0,
    largura: 1200,
    altura: 1200,
    cor: 'red',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let chav = {
    x: 560,
    y: 400,
    largura: 80,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
chav.img.src = 'jogo/imgs/chav.png';

let chav_hud = {
    x: 560,
    y: 920,
    largura: 96,
    altura: 96,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
chav_hud.img.src = 'jogo/imgs/chave_hud.png';

let caixa = {
    x: 560,
    y: 80,
    largura: 80,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
caixa.img.src = 'jogo/imgs/jade_box.png';


let parede_top1 = {
    x: 0,
    y: 0,
    largura: 80,
    altura: 480,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);

    }
}
let parede_top2 = {
    x: 720,
    y: 0,
    largura: 80,
    altura: 480,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let parede_top3 = {
    x: 0,
    y: 0,
    largura: 80,
    altura: 1200,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let parede_left1 = {
    x: 0,
    y: 0,
    largura: 320,
    altura: 80,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let parede_left2 = {
    x: 0,
    y: 560,
    largura: 320,
    altura: 80,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let parede_left3 = {
    x: 0,
    y: 0,
    largura: 880,
    altura: 80,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}


let parede_right1 = {
    x: 1120,
    y: 0,
    largura: 320,
    altura: 80,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let parede_right2 = {
    x: 1120,
    y: 560,
    largura: 320,
    altura: 80,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let parede_right3 = {
    x: 1120,
    y: 0,
    largura: 880,
    altura: 80,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let parede_down1 = {
    x: 0,
    y: 800,
    largura: 80,
    altura: 480,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}
let parede_down2 = {
    x: 720,
    y: 800,
    largura: 80,
    altura: 480,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}

let parede_down3 = {
    x: 0,
    y: 800,
    largura: 80,
    altura: 1200,
    cor: '#222222',
    desenha: function(){
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.altura, this.largura);
    }
}


let porta = {
    x: 480,
    y: 800,
    largura: 240,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
porta.img.src = 'jogo/imgs/porta_down.png';

let porta_top = {
    x: 480,
    y: 0,
    largura: 240,
    altura: 80,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
porta_top.img.src = 'jogo/imgs/porta_top.png';

let false_end = {
    x: 0,
    y: 240,
    largura: 1200,
    altura: 560,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
false_end.img.src = 'jogo/imgs/fim_falso.png';

let true_end = {
    x: 0,
    y: 240,
    largura: 1200,
    altura: 560,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
true_end.img.src = 'jogo/imgs/final_vdd.png';

let murte = {
    x: 0,
    y: 160,
    largura: 1200,
    altura: 560,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
murte.img.src = 'jogo/imgs/death.jpg';


let bixo = {
    x: 0,
    y: 0,
    largura: 1120,
    altura: 800,
    img: new Image(),
    desenha: function(){
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }

}
bixo.img.src = 'jogo/imgs/room_6.png';