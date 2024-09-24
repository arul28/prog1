/* classes */

// Color constructor
class Color {
  constructor(r, g, b, a) {
    try {
      if (
        typeof r !== "number" ||
        typeof g !== "number" ||
        typeof b !== "number" ||
        typeof a !== "number"
      )
        throw "color component not a number";
      else if (r < 0 || g < 0 || b < 0 || a < 0)
        throw "color component less than 0";
      else if (r > 255 || g > 255 || b > 255 || a > 255)
        throw "color component bigger than 255";
      else {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
    } catch (e) {
      // end try

      console.log(e);
    }
  } // end Color constructor

  // Color change method
  change(r, g, b, a) {
    try {
      if (
        typeof r !== "number" ||
        typeof g !== "number" ||
        typeof b !== "number" ||
        typeof a !== "number"
      )
        throw "color component not a number";
      else if (r < 0 || g < 0 || b < 0 || a < 0)
        throw "color component less than 0";
      else if (r > 255 || g > 255 || b > 255 || a > 255)
        throw "color component bigger than 255";
      else {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
    } catch (e) {
      // end throw

      console.log(e);
    }
  } // end Color change method
} // end color class

/* utility functions */

// draw a pixel at x,y using color
function drawPixel(imagedata, x, y, color) {
  try {
    if (typeof x !== "number" || typeof y !== "number")
      throw "drawpixel location not a number";
    else if (x < 0 || y < 0 || x >= imagedata.width || y >= imagedata.height)
      throw "drawpixel location outside of image";
    else if (color instanceof Color) {
      var pixelindex = (y * imagedata.width + x) * 4;
      imagedata.data[pixelindex] = color.r;
      imagedata.data[pixelindex + 1] = color.g;
      imagedata.data[pixelindex + 2] = color.b;
      imagedata.data[pixelindex + 3] = color.a;
    } else throw "drawpixel color is not a Color";
  } catch (e) {
    // end try

    console.log(e);
  }
} // end drawPixel

// draw random pixels
function drawRandPixels(context) {
  var c = new Color(0, 0, 0, 0); // the color at the pixel: black
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  const PIXEL_DENSITY = 0.01;
  var numPixels = w * h * PIXEL_DENSITY;

  // Loop over 1% of the pixels in the image
  for (var x = 0; x < numPixels; x++) {
    c.change(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
      255
    ); // rand color
    drawPixel(
      imagedata,
      Math.floor(Math.random() * w),
      Math.floor(Math.random() * h),
      c
    );
  } // end for x
  context.putImageData(imagedata, 0, 0);
} // end draw random pixels

// get the input ellipsoids from the standard class URL
function getInputEllipsoids() {
  const INPUT_ELLIPSOIDS_URL =
    "https://ncsucgclass.github.io/prog1/ellipsoids.json";

  // load the ellipsoids file
  var httpReq = new XMLHttpRequest(); // a new http request
  httpReq.open("GET", INPUT_ELLIPSOIDS_URL, false); // init the request
  httpReq.send(null); // send the request
  var startTime = Date.now();
  while (httpReq.status !== 200 && httpReq.readyState !== XMLHttpRequest.DONE) {
    if (Date.now() - startTime > 3000) break;
  } // until its loaded or we time out after three seconds
  if (httpReq.status !== 200 || httpReq.readyState !== XMLHttpRequest.DONE) {
    console.log * "Unable to open input ellipses file!";
    return String.null;
  } else return JSON.parse(httpReq.response);
} // end get input ellipsoids

//get the input triangles from the standard class URL
function getInputTriangles() {
  const INPUT_TRIANGLES_URL =
    "https://ncsucgclass.github.io/prog1/triangles2.json";

  // load the triangles file
  var httpReq = new XMLHttpRequest(); // a new http request
  httpReq.open("GET", INPUT_TRIANGLES_URL, false); // init the request
  httpReq.send(null); // send the request
  var startTime = Date.now();
  while (httpReq.status !== 200 && httpReq.readyState !== XMLHttpRequest.DONE) {
    if (Date.now() - startTime > 3000) break;
  } // until its loaded or we time out after three seconds
  if (httpReq.status !== 200 || httpReq.readyState !== XMLHttpRequest.DONE) {
    console.log * "Unable to open input triangles file!";
    return String.null;
  } else return JSON.parse(httpReq.response);
} // end get input triangles

//get the input boxex from the standard class URL
function getInputBoxes() {
  const INPUT_BOXES_URL = "https://ncsucgclass.github.io/prog1/boxes.json";

  // load the boxes file
  var httpReq = new XMLHttpRequest(); // a new http request
  httpReq.open("GET", INPUT_BOXES_URL, false); // init the request
  httpReq.send(null); // send the request
  var startTime = Date.now();
  while (httpReq.status !== 200 && httpReq.readyState !== XMLHttpRequest.DONE) {
    if (Date.now() - startTime > 3000) break;
  } // until its loaded or we time out after three seconds
  if (httpReq.status !== 200 || httpReq.readyState !== XMLHttpRequest.DONE) {
    console.log * "Unable to open input boxes file!";
    return String.null;
  } else return JSON.parse(httpReq.response);
} // end get input boxes

// put random points in the ellipsoids from the class github
function drawRandPixelsInInputEllipsoids(context) {
  var inputEllipsoids = getInputEllipsoids();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  const PIXEL_DENSITY = 0.1;
  var numCanvasPixels = w * h * PIXEL_DENSITY;

  if (inputEllipsoids != String.null) {
    var x = 0;
    var y = 0; // pixel coord init
    var cx = 0;
    var cy = 0; // init center x and y coord
    var ellipsoidXRadius = 0; // init ellipsoid x radius
    var ellipsoidYRadius = 0; // init ellipsoid y radius
    var numEllipsoidPixels = 0; // init num pixels in ellipsoid
    var c = new Color(0, 0, 0, 0); // init the ellipsoid color
    var n = inputEllipsoids.length; // the number of input ellipsoids
    //console.log("number of ellipses: " + n);

    // Loop over the ellipsoids, draw rand pixels in each
    for (var e = 0; e < n; e++) {
      cx = w * inputEllipsoids[e].x; // ellipsoid center x
      cy = h * inputEllipsoids[e].y; // ellipsoid center y
      ellipsoidXRadius = Math.round(w * inputEllipsoids[e].a); // x radius
      ellipsoidYRadius = Math.round(h * inputEllipsoids[e].b); // y radius
      numEllipsoidPixels = ellipsoidXRadius * ellipsoidYRadius * Math.PI; // projected ellipsoid area
      numEllipsoidPixels *= PIXEL_DENSITY; // percentage of ellipsoid area to render to pixels
      numEllipsoidPixels = Math.round(numEllipsoidPixels);
      //console.log("ellipsoid x radius: "+ellipsoidXRadius);
      //console.log("ellipsoid y radius: "+ellipsoidYRadius);
      //console.log("num ellipsoid pixels: "+numEllipsoidPixels);
      c.change(
        inputEllipsoids[e].diffuse[0] * 255,
        inputEllipsoids[e].diffuse[1] * 255,
        inputEllipsoids[e].diffuse[2] * 255,
        255
      ); // ellipsoid diffuse color
      for (var p = 0; p < numEllipsoidPixels; p++) {
        do {
          x = Math.random() * 2 - 1; // in unit square
          y = Math.random() * 2 - 1; // in unit square
        } while (Math.sqrt(x * x + y * y) > 1); // a circle is also an ellipse
        drawPixel(
          imagedata,
          cx + Math.round(x * ellipsoidXRadius),
          cy + Math.round(y * ellipsoidYRadius),
          c
        );
        //console.log("color: ("+c.r+","+c.g+","+c.b+")");
        //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
        //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
      } // end for pixels in ellipsoid
    } // end for ellipsoids
    context.putImageData(imagedata, 0, 0);
  } // end if ellipsoids found
} // end draw rand pixels in input ellipsoids

// draw 2d projections read from the JSON file at class github
function drawInputEllipsoidsUsingArcs(context) {
  var inputEllipsoids = getInputEllipsoids();

  if (inputEllipsoids != String.null) {
    var c = new Color(0, 0, 0, 0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var n = inputEllipsoids.length;
    //console.log("number of ellipsoids: " + n);

    // Loop over the ellipsoids, draw each in 2d
    for (var e = 0; e < n; e++) {
      context.fillStyle =
        "rgb(" +
        Math.floor(inputEllipsoids[e].diffuse[0] * 255) +
        "," +
        Math.floor(inputEllipsoids[e].diffuse[1] * 255) +
        "," +
        Math.floor(inputEllipsoids[e].diffuse[2] * 255) +
        ")"; // diffuse color
      context.save(); // remember previous (non-) scale
      context.scale(1, inputEllipsoids[e].b / inputEllipsoids[e].a); // scale by ellipsoid ratio
      context.beginPath();
      context.arc(
        Math.round(w * inputEllipsoids[e].x),
        Math.round(h * inputEllipsoids[e].y),
        Math.round(w * inputEllipsoids[e].a),
        0,
        2 * Math.PI
      );
      context.restore(); // undo scale before fill so stroke width unscaled
      context.fill();
      //console.log(context.fillStyle);
      //console.log("x: "+Math.round(w*inputEllipsoids[e].x));
      //console.log("y: "+Math.round(h*inputEllipsoids[e].y));
      //console.log("a: "+Math.round(w*inputEllipsoids[e].a));
      //console.log("b: "+Math.round(h*inputEllipsoids[e].b));
    } // end for ellipsoids
  } // end if ellipsoids found
} // end draw input ellipsoids

//put random points in the triangles from the class github
function drawRandPixelsInInputTriangles(context) {
  var inputTriangles = getInputTriangles();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  const PIXEL_DENSITY = 0.1;
  var numCanvasPixels = w * h * PIXEL_DENSITY;

  if (inputTriangles != String.null) {
    var x = 0;
    var y = 0; // pixel coord init
    var cx = 0;
    var cy = 0; // init center x and y coord
    var numTrianglePixels = 0; // init num pixels in triangle
    var c = new Color(0, 0, 0, 0); // init the triangle color
    var n = inputTriangles.length; // the number of input files
    //console.log("number of files: " + n);

    // Loop over the triangles, draw rand pixels in each
    for (var f = 0; f < n; f++) {
      var tn = inputTriangles[f].triangles.length;
      //console.log("number of triangles in this files: " + tn);

      // Loop over the triangles, draw each in 2d
      for (var t = 0; t < tn; t++) {
        var vertex1 = inputTriangles[f].triangles[t][0];
        var vertex2 = inputTriangles[f].triangles[t][1];
        var vertex3 = inputTriangles[f].triangles[t][2];

        var vertexPos1 = inputTriangles[f].vertices[vertex1];
        var vertexPos2 = inputTriangles[f].vertices[vertex2];
        var vertexPos3 = inputTriangles[f].vertices[vertex3];
        //console.log("vertexPos1 " + vertexPos1);
        //console.log("vertexPos2 " + vertexPos2);
        //console.log("vertexPos3 " + vertexPos3);

        // triangle position on canvas

        var v1 = [w * vertexPos1[0], h * vertexPos1[1]];
        var v2 = [w * vertexPos2[0], h * vertexPos2[1]];
        var v3 = [w * vertexPos3[0], h * vertexPos3[1]];

        // calculate triangle area on canvas (shoelace formula)
        var triangleArea =
          0.5 *
          Math.abs(
            v1[0] * v2[1] +
              v2[0] * v3[1] +
              v3[0] * v1[1] -
              v2[0] * v1[1] -
              v3[0] * v2[1] -
              v1[0] * v3[1]
          );
        var numTrianglePixels = triangleArea; // init num pixels in triangle
        //console.log("triangle area " + triangleArea);
        numTrianglePixels *= PIXEL_DENSITY; // percentage of triangle area to render to pixels
        numTrianglePixels = Math.round(numTrianglePixels);
        // console.log("numTrianglePixels " + numTrianglePixels);
        c.change(
          inputTriangles[f].material.diffuse[0] * 255,
          inputTriangles[f].material.diffuse[1] * 255,
          inputTriangles[f].material.diffuse[2] * 255,
          255
        ); // triangle diffuse color
        for (var p = 0; p < numTrianglePixels; p++) {
          var point; // on canvas plane
          var triangleTest = 0;
          while (triangleTest == 0) {
            //if the pixel outside the triangle

            point = [
              Math.floor(Math.random() * w),
              Math.floor(Math.random() * h),
            ];
            // plane checking

            var t1 =
              (point[0] - v2[0]) * (v1[1] - v2[1]) -
                (v1[0] - v2[0]) * (point[1] - v2[1]) <
              0.0;
            var t2 =
              (point[0] - v3[0]) * (v2[1] - v3[1]) -
                (v2[0] - v3[0]) * (point[1] - v3[1]) <
              0.0;
            var t3 =
              (point[0] - v1[0]) * (v3[1] - v1[1]) -
                (v3[0] - v1[0]) * (point[1] - v1[1]) <
              0.0;

            if (t1 == t2 && t2 == t3)
              // draw the pixel if inside the triangle
              triangleTest = 1;
          }
          drawPixel(imagedata, point[0], point[1], c);
          //console.log("color: ("+c.r+","+c.g+","+c.b+")");
          //console.log("x: "+ x);
          //console.log("y: "+ y);
        } // end for pixels in triangle
      } // end for triangles
    } // end for files
    context.putImageData(imagedata, 0, 0);
  } // end if triangle file found
} // end draw rand pixels in input triangles

//draw 2d projections traingle from the JSON file at class github
function drawInputTrainglesUsingPaths(context) {
  var inputTriangles = getInputTriangles();

  if (inputTriangles != String.null) {
    var c = new Color(0, 0, 0, 0); // the color at the pixel: black
    var w = context.canvas.width;
    var h = context.canvas.height;
    var n = inputTriangles.length;
    //console.log("number of files: " + n);

    // Loop over the input files
    for (var f = 0; f < n; f++) {
      var tn = inputTriangles[f].triangles.length;
      //console.log("number of triangles in this files: " + tn);

      // Loop over the triangles, draw each in 2d
      for (var t = 0; t < tn; t++) {
        var vertex1 = inputTriangles[f].triangles[t][0];
        var vertex2 = inputTriangles[f].triangles[t][1];
        var vertex3 = inputTriangles[f].triangles[t][2];

        var vertexPos1 = inputTriangles[f].vertices[vertex1];
        var vertexPos2 = inputTriangles[f].vertices[vertex2];
        var vertexPos3 = inputTriangles[f].vertices[vertex3];
        //console.log("vertexPos1 " + vertexPos1);
        //console.log("vertexPos2 " + vertexPos2);
        //console.log("vertexPos3 " + vertexPos3);

        context.fillStyle =
          "rgb(" +
          Math.floor(inputTriangles[f].material.diffuse[0] * 255) +
          "," +
          Math.floor(inputTriangles[f].material.diffuse[1] * 255) +
          "," +
          Math.floor(inputTriangles[f].material.diffuse[2] * 255) +
          ")"; // diffuse color

        var path = new Path2D();
        path.moveTo(w * vertexPos1[0], h * vertexPos1[1]);
        path.lineTo(w * vertexPos2[0], h * vertexPos2[1]);
        path.lineTo(w * vertexPos3[0], h * vertexPos3[1]);
        path.closePath();
        context.fill(path);
      } // end for triangles
    } // end for files
  } // end if triangle files found
} // end draw input triangles

// put random points in the boxes from the class github
function drawRandPixelsInInputBoxes(context) {
  var inputBoxes = getInputBoxes();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);
  const PIXEL_DENSITY = 0.1;
  var numCanvasPixels = w * h * PIXEL_DENSITY;

  if (inputBoxes != String.null) {
    var x = 0;
    var y = 0; // pixel coord init
    var lx = 0;
    var rx = 0; // input lx, rx from boxes.json
    var by = 0;
    var ty = 0; // input by, ty from boxes.json
    var fz = 0;
    var rz = 0; // input fz, rz from boxes.json
    var numBoxPixels = 0; // init num pixels in boxes
    var c = new Color(0, 0, 0, 0); // init the box color
    var n = inputBoxes.length; // the number of input boxes
    //console.log("number of ellipses: " + n);

    // Loop over the ellipsoids, draw rand pixels in each
    for (var b = 0; b < n; b++) {
      // input lx,rx,by,ty on canvas
      lx = w * inputBoxes[b].lx;
      rx = w * inputBoxes[b].rx;
      by = h * inputBoxes[b].by;
      ty = h * inputBoxes[b].ty;

      numBoxesPixels = (rx - lx) * (ty - by); // projected box area
      numBoxesPixels *= PIXEL_DENSITY; // percentage of box area to render to pixels
      numBoxesPixels = Math.round(numBoxesPixels);

      //console.log("num box pixels: "+numBoxesPixels);

      c.change(
        inputBoxes[b].diffuse[0] * 255,
        inputBoxes[b].diffuse[1] * 255,
        inputBoxes[b].diffuse[2] * 255,
        255
      ); // box diffuse color
      for (var p = 0; p < numBoxesPixels; p++) {
        do {
          x = Math.floor(Math.random() * w);
          y = Math.floor(Math.random() * h);
        } while (x < lx || x > rx || y > ty || y < by); // inside the projection
        drawPixel(imagedata, x, y, c);
        //console.log("color: ("+c.r+","+c.g+","+c.b+")");
        //console.log("x: " + x);
        //console.log("y: " + y);
      } // end for pixels in box
    } // end for boxes
    context.putImageData(imagedata, 0, 0);
  } // end if boxes found
} // end draw rand pixels in input boxes

//draw 2d projections boxes from the JSON file at class github
function drawInputBoxesUsingPaths(context) {
  var inputBoxes = getInputBoxes();
  var n = inputBoxes.length; // the number of input boxes

  if (inputBoxes != String.null) {
    var w = context.canvas.width;
    var h = context.canvas.height;
    var c = new Color(0, 0, 0, 0); // the color at the pixel: black
    var x = 0;
    var y = 0; // pixel coord init
    var lx = 0;
    var rx = 0; // input lx, rx from boxes.json
    var by = 0;
    var ty = 0; // input by, ty from boxes.json
    var fz = 0;
    var rz = 0; // input fz, rz from boxes.json
    //console.log("number of files: " + n);

    // Loop over the input files
    for (var b = 0; b < n; b++) {
      // input lx,rx,by,ty on canvas
      lx = w * inputBoxes[b].lx;
      rx = w * inputBoxes[b].rx;
      by = h * inputBoxes[b].by;
      ty = h * inputBoxes[b].ty;

      context.fillStyle =
        "rgb(" +
        Math.floor(inputBoxes[b].diffuse[0] * 255) +
        "," +
        Math.floor(inputBoxes[b].diffuse[1] * 255) +
        "," +
        Math.floor(inputBoxes[b].diffuse[2] * 255) +
        ")"; // diffuse color

      var path = new Path2D();
      path.moveTo(lx, ty);
      path.lineTo(lx, by);
      path.lineTo(rx, by);
      path.lineTo(rx, ty);
      path.closePath();
      context.fill(path);
    } // end for files
  } // end if box files found
} // end draw input boxes

/* main -- here is where execution begins after window load */

// ray casting for a single pixel
function raycast(
  x,
  y,
  triangles,
  canvasWidth,
  canvasHeight,
  isChristmasScene = false
) {
  const eye = [0.5, 0.5, -0.5];
  const windowZ = 0;

  let rayDir = [
    (x + 0.5) / canvasWidth - 0.5,
    -((y + 0.5) / canvasHeight - 0.5),
    windowZ - eye[2],
  ];
  rayDir = vecNormalize(rayDir);

  let ray = { origin: eye, direction: rayDir };

  let closestT = Infinity;
  let hitInfo = null;

  for (let file of triangles) {
    let material = file.material;
    for (let t = 0; t < file.triangles.length; t++) {
      let triangle = {
        v0: file.vertices[file.triangles[t][0]],
        v1: file.vertices[file.triangles[t][1]],
        v2: file.vertices[file.triangles[t][2]],
      };

      let intersectionResult = rayTriangleIntersection(ray, triangle, windowZ);
      if (
        intersectionResult &&
        intersectionResult.t > 0 &&
        intersectionResult.t < closestT
      ) {
        closestT = intersectionResult.t;
        hitInfo = {
          triangle: triangle,
          material: material,
          P: intersectionResult.P,
          N: intersectionResult.N,
        };
      }
    }
  }

  if (hitInfo) {
    let color = computeBlinnPhong(
      hitInfo.P,
      hitInfo.N,
      eye,
      hitInfo.material,
      isChristmasScene
    );
    return color;
  } else {
    return null;
  }
}

// check if a ray intersects with a triangle using plane equation
function rayTriangleIntersection(ray, triangle, windowZ) {
  const EPSILON = 0.0000001;

  let A = triangle.v0;
  let B = triangle.v1;
  let C = triangle.v2;

  let BA = vecSubtract(B, A);
  let CA = vecSubtract(C, A);
  let N = vecCross(BA, CA);
  N = vecNormalize(N);

  let d = vecDot(N, A);

  let denom = vecDot(N, ray.direction);

  if (Math.abs(denom) < EPSILON) return null;

  let t = (d - vecDot(N, ray.origin)) / denom;

  if (t < 0) return null;

  let P = vecAdd(ray.origin, vecScale(ray.direction, t));

  if (P[2] < windowZ - EPSILON) {
    return null;
  }

  let edge0 = vecSubtract(B, A);
  let vp0 = vecSubtract(P, A);
  let C0 = vecCross(edge0, vp0);

  let edge1 = vecSubtract(C, B);
  let vp1 = vecSubtract(P, B);
  let C1 = vecCross(edge1, vp1);

  let edge2 = vecSubtract(A, C);
  let vp2 = vecSubtract(P, C);
  let C2 = vecCross(edge2, vp2);

  if (
    vecDot(N, C0) >= -EPSILON &&
    vecDot(N, C1) >= -EPSILON &&
    vecDot(N, C2) >= -EPSILON
  ) {
    return { t: t, P: P, N: N };
  } else {
    return null;
  }
}

// computes the color of a point using Blinn-Phong
function computeBlinnPhong(P, N, eye, material, isChristmasScene = false) {
  const lightPos = [-3, 1, -0.5];
  let La, Ld, Ls;

  if (isChristmasScene) {
    La = [0.2, 0.2, 0.3]; // night sky
    Ld = [0.8, 0.8, 1.0]; // moonlight color
    Ls = [1, 1, 1];
  } else {
    La = [1, 1, 1];
    Ld = [1, 1, 1];
    Ls = [1, 1, 1];
  }

  let V = vecNormalize(vecSubtract(eye, P));
  if (vecDot(N, V) < 0) {
    N = vecScale(N, -1);
  }

  let L = vecNormalize(vecSubtract(lightPos, P));
  let H = vecNormalize(vecAdd(L, V));

  let color = [0, 0, 0];

  for (let c = 0; c < 3; c++) {
    color[c] = material.ambient[c] * La[c];
    color[c] += material.diffuse[c] * Ld[c] * Math.max(vecDot(N, L), 0);
    color[c] +=
      material.specular[c] *
      Ls[c] *
      Math.pow(Math.max(vecDot(N, H), 0), material.n);
  }

  color = color.map((c) => Math.min(Math.max(c, 0), 1) * 255);

  return new Color(color[0], color[1], color[2], 255);
}

//subtracts vectors
function vecSubtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function vecAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function vecScale(v, s) {
  return [v[0] * s, v[1] * s, v[2] * s];
}

//cross product
function vecCross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

//dot product
function vecDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function vecNormalize(v) {
  let length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  if (length > 0) {
    return [v[0] / length, v[1] / length, v[2] / length];
  }
  return [0, 0, 0];
}

// Multiply two vectors component-wise
function vecMultiply(a, b) {
  return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

// Multiply vector by scalar
function vecMultiplyScalar(v, s) {
  return [v[0] * s, v[1] * s, v[2] * s];
}

//renders unlit colored triangles
function renderUnlitColoredTriangles(context) {
  var inputTriangles = getInputTriangles();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);

  if (inputTriangles !== String.null) {
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        let hitResult = raycast(x, y, inputTriangles, w, h);
        if (hitResult) {
          let color = new Color(
            hitResult.material.diffuse[0] * 255,
            hitResult.material.diffuse[1] * 255,
            hitResult.material.diffuse[2] * 255,
            255
          );
          drawPixel(imagedata, x, y, color);
        } else {
          drawPixel(imagedata, x, y, new Color(0, 0, 0, 255));
        }
      }
    }
    context.putImageData(imagedata, 0, 0);
  } else {
    console.log("No triangles found.");
  }
}

