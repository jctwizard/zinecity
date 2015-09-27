
    /**/

var container = document.getElementById("container")
container.style.height = container.clientWidth + "px";
var width = container.clientWidth;
var height = container.clientHeight;
var aspect = width / height;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

var geometry = new THREE.TextGeometry("ZINECITY", { font: "droid sans mono", size: 0.5, height: 0 });

geometry.computeBoundingBox();
var textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
var textHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
var textDepth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;
geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-0.5 * textWidth, -0.5 * textHeight, -0.5 * textDepth));

var material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xFFFFFF });
var textObject = new THREE.Mesh(geometry, material);
textObject.position.y = 1.0;

scene.add(textObject);

build();

camera.position.z = 4;

function build()
{
  var streetCount = 7;
  var buildingCount = 10;

  for (var street = 0; street < streetCount; street++)
  {
    for (var building = 0; building < buildingCount; building++)
    {
      var height = Math.random() * 5;
      var depth = Math.random() * 0.25 + 0.75;
      var width = 0.65;
      var buildingGeometry = new THREE.CubeGeometry(width, height, depth);
      var buildingObject = new THREE.Mesh(buildingGeometry, material);

      buildingObject.position.z = -street - 3;
      buildingObject.position.y = height * 0.5 - 4 - street * 0.3;
      buildingObject.position.x = building * width - ((buildingCount - 1) / 2) * width;
      scene.add(buildingObject);
    }
  }
}

function render()
{
  requestAnimationFrame(render);

  if (textObject)
  {
    textObject.rotation.x += 0.02;
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", resize, false);
function resize()
{
  container.style.height = container.clientWidth + "px";

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

render();
