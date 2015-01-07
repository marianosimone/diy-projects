// title: Rustic Table Legs
// author: Mariano Simone
// license: Creative Commons CC BY
// To be used with OpenJSCAD (http://openjscad.org/)

black = [0,0,0];
tubes_width = 0.5;
pieces_width = tubes_width*1.1;
endpoints_width = pieces_width*1.2;
width = 30;
width_delta = width/2;
height = 30;
length = 40;
length_delta = length/2;
structure_height = height*0.2;
    
function tee() {
    return union(CSG.cylinder({
      start: [0, -2, 0],
      end: [0, 2, 0],
      radius: pieces_width
    }),
    CSG.cylinder({
      start: [0, -1.5, 0],
      end: [0, -2, 0],
      radius: endpoints_width
    }),
    CSG.cylinder({
      start: [0, 1.5, 0],
      end: [0, 2, 0],
      radius: endpoints_width
    }),    
    CSG.cylinder({
      start: [0, 0, 0],
      end: [2, 0, 0],
      radius: pieces_width
    }),
    CSG.cylinder({
      start: [1.5, 0, 0],
      end: [2, 0, 0],
      radius: endpoints_width
    })
    ).setColor(black);
}

function fledge() {
    return union(CSG.cylinder({
      start: [0, 0, 0],
      end: [0, 0.1, 0],
      radius: tubes_width*4
    }),
    CSG.cylinder({
      start: [0, 0, 0],
      end: [0, 1, 0],
      radius: endpoints_width
    })
    ).rotateX(90).setColor(black);
}

function tube(length) {
    return CSG.cylinder({
      start: [0, 0, 0],
      end: [0, length, 0],
      radius: tubes_width
    }).setColor(black);
}

function leg1(length) {
    f = fledge();
    return union(
        f,
        translate([0, 0, length], f.mirroredZ()),
        tube(length).rotateX(90),
        translate([0, 0, structure_height], tee().rotateX(90))
    );
}

function legs1() {
    t = tee();
    l = leg1(height);
    return union(
        translate([width_delta, 0, structure_height], tube(width).rotateZ(90)),
        translate([-width_delta, 0, structure_height], t),
        translate([-width_delta, -length_delta, structure_height], tube(length)),
        translate([width_delta, 0,structure_height], t.mirroredX()),
        translate([width_delta, -length_delta, structure_height], tube(length)),
        translate([-width_delta,length_delta,0], l.rotateZ(270)),
        translate([width_delta,-length_delta,0], l.rotateZ(90)),
        translate([width_delta,length_delta,0], l.rotateZ(270)),
        translate([-width_delta,-length_delta,0], l.rotateZ(90))
    );
}

function leg2(length, rotation) {
    t = tee();
    return union(
        translate([0, 0, length], fledge().mirroredZ()),
        tube(length).rotateX(90),
        translate([0, 0, structure_height], t.rotateX(90)),
        translate([0, 0, 2], t.rotateX(90).rotateZ(rotation))
    );
}

function legs2() {
    return union(
        translate([width_delta, -length_delta, 2], tube(width).rotateZ(90)),
        translate([width_delta, length_delta, 2], tube(width).rotateZ(90)),
        translate([-width_delta, -length_delta, structure_height], tube(length)),
        translate([width_delta, -length_delta, structure_height], tube(length)),
        translate([-width_delta,length_delta,0], leg2(height, 90).rotateZ(270)),
        translate([width_delta,-length_delta,0], leg2(height, 90).rotateZ(90)),
        translate([width_delta,length_delta,0], leg2(height, 270).rotateZ(270)),
        translate([-width_delta,-length_delta,0], leg2(height, 270).rotateZ(90))
    );
}

function main() {
    return legs1();
}