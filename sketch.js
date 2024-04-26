let mic, fft; 
let song, song1, song2, song3, song4; 
let analyzer; 
let c, increase; 
let s, n; 

function preload(){
  song1 = loadSound('audio/Zedd - Clarity (feat. Foxes).mp3'); 
  song2 = loadSound('audio/I NEED U.mp3'); 
  song3 = loadSound('audio/Skrillex & Diplo - Mind feat. Kai.mp3'); 
  song4 = loadSound('audio/Overdose.mp3'); 
}

function setup() {
  createCanvas(800, 800);
  s = [song1, song2, song3, song4]; 
  n = 0; 
  song = s[n]; 
  song.play(); 
  
  analyzer = new p5.Amplitude();
  analyzer.setInput(song);

  fft = new p5.FFT();
  fft.setInput(song);
  
  colorMode(HSB);
  c = 0;
  increase = true; 
}

function draw() {
  background(0, 0, 0, 5 / 255)
  analyzer.setInput(song);
  
  let rms = analyzer.getLevel();
  let spectrum = fft.analyze(); 
  // fill(128, 0, 128, 10); 
  fill(c, 255, 255, 10 / 255); 
  if (increase == true) {
    c += 0.2; 
  }
  else {
    c -= 0.2; 
  }
  if (c > 255) {
    increase = false; 
  }
  if (c < 0) {
    increase = true; 
  }
  stroke(0); 

  // ellipse(width / 2, height / 2 - 50, 30 + rms * 800, 30 + rms * 800); 
  
  push();
  translate(width / 2, height / 2);
  noStroke();
  for (var r1 = 0; r1 < 10; r1++) {
    ellipse(0, rms * 400, 10 + rms * 300, 20 + rms * 600); 
    rotate(PI / 5);
  }
  pop();
  
  push(); 
  // colorMode(RGB); 
  textFont('courier new'); 
  textSize(20); 
  fill(0, 0, 255); 
  text('[space] to pause/play', 30, height - 90); 
  text('[<- ->] arrow keys to switch songs', 30, height - 60); 
  text('songs: Clarity, I NEED U, Mind, Overdose', 30, height - 30); 
  pop(); 
}

function keyPressed() {
  if (keyCode === 32) {
    if (!song.isPlaying()) {
      song.play();
    } 
    else {
      song.pause(); 
    }
  }
  else if (keyCode === LEFT_ARROW) {
    if (n == 0) {
      n = s.length - 1; 
    }
    else {
      n--; 
    }
    song.stop(); 
    song = s[n]; 
    song.play(); 
  } 
  else if (keyCode === RIGHT_ARROW) {
    if (n == s.length - 1) {
      n = 0; 
    }
    else {
      n++; 
    }
    song.stop(); 
    song = s[n]; 
    song.play(); 
  }
}