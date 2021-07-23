// import * as tf from '@tensorflow/tfjs'
// import mobilenet from '@tensorflow-models/mobilenet'
// // import * as tfnode from '@tensorflow/tfjs-node'
// import fs from 'fs'

// const readImage = (path) => {
//   const imageBuffer = fs.readFile(path);
//   const tfimage = tf.decodeImage()
//   // const tfimage = tf.node.decodeImage(imageBuffer);
//   return tfimage;
// };

// const imgClassifier = async (req, res, next) => {
//   if(req.file.path) {
//     const image = readImage(req.file.path);
//     const mobilenetModel = await mobilenet.load();
//     const predictions = await mobilenetModel.classify(image);
//     console.log('Classification Results:', predictions);
//     next()
//   } else {
//     next()
//   }
// }

// export default imgClassifier

import * as tf from '@tensorflow/tfjs'
import {} from '@tensorflow/tfjs-backend-wasm'
import * as blazeface from '@tensorflow-models/blazeface'

const imgClassifier = async (req, res, next) => {
  tf.setBackend('wasm');
  await tf.ready();
  const model = await blazeface.load();
  const returnTensors = false;
  const predictions = await model.estimateFaces(req.file, returnTensors);
  console.log(predictions);
  if (predictions.length > 0) {
    res.status(406).json({ faceDetected: 'Face(s) found in the image.' });
  } else {
    console.log('no face detected');
    next();
  }
  // next()
}; 

export default imgClassifier;