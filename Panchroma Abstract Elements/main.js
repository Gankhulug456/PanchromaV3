// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 20;

// Create a renderer with transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight+100);

document.body.appendChild(renderer.domElement);
const canvasContainer = document.getElementById('three-js-canvas-container');
canvasContainer.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
}
let object1, object2

// Adjust renderer DOM element style for overlay
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '0';

//Color
const color_1 = new THREE.Color("rgb(255, 98, 25, 10)");
const color_2 = new THREE.Color("rgb(250, 60, 142)");
const color_3 = new THREE.Color("rgb(71, 185, 255)");
const loader_t = new THREE.CubeTextureLoader();
const textureCube = loader_t.load([
  'env/px.png',
  'env/nx.png',
  'env/py.png',
  'env/ny.png',
  'env/pz.png',
  'env/nz.png'
]);

// Create a sphere geometry
const geometry = new THREE.SphereGeometry();

// Use MeshPhongMaterial for reflective properties
const material = new THREE.MeshStandardMaterial({
    //emissive : (247, 80, 2 ),
    //color: color_1,
    //emissiveIntensity: 1,
    envMap: textureCube, // Apply the cubemap as an environment map
    //color: (247, 80, 2 ),
    //envMapRotation: (0,10,0),
    metalness: 1, // Adjust for desired reflectivity
    roughness: 0, // Adjust for desired smoothness

  });
x_pos = 0

  const loader = new OBJLoader();
  loader.load(
    'obj/abs.obj', // Path to your OBJ file
    function (object) {
        object1 = object
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material; // Apply the material to each mesh in the object
        }
      });
      object.scale.set(0.1,0.1,0.16)
      object.position.set(10, -2, 0)
      object.rotation.set(0.01,-0.633, -0.1)

      //object.position.x = x_pos
      scene.add(object); // Add the object to the scene
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Optional: Progress
    },
    function (error) {
      console.log('An error happened'); // Optional: Error handling
    }
  );
  const loader_shape = new OBJLoader();
  loader_shape.load(
    'obj/abs.obj', // Path to your OBJ file
    function (object) {
        object2 = object
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          child.material = material; // Apply the material to each mesh in the object
        }
      });
      object.scale.set(0.15,0.13,0.2)
      object.position.set(-16, -2, 0)
      object.rotation.set(0.01,0, 0)

      //object.position.x = x_pos
      scene.add(object); // Add the object to the scene
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded'); // Optional: Progress
    },
    function (error) {
      console.log('An error happened'); // Optional: Error handling
    }
  );
  
  const material_2 = new THREE.MeshStandardMaterial({
    emissive : (247, 80, 2 ),
    color: color_2,
    emissiveIntensity: 1,
    envMap: textureCube, // Apply the cubemap as an environment map
    //color: (247, 80, 2 ),

    metalness: 0.2, // Adjust for desired reflectivity
    roughness: 0.2, // Adjust for desired smoothness

  });

  const material_3 = new THREE.MeshStandardMaterial({
    emissive : (247, 80, 2 ),
    color: color_3,
    emissiveIntensity: 1,
    envMap: textureCube, // Apply the cubemap as an environment map
    //color: (247, 80, 2 ),

    metalness: 0.2, // Adjust for desired reflectivity
    roughness: 0.2, // Adjust for desired smoothness

  });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a sphere mesh
const spheres = []; // Array to hold our spheres

// for (let i = 0; i < 1; i++) { // Create 5 spheres
//   const geometry = new THREE.SphereGeometry(3, 32, 32); // Smaller spheres
//   const sphere = new THREE.Mesh(geometry, material);
//   sphere.position.x = 10; 
//   sphere.position.y = -1.8;
//   sphere.originalPosition = { x: sphere.position.x, y: sphere.position.y, z: 0};
//   spheres.push(sphere);
//   scene.add(sphere);
// }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
 
}

window.addEventListener('mousemove', onMouseMove, false);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const geometry_torus = new THREE.TorusGeometry( 1.3, 0.6, 16, 100 ); 
// const material_torus = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
// const torus = new THREE.Mesh( geometry_torus, material ); 
// torus.rotation.x = 70
// torus.rotation.y = -50
// torus.rotation.z = 50

// torus.position.x = 3; 
// torus.position.y = 1;
// torus.originalPosition = { x: torus.position.x, y: torus.position.y, z: 0};
// scene.add( torus );

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const capsule_geo = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 

// const material_cap = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 

// const capsule = new THREE.Mesh( capsule_geo, material ); 
// capsule.position.x = 5; 
// capsule.position.y = -4;
// capsule.rotation.z = -50
// capsule.originalPosition = { x: capsule.position.x, y: capsule.position.y, z: 0};

// scene.add( capsule );
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const geometry_cone = new THREE.ConeGeometry( 1.5, 3.5, 32 ); 
// const material_cone = new THREE.MeshBasicMaterial( {color: 0xffff00} );
// const cone = new THREE.Mesh(geometry_cone, material ); 
// cone.position.x = 8; 
// cone.position.y = 4;
// cone.rotation.z = 50
// cone.rotation.y = 15
// cone.originalPosition = { x: cone.position.x, y: cone.position.y, z: 0};

// scene.add( cone );

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const geometry_circle = new THREE.CircleGeometry( 1.5, 32 ); 
// const material_circle = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
// const circle = new THREE.Mesh( geometry_circle, material ); 
// circle.position.x = 6; 
// circle.position.y = 0;

// circle.rotation.x = 1
// circle.originalPosition = { x: circle.position.x, y: circle.position.y, z: 0};
// circle.rotation.x = 0.5
// circle.rotation.y = 1
// scene.add( circle );





 /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add a directional light to create reflections
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light
directionalLight.position.set(1, 1, 1); // Adjust position as needed
scene.add(directionalLight);

// Optionally, add an ambient light for more uniform lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);

    scene.children.forEach((child) => {
        if (child === object1 || child === object2) {
            let vector = new THREE.Vector3(mouse.x, mouse.y, 0);
            vector.unproject(camera);
            let dir = vector.sub(camera.position).normalize();
            let distance = -camera.position.z / dir.z;
            let pos = camera.position.clone().add(dir.multiplyScalar(distance));
            let objectDistance = pos.distanceTo(child.position);

            console.log("Distance to Object:", objectDistance); // Check the calculated distance

            if (objectDistance < 6) {
                let scaleFactor = Math.sin(Date.now() * 0.0001 + objectDistance) * 0.0001;
                child.position.z = scaleFactor + 8;
                console.log("Applying Wave Transformation"); // Check if transformation is applied
            } else {
                child.position.lerp(new THREE.Vector3(child.position.x, child.position.y, 0), 0.01);
            }
        }
    });

    renderer.render(scene, camera);
}



animate();


// Make it responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
