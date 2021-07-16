import * as tf from '@tensorflow/tfjs'
import mobilenet from '@tensorflow-models/mobilenet'
import * as tfnode from '@tensorflow/tfjs-node'
import fs from 'fs'

const readImage = (path) => {
  const imageBuffer = fs.readFile(path);
  const tfimage = tfnode.node.decodeImage(imageBuffer);
  return tfimage;
};

const imgClassifier = async (req, res, next) => {
  if(req.file.path) {
    const image = readImage(req.file.path);
    const mobilenetModel = await mobilenet.load();
    const predictions = await mobilenetModel.classify(image);
    console.log('Classification Results:', predictions);
    next()
  } else {
    next()
  }
}

export default imgClassifier
