var clock = new THREE.Clock();
var delta = clock.getDelta();
var container;

var camera, scene, renderer;

init();
animate();

function init()
{
  container = $("#scene");
  var halfWidth = container.innerWidth() / 2;
  var halfHeight = container.innerHeight() / 2;

  camera = new THREE.OrthographicCamera(-halfWidth, halfWidth, -halfHeight, halfHeight, 1, 1000);
  scene = new THREE.Scene();

  var ambient = new THREE.AmbientLight(0x666);
  scene.add(ambient);

  var manager = new THREE.LoadingManager();
  var loader = new THREE.OBJLoader(manager);
  loader.load('zinecity.obj', function(object)
  {
    obj = object
    scene.add(obj);
  });

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.innerWidth(), container.innerHeight());
  container.appendChild(renderer.domElement);
}

function animate()
{
  requestAnimationFrame(animate);
  render();
}

function render()
{
  obj.rotation.y += speed * (Math.PI / 180);

  renderer.render(scene, camera);
}
