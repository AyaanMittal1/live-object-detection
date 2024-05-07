status1 = "";
objects = [];
x1 = 0;
y1 = 0;
height1 = 0;
width1 = 0;
name1 = "";
times=0;

confidence = 0;
function setup() {
    canvas = createCanvas(400, 400);

    canvas.center();
    object_detection = ml5.objectDetector('cocossd', loaded)
    document.getElementById("status").innerHTML = "Detecting objects";
    video=createCapture(VIDEO);
    video.size(400,400)
    video.hide();
}
function preload() {
}
function draw() {
    image(video, 0, 0, 400, 400);
    // stroke(random(0,255),random(0,255),random(0,255));
    noFill();
    // rect(355,15 , 200 , 100);
    // text("Bread", 360, 30 )
    if (status1 != "") {
        console.log(objects);
        r=random(0,255);
        g=random(0,255);
        b=random(0,255);
        for(i=0; i<objects.length; i++){
            x1 = objects[i].x;
            y1 = objects[i].y;
            width1 = objects[i].width;
            height1 = objects[i].height;
            name1=objects[i].label;
            confidence=floor(objects[i].confidence*100);
            stroke(r,g,b);
            rect(x1, y1, width1, height1);
            text(name1+" "+confidence+"% confident", x1+5,y1+15);
            document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("num_ob").innerHTML="There are "+objects.length+" objects in this image.";
        }
       
    }
}
function loaded() {
    console.log("cocoSSD has loaded");
    object_detection.detect(video, gotresults)
    status1 = true;
}
function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    // else {
        // console.log(results);
        objects = results;
        // status1 = true;
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("num_ob").innerHTML="There are "+objects.length+" objects in this image.";

    // }
}