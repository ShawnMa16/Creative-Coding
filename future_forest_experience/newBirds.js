// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids); // Passing the entire list of boids to each boid individually
  }
}



Flock.prototype.cleanTheDead = function() {
  // console.log("cleaning. ", this.boids.length);
  var numberOfBoids = this.boids.length;
  for (var i = numberOfBoids - 1; i >= 0; i--) {
    if (this.boids[i].isDead) {
      // console.log(i, " is dead.");
      this.boids.splice(i, 1);
    }
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3; // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
  this.yrotateS = 0;

  // this.target = _________;

  // this.flySpeed = (abs(this.velocity.x) + abs(this.velocity.y));
  this.flySpeed = random(1.5, 2);

  // console.log(this.flySpeed);
  this.alpha = 20;

  this.size = random(0.8, 1.0);

  this.isDead = false;

}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
  // this.cleanTheDead();

}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids); // Separation
  var ali = this.align(boids); // Alignment
  var coh = this.cohesion(boids); // Cohesion

  // if (returningHome) {
  //   // var goHome = this.arrive(target);
  //   // goHome.mult(5);
  //   // this.applyForce(goHome);
  // }

  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);

  // if leaves window set returningHome = true;

}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(200);
  push();
  translate(this.position.x, this.position.y);
  rotate(theta);

  scale(this.size);
  beginShape();
  noStroke();

  fill(255, this.alpha);

  //var flyS = this.velocity.x;
  // for(var i = 0; i < yrotate1.length; i++){
  quad(16, 0, 18, 16, 16, 32, 15, 16);

  triangle(this.yrotateS, 13, 16, 7, 16, 23);

  fill(200, this.alpha);
  triangle(this.yrotateS2, 20, 16, 8, 16, 23);

  endShape();

  pop();

  this.yrotateS = this.yrotateS + this.flySpeed;
  this.yrotateS2 = this.yrotateS + this.flySpeed;

  // console.log(yrotate1);
  // var flyv =
  if (this.yrotateS > 32) {
    this.flySpeed *= -1; // yrotate --;
    // changeUp = false;
  } else if (this.yrotateS < 0) {
    this.flySpeed *= -1;
    // changeUp = true;
  }

  this.alpha += 5;
}

// Wraparound
// Boid.prototype.borders = function() {
//   if (this.position.x < -this.r) this.position.x = width + this.r;
//   if (this.position.y < -this.r) this.position.y = height + this.r;
//   if (this.position.x > width + this.r) this.position.x = -this.r;
//   if (this.position.y > height + this.r) this.position.y = -this.r;
// }

Boid.prototype.borders = function() {
  if (this.position.x < -40) {
    this.isDead = true;
  }
  if (this.position.y > 940) {
    this.isDead = true;
  }
  if (this.position.x > 940) {
    this.isDead = true;
  }
  if (this.position.y < -40) {
    this.isDead = true;
  }
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = 25.0;
  var steer = createVector(0, 0);
  var count = 0;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d); // Weight by distance
      steer.add(diff);
      count++; // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position, boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum); // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}

Boid.prototype.isDead = function() {
  if (this.position.x > width + this.r || this.position.y > width + this.r
    || this.position.x < -this.r || this.position.y < -this.r) {
    return true;
  } else {
    return false;
  }
}
