# Virtual Meet

## Description

Virtual meet is a video conferencing app where people can talk with each other. With this app, 3D model can be displayed in augmented reality. Gestures can be used to control different functionalities. Screen sharing can be done for presenting content towards other users. Participant can use the chat feature for communication.

## Libraries Used

<ul>
  <li>Mediasoup(mediasoup-client)</li>
  <li>Tensorflow.js(@tensorflow/tfjs)</li>
  <li>Ar.js(@ar-js-org/ar.js)</li>
  <li>Socket.io</li>
  <li>Mediapipe(@mediapipe)</li>
  <li>Material UI (@mui(</li>
</ul>

### Mediapipe Hands

We use medaipipe hands library for web. The library was used to instantiate a
pre-trained model. Webcam video frames are taken from the browser. Each frame
obtained is passed to the model instance and a 21 point landmark is extracted
from it.
Gesture classification is done using the 21 point landmarks. On the basis of open
and close of a finger’s status, gesture is classified.

### Mediasoup

SFU is implemented using MediaSoup library in nodejs. This nodejs media server
allows us to create a multiparty video stream.
For now SFU is only hosted locally due to limitation of resource and budget.
Previously used heroku for deployment of peer-peer service does not support me-
dia servers and other services available in internet for deployment are not viable
for us, hence for now media server implementation is restricted to the local host

### AR.js

Threejs draws 3D environment on canvas. In order to get
relevant 3D information from a video either a dedicated hardware are required such
as in mobile devices or a mechanism needs to be in place to map 2D information
into 3D. We used marker based AR to map 3D space from video. By capturing
this 3D context from a monocular video stream, we are able to draw 3D objects
relative to the video stream on the canvas. Now by making the canvas background
transparent we are able to merge the canvas and video giving illusion of AR. This
process can be further refined by programmatically merging the web cam video
stream and canvas video stream. To achieve this we took the webcam video stream
and painted each frame on a canvas, then layered the canvas stream on top of it.
This new canvas was then used to produce a new stream with desired frames per
second. By doing this we generate a single AR integrated video stream to view
and transfer among peers. A dedicated button is used for turning AR on and off
on the video stream. We have linked the toggling of AR mode to a ”Start AR”
button so that user can turn on AR as required.

#### Model Loading

Loading of 3D model from Github
There are various formats to create and distribute 3D models. Fbx, blend, mtl
et are a few examples. However to transfer and load 3D models over the inter-
net glTF/GLB are the standard 3D format. GLB is a binary form of glTF that
includes textures instead of referencing them as external images. Thus providing
comfort of a single source for transmission. Threejs has support for loading scenes
and models from various formats. GLTFLoader provides simple methods to load
glTF/GLB file formats from any URI source.
33
For this project’s demonstration, we pull freely availabe models from threejs repos-
itories’ model examples.
(https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf)

#### Addition of User Control

User interaction with the AR model makes AR fun to use. Currently we listen to
the keyboard buttons being pressed and when certain keys are pressed we perform
respective mapped functions. The following functions are currently mapped to
AR model
• Rotation with 90 degree increment/decrement on X axis - ’a’ & ’d’ (Lower-
cases)
• Rotation with 90 degree increment/decrement on Y axis- ’w’ & ’s’ (Lower-
cases)
• Scaling by factor of 0.01 - ’W’ & ’S’ (Uppercases)
• Reset Rotation - ’D’ (Uppercases)
• Reset Scaling - ’A’ (Uppercases)
We have also implemented a select input that lists the available models from
threejs glTF model examples. When user selects a model, it is downloaded and
replaces the current model on the screen. By default, a cube is loaded.

### Images

<img src="https://github.com/Project-Own/video_conference_front/blob/main/public/Gesture_Dark_1.png" width="400px" height="100%"/>

<img src="https://github.com/Project-Own/video_conference_front/blob/main/public/Gesture_Dark_2.png" width="400px" height="100%"/>

<img src="https://github.com/Project-Own/video_conference_front/blob/main/public/AR_edit.png" width="400px" height="100%"/>

<img src="https://github.com/Project-Own/video_conference_front/blob/main/public/AR_paper_edit.png" width="400px" height="100%"/>
