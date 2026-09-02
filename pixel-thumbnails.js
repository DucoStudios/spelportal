(() => {
  'use strict';

  const W = 120, H = 66;
  const rect = (c, x, y, w, h, color) => { c.fillStyle = color; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
  const stroke = (c, x, y, w, h, color, size = 2) => {
    rect(c, x, y, w, size, color); rect(c, x, y + h - size, w, size, color);
    rect(c, x, y, size, h, color); rect(c, x + w - size, y, size, h, color);
  };
  const line = (c, x1, y1, x2, y2, color, width = 2) => {
    c.strokeStyle = color; c.lineWidth = width; c.lineCap = 'butt'; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
  };
  const text = (c, value, x, y, color = '#fff6fb', size = 8, align = 'center') => {
    c.fillStyle = color; c.font = `900 ${size}px monospace`; c.textAlign = align; c.textBaseline = 'middle'; c.fillText(value, x, y);
  };
  const ball = (c, x, y, color, r = 4) => {
    rect(c, x - r + 1, y - r, (r - 1) * 2, r * 2, color); rect(c, x - r, y - r + 1, r * 2, (r - 1) * 2, color); rect(c, x - r + 1, y - r + 1, 2, 2, '#fff6fb');
  };
  const coin = (c, x, y, color) => { rect(c, x - 3, y - 4, 6, 8, color); rect(c, x - 4, y - 3, 8, 6, color); rect(c, x - 1, y - 2, 2, 4, '#fff3a0'); };
  const heart = (c, x, y, color) => { rect(c, x - 5, y - 3, 4, 4, color); rect(c, x + 1, y - 3, 4, 4, color); rect(c, x - 6, y - 1, 12, 4, color); rect(c, x - 4, y + 3, 8, 3, color); rect(c, x - 2, y + 6, 4, 2, color); };
  const person = (c, x, y, color, direction = 1) => {
    rect(c, x - 3, y - 12, 6, 6, '#ffd0a6'); rect(c, x - 4, y - 6, 8, 10, color);
    rect(c, x - 6 * direction, y - 4, 3, 8, '#ffd0a6'); rect(c, x + 3 * direction, y - 4, 3, 8, '#ffd0a6');
    rect(c, x - 4, y + 4, 3, 8, '#120a24'); rect(c, x + 1, y + 4, 3, 8, '#120a24');
  };
  const cloud = (c, x, y, color) => { rect(c, x, y, 18, 5, color); rect(c, x + 4, y - 4, 7, 4, color); rect(c, x + 10, y - 2, 6, 3, color); };
  const tree = (c, x, y, leaf, fruit) => { rect(c, x - 2, y, 4, 17, '#8f512d'); rect(c, x - 10, y - 8, 20, 12, leaf); rect(c, x - 6, y - 13, 12, 8, leaf); if (fruit) { ball(c, x - 5, y - 5, fruit, 2); ball(c, x + 5, y - 8, fruit, 2); } };
  const house = (c, x, y, wall, roof) => { rect(c, x, y, 23, 17, wall); rect(c, x + 9, y + 8, 6, 9, '#120a24'); for (let i = 0; i < 5; i++) rect(c, x + i * 3, y - 3 - i * 2, 23 - i * 6, 2, roof); };
  const brick = (c, x, y, w, h, color, label) => { rect(c, x, y, w, h, color); stroke(c, x, y, w, h, '#120a24', 2); rect(c, x + 2, y + 2, w - 4, 2, 'rgba(255,255,255,.28)'); if (label) text(c, label, x + w / 2, y + h / 2 + 1, '#120a24', 7); };
  const base = (c, p) => {
    rect(c, 0, 0, W, H, '#100923');
    for (let i = 0; i < 18; i++) rect(c, (i * 37 + 9) % W, (i * 19 + 7) % 43, i % 4 === 0 ? 2 : 1, i % 3 === 0 ? 2 : 1, i % 2 ? p.a : p.warm);
    rect(c, 0, 51, W, 15, '#190f34'); rect(c, 0, 51, W, 2, p.a);
    for (let x = 0; x < W; x += 12) rect(c, x, 58, 8, 2, p.b);
  };
  const road = (c, color) => { rect(c, 0, 42, W, 24, '#151125'); for (let x = 0; x < W; x += 18) rect(c, x, 53, 9, 2, color); };
  const speech = (c, x, y, w, h, color) => { rect(c, x, y, w, h, color); stroke(c, x, y, w, h, '#120a24', 2); rect(c, x + 8, y + h, 4, 4, color); };
  const jar = (c, x, y, color, label) => { rect(c, x, y, 13, 18, color); stroke(c, x, y, 13, 18, '#120a24', 2); rect(c, x + 2, y - 3, 9, 3, '#fff6fb'); if (label) text(c, label, x + 6.5, y + 10, '#120a24', 6); };
  const platform = (c, x, y, w, color) => { rect(c, x, y, w, 4, color); rect(c, x + 3, y + 4, w - 6, 2, '#120a24'); };
  const drawScene = (c, id, p) => {
    base(c, p);
    switch (id) {
      case 'ordspraks-pusslet':
        speech(c, 13, 11, 52, 23, '#fff6fb'); ['O','R','D'].forEach((v,i) => brick(c, 22+i*13,18,11,10,i===1?p.warm:p.a,v)); brick(c,77,14,13,13,p.b,'?'); brick(c,92,28,13,13,p.a,'!'); break;
      case 'sex-burkar-sortern':
        for (let i=0;i<6;i++) jar(c,5+i*19,35,i%2?p.b:p.a,String(i+1)); coin(c,18,13,p.warm); coin(c,58,22,p.warm); coin(c,101,10,p.warm); break;
      case 'gap-monstren':
        [18,58,94].forEach((x,i)=>{ rect(c,x-10,25-i*4,20,20,i===1?p.b:p.a); rect(c,x-7,30-i*4,14,5,'#120a24'); rect(c,x-5,22-i*4,3,3,'#fff6fb'); rect(c,x+3,22-i*4,3,3,'#fff6fb'); }); ball(c,59,9,p.warm,3); break;
      case 'saftstand-erbjudandet':
        rect(c,37,22,46,28,p.a); rect(c,32,18,56,6,p.warm); text(c,'SAFT',60,30,'#120a24',8); person(c,23,45,p.b); person(c,96,45,p.a,-1); coin(c,97,22,p.warm); break;
      case 'sikta-ratt':
        line(c,20,47,34,26,p.a,3); line(c,34,26,42,47,p.a,3); line(c,30,31,40,31,p.warm,2); ball(c,52,22,p.warm,3); stroke(c,89,14,20,20,p.b,3); stroke(c,94,19,10,10,p.warm,2); break;
      case 'bibelhjalten':
        person(c,25,42,p.a); person(c,91,31,p.b,-1); line(c,31,30,51,19,p.warm,2); ball(c,57,16,p.warm,3); rect(c,86,7,10,7,'#ffd0a6'); break;
      case 'superhjalte-spranget':
        platform(c,5,52,28,p.a); platform(c,45,39,24,p.b); platform(c,83,25,30,p.a); person(c,57,29,p.b); heart(c,99,13,p.warm); break;
      case 'bokstavsbilen':
        road(c,p.a); rect(c,39,39,22,12,p.b); rect(c,44,34,11,6,p.b); ball(c,44,53,'#120a24',3); ball(c,57,53,'#120a24',3); ['A','B','C'].forEach((v,i)=>text(c,v,23+i*38,18,p.warm,11)); break;
      case 'gavokedjan':
        [19,46,73,100].forEach((x,i)=>{ heart(c,x,22,i%2?p.b:p.a); line(c,x+6,23,x+19,31,p.warm,2); }); person(c,60,48,p.warm); break;
      case 'klossfall':
        for(let y=18;y<51;y+=8) for(let x=38;x<82;x+=8) if((x+y)%24!==0) brick(c,x,y,8,8,[p.a,p.b,p.warm][(x+y)%3]); brick(c,56,6,24,8,p.warm); break;
      case 'ordracet':
        road(c,p.b); person(c,25,44,p.a); person(c,62,44,p.b); person(c,98,44,p.warm); speech(c,44,8,32,15,'#fff6fb'); text(c,'BON!',60,16,'#120a24',7); break;
      case 'ormen':
        [[20,42],[30,42],[40,42],[50,42],[50,32],[60,32],[70,32],[70,22],[80,22]].forEach(([x,y],i)=>rect(c,x,y,9,9,i===8?p.warm:p.a)); ball(c,100,18,p.b,4); break;
      case 'ljudmatchen':
        rect(c,15,18,8,20,p.a); rect(c,23,22,7,12,p.a); line(c,34,20,42,15,p.warm,2); line(c,34,28,44,28,p.warm,2); line(c,34,36,42,41,p.warm,2); brick(c,68,13,18,18,p.b,'1'); brick(c,91,31,18,18,p.a,'2'); break;
      case 'meningsbyggaren':
        ['JE','SUIS','ICI'].forEach((v,i)=>brick(c,10+i*35,25,30,15,[p.a,p.b,p.warm][i],v)); line(c,18,47,101,47,p.a,2); break;
      case 'memory-plattorna':
        for(let y=11;y<50;y+=19) for(let x=15;x<104;x+=22) brick(c,x,y,17,15,(x+y)%3?p.b:p.a,(x===37&&y===30)||(x===81&&y===11)?'★':'?'); break;
      case 'pusselvridaren':
        [[32,13],[52,13],[72,13],[32,33],[52,33],[72,33]].forEach(([x,y],i)=>brick(c,x,y,20,20,[p.a,p.b,p.warm][i%3],i%2?'↻':'•')); break;
      case 'traffa-ratt':
        ball(c,19,13,p.warm,4); line(c,21,18,43,39,p.a,3); line(c,43,39,75,32,p.a,3); stroke(c,91,35,20,14,p.b,3); break;
      case 'flykten':
        road(c,p.a); person(c,33,45,p.warm); for(let x=72;x<120;x+=8){ rect(c,x,35+(x%16),8,18,p.b); rect(c,x,31+(x%16),8,5,p.a); } break;
      case 'alfabetet-fargerna':
        ['A','B','C'].forEach((v,i)=>brick(c,13+i*35,15,27,28,[p.a,p.b,p.warm][i],v)); ball(c,26,50,p.b,3); ball(c,61,50,p.warm,3); ball(c,96,50,p.a,3); break;
      case 'malarboken':
        house(c,45,25,'#fff6fb',p.b); [p.a,p.b,p.warm].forEach((v,i)=>ball(c,25+i*35,14,v,4)); rect(c,91,37,4,18,p.a); rect(c,89,33,8,6,p.warm); break;
      case 'ordresan':
        line(c,12,45,34,29,p.a,3); line(c,34,29,60,38,p.a,3); line(c,60,38,84,18,p.a,3); line(c,84,18,108,28,p.a,3); [12,34,60,84,108].forEach((x,i)=>ball(c,x,[45,29,38,18,28][i],i===4?p.warm:p.b,3)); person(c,34,20,p.a); break;
      case 'ordgatan':
        ['M','A','I','S','O'].forEach((v,i)=>brick(c,8+i*22,20,18,18,i<3?p.a:p.b,v)); for(let i=0;i<5;i++) brick(c,30+i*13,43,11,9,p.warm,''); break;
      case 'poppa-ballongerna':
        [24,57,93].forEach((x,i)=>{ ball(c,x,16+i*7,[p.a,p.b,p.warm][i],8); text(c,String(i+1),x,16+i*7,'#120a24',7); line(c,x,24+i*7,x,46,p.a,1); }); line(c,7,50,112,38,p.warm,2); break;
      case 'raddaagget':
        ball(c,58,12,'#fff6e4',6); line(c,15,48,48,38,p.a,3); line(c,48,38,86,48,p.a,3); rect(c,91,42,22,8,p.warm); break;
      case 'blockvarlden':
        for(let y=36;y<55;y+=10) for(let x=7;x<115;x+=12) brick(c,x,y,12,10,(x+y)%3?p.a:p.b); house(c,46,19,p.warm,p.b); person(c,88,31,p.a); break;
      case 'schack':
        for(let y=11;y<55;y+=11) for(let x=33;x<88;x+=11) rect(c,x,y,11,11,(x/11+y/11)%2?p.a:'#fff6fb'); text(c,'♜',44,22,'#120a24',13); text(c,'♔',76,44,p.warm,14); break;
      case 'ekorrhjulet':
        ball(c,29,31,p.b,19); ball(c,29,31,'#100923',13); person(c,29,34,p.warm); [64,84,104].forEach((x,i)=>{ rect(c,x,44-i*9,10,9,p.a); coin(c,x+5,38-i*9,p.warm); }); break;
      case 'kroppens-tempel':
        person(c,28,42,p.a); heart(c,59,23,p.b); ball(c,92,18,p.warm,5); rect(c,86,25,12,20,p.a); line(c,84,31,100,31,'#120a24',2); break;
      case 'ror-pa-dig':
        person(c,30,39,p.a); person(c,61,36,p.b,-1); person(c,92,42,p.warm); line(c,10,14,110,14,p.a,2); [19,35,49].forEach((y,i)=>rect(c,105+i*2,y,4,4,p.warm)); break;
      case 'byggkost-eller-sallanmat':
        jar(c,18,35,p.a,'+'); jar(c,88,35,p.b,'!'); ball(c,28,14,p.warm,5); rect(c,57,10,9,13,p.a); rect(c,56,8,3,4,p.a); brick(c,73,20,12,10,p.b,''); break;
      case 'vishetens-vag':
        line(c,10,48,60,25,p.a,5); line(c,60,25,110,48,p.b,5); person(c,59,18,p.warm); speech(c,76,8,27,13,'#fff6fb'); text(c,'?',89,15,'#120a24',8); break;
      case 'kulbanan':
        ball(c,15,15,p.warm,4); line(c,18,19,37,40,p.a,3); line(c,37,40,62,25,p.a,3); line(c,62,25,88,45,p.a,3); stroke(c,96,34,17,17,p.b,3); break;
      case 'kulrullaren':
        line(c,5,46,28,30,p.a,5); line(c,28,30,50,42,p.a,5); line(c,50,42,75,17,p.a,5); line(c,75,17,112,37,p.a,5); ball(c,51,36,p.b,5); coin(c,79,10,p.warm); break;
      case 'gardsriket':
        house(c,15,30,p.warm,p.b); tree(c,61,30,p.a,p.warm); rect(c,82,37,30,14,'#9b5b35'); [88,98,108].forEach(x=>rect(c,x,31,2,7,p.a)); coin(c,103,16,p.warm); break;
      case 'kubkrossaren':
        [[17,10],[37,10],[57,10],[77,10],[97,10],[27,27],[47,27],[67,27],[87,27]].forEach(([x,y],i)=>brick(c,x,y,18,14,i===4?p.b:(i%3?p.a:p.warm),i===4?'×3':i%2?'2':'1')); ball(c,58,52,'#fff6fb',4); line(c,58,47,80,30,p.a,2); break;
      case 'ordmastaren':
        rect(c,13,13,45,34,p.b); rect(c,17,17,17,26,'#fff6fb'); rect(c,37,17,17,26,'#fff6fb'); text(c,'FR',35,30,p.a,8); rect(c,76,15,8,18,p.warm); rect(c,71,13,18,4,p.warm); line(c,80,33,80,45,p.warm,2); speech(c,91,27,22,15,'#fff6fb'); break;
      case 'fruktfangaren':
        person(c,59,47,p.a); rect(c,47,46,24,8,'#9b5b35'); [21,48,78,101].forEach((x,i)=>ball(c,x,10+i%2*10,[p.a,p.b,p.warm][i%3],4)); break;
      case 'bistroblixten':
        rect(c,10,35,100,16,p.a); person(c,23,32,p.b); person(c,98,32,p.warm,-1); brick(c,44,15,17,11,p.warm,'1'); brick(c,63,15,17,11,p.b,'2'); rect(c,83,17,8,8,'#fff6fb'); break;
      case 'accentjakten':
        ['É','È','Ê'].forEach((v,i)=>brick(c,13+i*35,18,28,27,[p.a,p.b,p.warm][i],v)); ball(c,62,52,p.a,3); break;
      case 'ordbron':
        person(c,15,42,p.warm); person(c,106,42,p.b,-1); [29,43,57,71,85].forEach((x,i)=>brick(c,x,39-i%2*3,14,7,i<3?p.a:'#342260',i<3?'✓':'')); line(c,18,50,103,50,p.b,2); break;
      case 'dansstopp':
        person(c,28,42,p.a); person(c,60,38,p.b,-1); person(c,93,43,p.warm); rect(c,52,8,16,16,'#fff6fb'); for(let i=0;i<4;i++) rect(c,52+i*4,8+(i%2)*4,4,4,i%2?p.a:p.b); text(c,'STOP',60,29,p.warm,7); break;
      case 'reaktionsraketen':
        rect(c,55,16,10,27,p.a); rect(c,51,24,18,12,p.a); rect(c,57,9,6,8,p.warm); rect(c,51,43,6,8,p.b); rect(c,63,43,6,8,p.b); [20,95].forEach((x,i)=>ball(c,x,18+i*16,p.warm,5)); break;
      case 'balansbanan':
        line(c,15,42,105,35,p.a,4); ball(c,61,33,p.warm,7); rect(c,57,43,8,10,p.b); line(c,37,17,47,25,p.b,2); line(c,83,13,72,22,p.b,2); break;
      case 'andningsdykaren':
        rect(c,0,10,W,43,'#13345b'); person(c,45,39,p.a); [64,77,87,98].forEach((x,i)=>ball(c,x,36-i*8,p.a,2+i%2)); coin(c,21,43,p.warm); rect(c,38,25,14,4,p.warm); break;
      case 'brobyggarna':
        rect(c,0,44,35,9,p.b); rect(c,85,35,35,18,p.b); line(c,31,43,55,29,p.a,4); line(c,55,29,88,35,p.a,4); person(c,15,34,p.warm); rect(c,108,22,3,14,p.a); rect(c,111,22,8,6,p.warm); break;
      case 'fargfusion':
        [[28,20],[48,20],[68,20],[88,20],[38,40],[58,40],[78,40]].forEach(([x,y],i)=>ball(c,x,y,[p.a,p.b,p.warm,'#ff4e92'][i%4],7)); text(c,'+',58,8,'#fff6fb',9); break;
      case 'molnhoppet':
        cloud(c,7,48,'#fff6fb'); cloud(c,43,35,p.a); cloud(c,83,19,'#fff6fb'); person(c,58,26,p.b); heart(c,103,10,p.warm); break;
      case 'tornverkstan':
        [42,37,32,27].forEach((w,i)=>brick(c,60-w/2,49-i*10,w,9,[p.a,p.b,p.warm][i%3])); brick(c,12,8,40,8,p.warm); line(c,52,12,86,12,p.a,2); break;
      case 'minimarknaden':
        rect(c,8,34,104,17,p.a); person(c,20,31,p.b); person(c,98,31,p.warm,-1); [43,57,71].forEach((x,i)=>brick(c,x,25,11,9,[p.b,p.warm,p.a][i],'')); rect(c,40,14,45,4,p.warm); break;
      case 'myntmatchen':
        speech(c,13,9,35,17,'#fff6fb'); text(c,'€2,40',30,18,'#120a24',7); [63,78,93,106].forEach((x,i)=>coin(c,x,18+i%2*15,[p.warm,p.a][i%2])); rect(c,55,48,58,3,p.b); break;
      case 'spargrissprint':
        road(c,p.a); rect(c,48,31,29,18,p.b); rect(c,54,26,17,9,p.b); rect(c,72,34,7,5,p.b); ball(c,56,49,'#120a24',3); ball(c,70,49,'#120a24',3); coin(c,25,26,p.warm); brick(c,95,20,13,11,p.a,'!'); break;
      case 'ideverkstan':
        ball(c,29,24,p.warm,11); rect(c,25,34,8,5,p.warm); line(c,42,26,61,26,p.a,2); line(c,61,26,75,14,p.a,2); line(c,61,26,77,40,p.a,2); brick(c,84,8,20,14,p.b,'A'); brick(c,84,36,20,14,p.a,'B'); break;
      case 'vanskapskompassen':
        ball(c,59,28,p.a,20); line(c,59,8,59,48,'#120a24',2); line(c,39,28,79,28,'#120a24',2); rect(c,57,13,4,16,p.warm); rect(c,55,11,8,5,p.warm); person(c,22,44,p.b); person(c,98,44,p.a,-1); break;
      case 'hjalparjakten':
        person(c,24,43,p.a); person(c,93,43,p.b,-1); line(c,39,26,58,15,p.warm,3); ball(c,64,13,p.warm,7); rect(c,68,18,15,3,p.warm); heart(c,60,43,p.a); break;
      case 'talamodstornet':
        [50,44,38,32].forEach((w,i)=>brick(c,60-w/2,50-i*10,w,9,[p.a,p.b,p.warm][i%3])); rect(c,100,9,3,32,p.warm); rect(c,94,9,15,4,p.warm); ball(c,101,29,p.b,3); break;
      case 'tacksamhetstradet':
        tree(c,59,28,p.a,p.warm); [18,34,83,101].forEach((x,i)=>heart(c,x,14+i%2*17,[p.b,p.warm][i%2])); person(c,24,48,p.b); break;
      case 'barmhartighetsresan':
        road(c,p.a); person(c,26,43,p.warm); person(c,72,47,p.b,-1); heart(c,50,20,p.a); rect(c,91,34,20,17,p.b); rect(c,96,28,10,7,p.b); break;
      case 'bygg-pa-klippan':
        rect(c,0,45,52,8,'#6a748c'); house(c,15,27,p.warm,p.b); rect(c,75,45,45,8,'#9b5b35'); house(c,84,28,p.a,p.b); line(c,72,8,62,21,p.a,2); line(c,88,7,80,22,p.a,2); break;
      case 'andens-frukttradgard':
        tree(c,39,26,p.a,p.b); tree(c,82,30,p.a,p.warm); [16,60,106].forEach((x,i)=>ball(c,x,17+i*7,[p.b,p.warm,p.a][i],4)); text(c,'9',60,49,p.warm,11); break;
      case 'ord-som-bygger':
        person(c,22,44,p.a); person(c,98,44,p.b,-1); speech(c,32,10,26,16,'#fff6fb'); speech(c,66,16,26,16,p.warm); heart(c,61,43,p.a); break;
      case 'bibelresan-66':
        rect(c,18,13,38,37,p.b); rect(c,22,17,14,29,'#fff6fb'); rect(c,38,17,14,29,'#fff6fb'); text(c,'66',37,31,p.warm,12); line(c,63,44,78,29,p.a,3); line(c,78,29,95,36,p.a,3); line(c,95,36,108,18,p.a,3); [63,78,95,108].forEach((x,i)=>ball(c,x,[44,29,36,18][i],i===3?p.warm:p.a,3)); break;
      case 'blockrutan':
        for (let r=0;r<5;r++) for (let x=0;x<5;x++) { const on = (r+x)%2===0 || r===2; if (on) brick(c,15+x*19,9+r*10,17,8,r===2?p.warm:(x%2?p.a:p.b)); }
        text(c,'8×8',60,60,'#fff6fb',7,'center'); break;
      default: brick(c,35,18,50,28,p.a,'PLAY');
    }
    rect(c,0,0,W,3,p.a); rect(c,0,H-3,W,3,p.b);
  };

  function draw(canvas, id, colors) {
    const ctx = canvas.getContext('2d');
    const scale = 2;
    canvas.width = W * scale; canvas.height = H * scale;
    ctx.imageSmoothingEnabled = false;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    drawScene(ctx, id, { a: colors[0], b: colors[1], warm: colors[2] });
  }

  window.PixelThumbnails = { draw };
})();
