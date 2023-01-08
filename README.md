# FoleyGen: Automatic Sound Effects Addition to Videos



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

To Run this app:

### `npm install`

installs node modules 

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Object Detection

We have used yoloV7 model of https://github.com/WongKinYiu/yolov7
@article{wang2022yolov7,
  title={{YOLOv7}: Trainable bag-of-freebies sets new state-of-the-art for real-time object detectors},
  author={Wang, Chien-Yao and Bochkovskiy, Alexey and Liao, Hong-Yuan Mark},
  journal={arXiv preprint arXiv:2207.02696},
  year={2022}
}

It is trained on MS-COCO dataset and detects objects in both pictures and videos.

## Action Recognition

A folder by the name of action recognition contains the implementation of action recognition 
It contains Main.py and Testing.ipynb
Testing.ipynb is used to make a model using videos of humans performing some actions
Main.py is used to classify new videos with the trained model

