// const tf = require('@tensorflow/tfjs-core')
// require('@tensorflow/tfjs-backend-wasm');
// const blazeface = require('@tensorflow-models/blazeface');

// exports.detectFace = async (req, res, next) => {
  
//   tf.setBackend('wasm')
//   await tf.ready()
//   const model = await blazeface.load();
//   const returnTensors = false;
//   const predictions = await model.estimateFaces(
//     req.file,
//     returnTensors
//   );
//   console.log(imgRef.current);
//   console.log(predictions)
//   if (predictions.length > 0) {
//     res.status(406).json({ faceDetected: "Face(s) found in the image."})
//   } else {
//     console.log('no face detected');
//     next()
//   }
// } 
