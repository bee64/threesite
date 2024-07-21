<template>
  <div class="cursor-trail">
    <div class="grid">
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
      <div class="grid-item"></div>
    </div>
  </div>
  <canvas id="canvas"></canvas>
  <div class="background" @click="addMoon">
    <div class="bloggy glassy">
      <div class="cute-frame">
        <div class="inner-frame">
          <img width="150" height="150" :src="peace">
        </div>
      </div>
      <div class="header-blurb">
        bee's fake blog
      </div>

      <div class="opaque stuff">
        <h2>things i like</h2>

        <img class="frame" width="110" height="110" :src="coffee">
        <p>coffee</p>

        <img class="frame" width="110" height="110" :src="tree">
        <p>tree</p>

        <img class="frame" width="110" height="110" :src="digitakt">
        <p>digitakt</p>
      </div>
      <div class="about opaque">
        <p>
          hi!! i'm bee, i normally make websites that handle a buncha data
          and do fancy stuff. this one is nothing like that, and more
          a space to express creatively and have some fun makin a cute 
          website for a change ^-^
        </p>

        <p style="margin-top: 2rem;">
          i was havin fun playing with opacity and gradients and some 
          fun animations on this one, but honestly i've been doin websites 
          for quite a while so i'm super open (and capable) with more 
          creative ideas. comfy with 3d stuff and all that! i def lean more 
          code than design // visual art
        </p>

        <p style="margin-top: 2rem;">
          try clicking!!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import peace from '../assets/usagi-peace.png'
import coffee from '../assets/coffee.png'
import tree from '../assets/tree.png'
import digitakt from '../assets/digitakt.png'

import * as THREE from 'three'
import { CSG } from 'three-csg-ts';

import { ref, onMounted } from "vue"

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 1000)

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
light.position.set(0, 0, -5)
scene.add(light)

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var plane = new THREE.Plane();
var planeNormal = new THREE.Vector3();

function getPoint(event){
  var point = new THREE.Vector3();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  planeNormal.copy(camera.position).normalize();
  plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
  raycaster.setFromCamera(mouse, camera);
  raycaster.ray.intersectPlane(plane, point);
  return point;
}

const geometry = new THREE.CylinderGeometry(1, 1, .01, 32);
const cylinder1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
const cylinder2 = new THREE.Mesh(geometry.clone(), new THREE.MeshBasicMaterial());
cylinder2.position.set(.7, 0, 0);

cylinder1.updateMatrix();
cylinder2.updateMatrix();

const result = CSG.subtract(cylinder1, cylinder2);
result.material = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
// turn 90 degrees, top of cylinder facing camera
result.rotation.x = Math.PI / 2;

const animationTiming = ref([])
function addMoon(event) {
  const moon = result.clone()

  const point = getPoint(event)
  moon.position.set(point.x, point.y, 0)

  scene.add(moon)
  animationTiming.value.push(0)
  // setTimeout(removeMoon, 1000)
}

function removeMoon() {
   scene.remove(scene.children[1])
   animationTiming.value.shift()
}

onMounted(() => {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    alpha: true,
  });
  renderer.setSize( window.innerWidth, window.innerHeight );  
  camera.position.z = 5;
  
  function animate() {
    scene.children.forEach((child, i) => {
      // child.rotation.x += 0.001
      // child.rotation.y += 0.01
      // child.rotation.x += Math.sin(animationTiming.value[i] * 0.001)
      child.rotation.y = Math.sin(animationTiming.value[i] * .08)

      animationTiming.value[i] += 1

      if (animationTiming.value[i] > 500) {
        removeMoon()
      }
    })
    renderer.render( scene, camera );
  }
  renderer.setAnimationLoop( animate );
})

</script>

<style lang="scss">
#canvas {
  position: absolute;
  z-index: 2;
  pointer-events: none;
}

@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
#app {
  cursor: url("../assets/cursor.cur"), auto;
  background-color: rgba(255, 165, 237, 0.61);

  background-size: 40px 40px;
  background-image:
    linear-gradient(to right, rgba(255, 165, 237, .8) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 165, 237, .8) 1px, transparent 1px);
}

img {
  display: block;
}

p {
  margin: 0;
}

.bloggy {
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;

  width: 80vw;
  max-width: 850px;
  min-width: 800px;
  height: 85vh;
  min-height: 800px;

  padding: 2rem;
  padding-bottom: 3rem;

  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 166px auto;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
}

.cute-frame {
  border: 5px solid lighten(rgba(255, 165, 237, 0.61), 12%);
  border-radius: 8px;
  .inner-frame {
    border: 3px solid #FFC000;
    border-radius: 8px;
  }
}

.glassy {
  background: rgba(255, 165, 237, 0.31);
  border: 1px solid rgba(255, 165, 237, 0.61);
  border-radius: 6px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.5px);
  -webkit-backdrop-filter: blur(1.5px);
}

.opaque {
  background: lighten(rgba(255, 165, 237, 1), 8%);
  border-radius: 4px;
  border: 2px solid lighten(rgb(255, 165, 237), 50%);
}

.opaque, .frame {
  border: 2px solid lighten(rgb(255, 165, 237), 50%);
}

.frame {
  display: block;
  margin: auto;
}

.stuff {
  text-align: center;
  color: darken(rgba(255, 165, 237), 70%);
  padding: 0 .5rem;

  p {
    margin-bottom: 0.75rem;
  }
}

.about {
  color: darken(rgba(255, 165, 237), 70%);
  padding: 1.5rem 1rem;
  font-size: 28px;
}

.header-blurb {
  background: linear-gradient(
    60deg,
    lighten(rgb(255, 165, 237), 50%),
    1%,
    darken(rgba(255, 165, 237), 65%),
    95%,
    lighten(rgb(255, 165, 237), 50%));
  background-clip: text;
  -webkit-text-fill-color: transparent;

  border: 6px dashed lighten(rgb(255, 165, 237), 50%);
  border-radius: 8px;

  font-size: 90px;
  text-align: center;
  line-height: 154px;
  max-height: 154px;
}
</style>