// renders the first view upon page load, that is all the original triangles
function renderOriginalScene(context) {
  var inputTriangles = getInputTriangles();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);

  if (inputTriangles !== String.null) {
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        let color = raycast(x, y, inputTriangles, w, h, false);
        if (color) {
          drawPixel(imagedata, x, y, color);
        } else {
          drawPixel(imagedata, x, y, new Color(0, 0, 0, 255));
        }
      }
    }
    context.putImageData(imagedata, 0, 0);
  } else {
    console.log("No triangles found.");
  }
}

// creates scene that is visible upon spacebar press
function createChristmasTreeScene() {
  let scene = [];

  // create trees
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 4; j++) {
      let x = 0.05 + i * 0.15 + Math.random() * 0.05;
      let y = 0.1 + j * 0.2 + Math.random() * 0.1;
      let z = 0.5;
      let size = 0.05 + Math.random() * 0.08;

      scene.push({
        vertices: [
          [x, y, z],
          [x + size, y - size * 1.5, z],
          [x - size, y - size * 1.5, z],
          [x, y + size * 1.5, z - size],
        ],
        triangles: [
          [0, 1, 2],
          [0, 1, 3],
          [1, 2, 3],
          [2, 0, 3],
        ],
        material: {
          ambient: [0.05, 0.15, 0.05],
          diffuse: [0.1, 0.4 + Math.random() * 0.2, 0.1],
          specular: [0.2, 0.2, 0.2],
          n: 10,
        },
      });
    }
  }

  // moon
  let moonCenter = [0.8, 0.8, 0.8];
  let moonRadius = 0.15;
  let moonSegments = 32;

  for (let i = 0; i < moonSegments; i++) {
    let angle1 = (i / moonSegments) * Math.PI * 2;
    let angle2 = ((i + 1) / moonSegments) * Math.PI * 2;

    let p1 = [
      moonCenter[0] + moonRadius * Math.cos(angle1),
      moonCenter[1] + moonRadius * Math.sin(angle1),
      moonCenter[2],
    ];
    let p2 = [
      moonCenter[0] + moonRadius * Math.cos(angle2),
      moonCenter[1] + moonRadius * Math.sin(angle2),
      moonCenter[2],
    ];

    scene.push({
      vertices: [moonCenter, p1, p2],
      triangles: [[0, 1, 2]],
      material: {
        ambient: [0.2, 0.2, 0.2],
        diffuse: [0.9, 0.9, 0.8],
        specular: [0.5, 0.5, 0.5],
        n: 20,
      },
    });
  }

  return scene;
}

