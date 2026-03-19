// src/pages/Simulations/ElasticCollisions/logic.js

export class Point {
  constructor(x, y, userData) {
    this.x = x; this.y = y; this.userData = userData;
  }
}

export class Rectangle {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }
  contains(point) {
    return (point.x >= this.x - this.w && point.x <= this.x + this.w &&
            point.y >= this.y - this.h && point.y <= this.y + this.h);
  }
  intersects(range) {
    return !(range.x - range.w > this.x + this.w || range.x + range.w < this.x - this.w ||
             range.y - range.h > this.y + this.h || range.y + range.h < this.y - this.h);
  }
}

export class Circle {
  constructor(x, y, r) {
    this.x = x; this.y = y; this.r = r; this.rSquared = r * r;
  }
  contains(point) {
    let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
    return d <= this.rSquared;
  }
  intersects(range) {
    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);
    let edges = Math.pow(xDist - range.w, 2) + Math.pow(yDist - range.h, 2);
    if (xDist > this.r + range.w || yDist > this.r + range.h) return false;
    if (xDist <= range.w || yDist <= range.h) return true;
    return edges <= this.rSquared;
  }
}

export class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary; this.capacity = capacity;
    this.points = []; this.divided = false;
  }
  subdivide() {
    let { x, y, w, h } = this.boundary;
    w /= 2; h /= 2;
    this.northeast = new QuadTree(new Rectangle(x + w, y - h, w, h), this.capacity);
    this.northwest = new QuadTree(new Rectangle(x - w, y - h, w, h), this.capacity);
    this.southeast = new QuadTree(new Rectangle(x + w, y + h, w, h), this.capacity);
    this.southwest = new QuadTree(new Rectangle(x - w, y + h, w, h), this.capacity);
    this.divided = true;
  }
  insert(point) {
    if (!this.boundary.contains(point)) return false;
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) this.subdivide();
    return (this.northeast.insert(point) || this.northwest.insert(point) ||
            this.southeast.insert(point) || this.southwest.insert(point));
  }
  query(range, found = []) {
    if (!range.intersects(this.boundary)) return found;
    for (let p of this.points) { if (range.contains(p)) found.push(p); }
    if (this.divided) {
      this.northwest.query(range, found); this.northeast.query(range, found);
      this.southwest.query(range, found); this.southeast.query(range, found);
    }
    return found;
  }
}

export class Particle {
  constructor(x, y, mass, id, color) {
    this.x = x; this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.mass = mass;
    this.r = Math.sqrt(this.mass) * 8; // Multiplied for visual scale
    this.id = id;
    this.color = color;
  }

  update(width, height) {
    this.x += this.vx; this.y += this.vy;
    if (this.x > width - this.r) { this.x = width - this.r; this.vx *= -1; }
    else if (this.x < this.r) { this.x = this.r; this.vx *= -1; }
    if (this.y > height - this.r) { this.y = height - this.r; this.vy *= -1; }
    else if (this.y < this.r) { this.y = this.r; this.vy *= -1; }
  }

  collide(other) {
    let dx = other.x - this.x; let dy = other.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let minDist = this.r + other.r;

    if (distance < minDist) {
      let overlap = minDist - distance;
      let nx = dx / distance; let ny = dy / distance;
      
      this.x -= nx * overlap * 0.5; this.y -= ny * overlap * 0.5;
      other.x += nx * overlap * 0.5; other.y += ny * overlap * 0.5;

      let vDiffX = other.vx - this.vx; let vDiffY = other.vy - this.vy;
      let num = vDiffX * nx + vDiffY * ny;
      if (num > 0) return; // Prevent sticking

      let mSum = this.mass + other.mass;
      let impulse = (2 * other.mass * num) / mSum;
      let impulseB = (-2 * this.mass * num) / mSum;

      this.vx += nx * impulse; this.vy += ny * impulse;
      other.vx += nx * impulseB; other.vy += ny * impulseB;
    }
  }
}