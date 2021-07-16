const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const tfnode = require('@tensorflow/tfjs-node-gpu');
const fs = require('fs');

const readImage = (path) => {
  const imageBuffer = fs.readFileSync(path);
  const tfimage = tfnode.node.decodeImage(imageBuffer);
  return tfimage;
};

exports.imgClassifier = async (req, res, next) => {
  const image = readImage(req.file.path);
  const mobilenetModel = await mobilenet.load();
  const predictions = await mobilenetModel.classify(image);
  console.log('Classification Results:', predictions);
  next()
}