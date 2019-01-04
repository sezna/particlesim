const gravitational_constant = 2;
const num_frames = 200;
class Particle {
	constructor(x, y, z, radius = 5, density = 5) {
		this.x = x;
		this.y = y;
		this.z = z;

		this.vx = 0;
		this.vy = 0;
		this.vz = 0;

		this.ax = 0;
		this.ay = 0;
		this.az = 0;

		this.radius = radius;
		this.density = density; 
		this.volume = (4/3) * Math.PI * this.radius ** 3;
		this.mass = this.volume * this.density;
	}


	distance(other) {
	 	return (other.x - this.x) ** 2 + (other.y - this.y) ** 2 + (other.z - this.z) ** 2;
	}

	gravitational_vector(other) {
		let dividend = this.distance(other) ** 3;
		return [(gravitational_constant * other.mass * (other.x - this.x) / dividend), 
			(gravitational_constant * other.mass * (other.y - this.y) / dividend),
			(gravitational_constant * other.mass * (other.z - this.z) / dividend)]
	}
}

class Timeline {
	constructor() {
		this.frames = [];
		this.pointer = -1;
	}

	push(frame)  {
		this.frames.push(frame);
		// Point to the last frame after pushing.
		this.pointer = this.frames.length - 1;;
	}

	rewind()  {
		this.pointer -= 1;
		return this.currentFrame();
	}

	fastForward() {
		if (this.pointer === this.frames.length - 1) {
			return this.currentFrame();
		}
		this.pointer += 1;
		return this.currentFrame();
	}

	currentFrame() {
		return this.frames[this.pointer];
	}

}


function timeStep(particleField, timeline) {
	particleField.forEach(x => {
		let total_gravity_vector = particleField.reduce((acc, y) => acc + x.gravitational_vector(y))  
		x.ax = total_gravity_vector[0];
		x.ay = total_gravity_vector[1];
		x.az = total_gravity_vector[2];
		x.vx += x.ax;
		x.vy += x.ay;
		x.vz += x.az;
	});
	timeline.push(particleField);
}

const canvas = createCanvas(200, 200);
const context = canvas.getContext('2d');


let particle_one = new Particle(10, 10, 10);

let particle_two = new Particle(20, 20, 20);

console.log(particle_one.gravitational_vector(particle_two));

let particleField = Array(100).map((x) => new Particle(x, x, x));

let timeline = new Timeline();

for (let frame = 0; frame < num_frames; frame++) {
	console.log("frame #" + frame);
	timeStep(particleField, timeline);
	// log each frame to json
}





/*
104 
105     pub fn distance(&self, other: &Particle) -> f64 {
106         return ((other.position.x - self.position.x).powi(2)
107             + (other.position.y - self.position.y).powi(2)
108             + (other.position.z - self.position.z).powi(2))
109         .sqrt();
110     }
111     pubo

   let gravitational_constant = 10f64;
197 
198         let x_dist = other.position.x - self.position.x;
199         let y_dist = other.position.y - self.position.y;
200         let z_dist = other.position.z - self.position.z;
201 
202 
203         //TODO switch to mass
204         let g_x = gravitational_constant * other.mass() * x_dist / (self.distance(other).powi(3) * 1.5);
205         let g_y = gravitational_constant * other.mass() * y_dist / (self.distance(other).powi(3) * 1.5);
206         let g_z = gravitational_constant * other.mass() * z_dist / (self.distance(other).powi(3) * 1.5);
207 
208         let accel_point = Point {
209          x: g_x,
210          y: g_y,
211          z: g_z
212         };
213 
214         return Particle {
215             position: self.position.clone(),
216             velocity: self.velocity.clone(),
217             acceleration: self.acceleration.add(&accel_point),
218             density: self.density.clone(),
219             radius: self.radius.clone(),
220             element: self.element.clone()
221         };
222 
D
*/
