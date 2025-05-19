// let titulo = {
//     x: 10,
//     y: 400,
//     altura: 600,
//     largura: 1060,
//     img: new Image(),
//     desenha: function(){
//         this.img.src = 'logoplaceholder.png';
//         ctx.beginPath();
//         ctx.fillRect(this.x, this.y, this.altura, this.largura);
//         ctx.closePath();
//     }
// }

// let img_titulo = {
//     x: 10,
//     y: 400,
//     raio: 600,
//     img: new Image(),
//     desenha: function(){
//         this.img.src = 'logoplaceholder.png';
//         ctx.beginPath();
//         ctx.drawImage(this.img, this.x, this.y, 2*this.raio, 2*this.raio);
//         ctx.closePath();
//     }
// }


// function tela_inicial(){
// bgtt.desenha()
// img_titulo.desenha()


// }

// tela_inicial();


function jump_pedrinho(sprite) {
    let inicial = sprite.y;
    let altura_pulo = 40;
    let duracao = 150; // tempos em mm secs
    let tempoIni = null;

    function elPulo(tempo) {
        if (!tempoIni) tempoIni = tempo;
        let decorrimento = tempo - tempoIni;
        let progresso = decorrimento / duracao;

        // Movimento suavemente
        let offset = Math.sin(progresso * Math.PI) * altura_pulo;
        sprite.y = inicial - offset;

        update_game();

        if (progresso < 1) {
            requestAnimationFrame(elPulo);
        } else {
            sprite.y = inicial;
            update_game();
        }
    }

    requestAnimationFrame(elPulo);
}