const posedetection = require('@tensorflow-models/pose-detection');
const {poseSimilarity} = require('posenet-similarity')
const promisify = require('util').promisify
const posenetmodel = posedetection.SupportedModels.PoseNet
const tf = require('@tensorflow/tfjs-node')
const PNG = require('pngjs').PNG
const ImageData = require('@canvas/image-data')
const fs = require('fs')
const image = require('get-image-data')

const vdoController = async (req,res) => {
    try{
        const {vdo} = req.body
        tf.setBackend('tensorflow'); // < required for decodeImage


        console.log(process.cwd())
        
/*
        const imageData1 = await promisify(fs.readFile)('./img/cv1.png');
        const pose1 = await tf.node.decodeImage(imageData1, 3);
        const imageData2 = await promisify(fs.readFile)('./img/cv2.png');
        const pose2 = await tf.node.decodeImage(imageData2, 3);*/

        tf.setBackend('cpu');


        const detectorConfig = {
            architecture: 'ResNet50',
            outputStride: 16,
            inputResolution: { width: 257, height: 200 },
            quantBytes: 2
            };
        const detector = await posedetection.createDetector(posenetmodel, detectorConfig)
        const img1 = await image('./img/cv1.png')
        const img2 = await image('./img/cv2.png')
        
        Promise.all([img1, img2]).then(infos => {
            async () => {
                const estpose1 = await detector.estimatePoses({data:new Uint8Array(infos[0].data), width:infos[0].width, height:infos[0].height})
                const estpose2 = await detector.estimatePoses({data:new Uint8Array(infos[1].data), width:infos[1].width, height:infos[1].height})
                Promise.all([estpose1, estpose2]).then(poses => {
                    const weightedDistance = poseSimilarity(poses[0], poses[1]);
                    console.log(weightedDistance)
                    return res.status(201).send({
                        success:true,
                        message: weightedDistance
                    })
                })
            
            
            
            }
        })


        

        /*
        tf.ready().then(_ => {
            // Calculate the weighted distance between the two poses
            


            
        })
        */
    }catch(error){
        console.log(error)
    }
}

module.exports = {vdoController};