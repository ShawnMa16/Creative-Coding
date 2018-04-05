var StarParticle = function(position) {

  this.position = createVector(random(width), random(height));
  this.lifespan = 200.0;
};

StarParticle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
StarParticle.prototype.update = function(){
  //this.position.add(this.position);
  this.lifespan -= 2;
};

// Method to display
StarParticle.prototype.display = function() {

  push();
  fill(255, this.lifespan);
  ellipse(this.position.x, this.position.y, 3, 3);
  pop();
};

// Is the particle still useful?
StarParticle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var StarParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

StarParticleSystem.prototype.addParticle = function() {
  this.particles.push(new StarParticle(this.origin));
};

StarParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
