import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TorusBufferGeometry } from "three";

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes helper

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Fonts
 */

const fontLoader = new THREE.FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometryName = new THREE.TextBufferGeometry("Ralf Boltshauser", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometryName.computeBoundingBox();
  textGeometryName.center();

  const material = new THREE.MeshNormalMaterial();
  // textMaterial.wireframe = true
  const name = new THREE.Mesh(textGeometryName, material);
  scene.add(name);

  const textGeometryMail = new THREE.TextBufferGeometry("ralf@boltshauser.com", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometryMail.computeBoundingBox();
  textGeometryMail.center();
  

  // textMaterial.wireframe = true
  const textMail = new THREE.Mesh(textGeometryMail, material);
  textMail.position.y -= textGeometryMail.boundingBox.max.y * 2;
  
  scene.add(textMail);

  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 43);

  for (let i = 0; i < 200; i++) {

    const donut = new THREE.Mesh(donutGeometry, material);

    donut.position.x = (Math.random() - 0.5) * 30
    donut.position.y = (Math.random() - 0.5) * 30
    donut.position.z = (Math.random() - 0.5) * 30

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y= Math.random() * Math.PI

    const scale = Math.random() + 0.5
    donut.scale.set(scale,scale,scale)
    scene.add(donut);
  }
  
  const cubeGeometry = new THREE.BoxBufferGeometry(0.3,0.3,0.3);
  for (let i = 0; i < 200; i++) {

    const cube = new THREE.Mesh(cubeGeometry, material);

    cube.position.x = (Math.random() - 0.5) * 30
    cube.position.y = (Math.random() - 0.5) * 30
    cube.position.z = (Math.random() - 0.5) * 30

    cube.rotation.x = Math.random() * Math.PI
    cube.rotation.y= Math.random() * Math.PI

    const scale = Math.random() + 0.5
    cube.scale.set(scale,scale,scale)
    scene.add(cube);
  }
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();


  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