let useInterestingScene = false;

// event listener for switching scenes
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    useInterestingScene = !useInterestingScene;
    main();
  }
});

// renders lit triangles, unused
function renderLitTriangles(context, customScene = null) {
  var inputTriangles = customScene || getInputTriangles();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);

  if (inputTriangles !== String.null) {
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        let color = raycast(x, y, inputTriangles, w, h);
        if (color) {
          drawPixel(imagedata, x, y, color);
        } else {
          drawPixel(imagedata, x, y, new Color(0, 0, 0, 255));
        }
      }
    }
    context.putImageData(imagedata, 0, 0);
  } else {
    console.log("No triangles found.");
  }
}

// rendering scene thats visible after spacebar press
function renderChristmasScene(context) {
  let scene = createChristmasTreeScene();
  var w = context.canvas.width;
  var h = context.canvas.height;
  var imagedata = context.createImageData(w, h);

  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      let color = raycast(x, y, scene, w, h, true);
      if (color) {
        drawPixel(imagedata, x, y, color);
      } else {
        drawPixel(imagedata, x, y, new Color(0, 0, 0, 255));
      }
    }
  }
  context.putImageData(imagedata, 0, 0);
}
// main function to start the rendering, has lots of debug statements that helped while debugging
function main() {
  console.log("starting main function");
  var canvas = document.getElementById("viewport");
  if (!canvas) {
    console.error("canvas not found");
    return;
  }
  var context = canvas.getContext("2d");
  if (!context) {
    console.error("context not found");
    return;
  }
  console.log("success");

  if (useInterestingScene) {
    renderChristmasScene(context);
  } else {
    renderOriginalScene(context);
  }

  console.log("finished main");
}

window.onload = main;
