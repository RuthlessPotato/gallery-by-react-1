import React, {Component} from "react";
import logo from "./logo.svg";
import "./gallery.css";
// 导入组件
import ImageFigure from "./component/imageFigure";

// 导入图片数据并生成图片文件对象
import _imagesData from "./data/images";

const imagesData = (function (data) {
  for (var i = 0; i < data.length; i++) {
    let item = data[i];
    item.imageUrl = require(`./image/${item["fileName"]}`);
  }
  return data;
})(_imagesData);
// console.log(_imagesData);

function getRangeRandom(low, high) {
  return Math.ceil(Math.random()*(high - low) + low);
}

class Gallery extends Component {
  constructor(prop) {
    super(prop);
    // 初始化一些变量
    this.imagesDOM = [];
    // 图片摆放位置范围
    this.imagePositionRange = {
      "center": {
        "left": 0,
        "top": 0
      },
      "horizontal": {
        "leftXRange": [
          0, 0
        ],
        "rightXRange": [
          0, 0
        ],
        "Y": [0, 0]
      },
      "vertical": {
        "XRange": [
          0, 0
        ],
        "Y": [0, 0]
      }
    };

    let len = imagesData.length;
    var arr = new Array(len);
    for(var i =0; i < len ; i++){
      // arr.push({"position":{}});
      arr[i] = {"position":{}};
    }
    console.log("arr");
    console.log(arr);
    this.state={
      "imagePosDataArr": arr
    };
  }

  componentWillMount() {
  }
  // 组件挂载完成后初始化数据(图片摆放位置范围)
  componentDidMount() {
    // 获取舞台大小
    let stageWidth = this.stage.scrollWidth,
      stageHeight = this.stage.scrollHeight,
      halfStageWidth = Math.ceil(stageWidth / 2),
      halfStageHeight = Math.ceil(stageHeight / 2);

    // 获取每个imageFigure大小
    let imageFigureScrollRect = this
        .imagesDOM[0]
        .getScrollRect(),
      imageWidth = imageFigureScrollRect.scrollWidth,
      imageHeight = imageFigureScrollRect.scrollHeight,
      halfImageWidth = Math.ceil(imageWidth / 2),
      halfImageHeight = Math.ceil(imageHeight / 2);

    //
    this.imagePositionRange.center.left = halfStageWidth - halfImageWidth;
    this.imagePositionRange.center.top = halfStageHeight - halfImageHeight;
    this.imagePositionRange.horizontal.leftXRange[0] = -halfImageWidth;
    this.imagePositionRange.horizontal.leftXRange[1] = halfStageWidth - imageWidth * 3 / 2;
    this.imagePositionRange.horizontal.rightXRange[0] = halfStageWidth + halfImageWidth;
    this.imagePositionRange.horizontal.rightXRange[1] = stageWidth - halfImageWidth;
    this.imagePositionRange.horizontal.Y[0] = -halfImageHeight;
    this.imagePositionRange.horizontal.Y[1] = stageHeight - halfImageHeight;
    this.imagePositionRange.vertical.XRange[0] = halfStageWidth - imageWidth * 2;
    this.imagePositionRange.vertical.XRange[1] = halfStageWidth + imageWidth * 2;
    this.imagePositionRange.vertical.Y[0] = -halfImageHeight;
    this.imagePositionRange.vertical.Y[1] = halfStageHeight - imageHeight * 3 / 2;

    this.placeImage(0);
  }

  // 放置当前图片到舞台正中间
  placeImage(index) {
    // console.log(index);
    // 获取舞台图片位置状态信息
    // console.log(this.state.imagePosDataArr);
    let imagePosDataArr = [];
    // Object.assign(imagePosDataArr, this.state.imagePosDataArr);
    imagePosDataArr = this.state.imagePosDataArr;
    console.log(imagePosDataArr);
    console.log(this.state.imagePosDataArr);
    let centerImagePosDataArr = imagePosDataArr.splice(index, 1);
    // console.log(centerImagePosDataArr);
    // this.imagesDOM[index].style = centerImagePosDataArr[0].position
    // 为居中图片确定摆放位置的状态值
    centerImagePosDataArr[0].position = this.imagePositionRange.center;
    // centerImagePosDataArr[0].position = {
    //   "left": 1,
    //   "top": 1
    // };
    // 存放在上侧的图片的位置数据 及 图片个数(0/1)
    let topImgNumber = Math.floor(Math.random() * 2);
    // console.log("topImgNumber =", topImgNumber);
    // 随机一个摆放在上侧的图片索引
    let topImageIndex = Math.ceil(Math.random() * (imagePosDataArr.length - topImgNumber));
    // console.log("topImageIndex =" , topImageIndex);
    let topImagePosDataArr = imagePosDataArr.splice(topImageIndex, topImgNumber);
    // 为上侧图片确定摆放位置的状态值
    topImagePosDataArr.forEach((element, index) => {
      let left = getRangeRandom(this.imagePositionRange.vertical.XRange[0], this.imagePositionRange.vertical.XRange[1]);
      let top = getRangeRandom(this.imagePositionRange.vertical.Y[0], this.imagePositionRange.vertical.Y[1]);
      console.log(`left = ${left} , top = ${top}`);
      element.position = {
        "left": left,
        "top": top
      };
    });
    // 为左侧和右侧图片确定摆放位置的状态值
    for (let i = 0, j = imagePosDataArr.length, k = j / 2; i < j; i++) {
      let XRange = null;
      if (i < k) {
        // 左侧
        XRange = this.imagePositionRange.horizontal.leftXRange
      } else {
        // 右侧
        XRange = this.imagePositionRange.horizontal.rightXRange;
      }
      let _left =  getRangeRandom(XRange[0], XRange[1]);
      let _top = getRangeRandom(this.imagePositionRange.horizontal.Y[0], this.imagePositionRange.horizontal.Y[1]);
      // console.log("left and right pics");
      // console.log(`left = ${_left} , top = ${_top}`);
      imagePosDataArr[i].position = {
        "left": _left,
        "top": _top
      }
    }
    // console.log(this.state.imagePosDataArr);
    // 将上侧和居中的图片摆放位置状态数据重新插入到状态数组中
    imagePosDataArr.splice(index,0,centerImagePosDataArr);
    imagePosDataArr.splice(topImageIndex,0,topImagePosDataArr);
    console.log(this.state.imagePosDataArr);
    this.setState({
      "imagePosDataArr": imagePosDataArr
    })
  }

  render() {
    this.imageFigureList = [];
    imagesData.forEach((element, index)=>{
      let pos = this.state.imagePosDataArr[index];
      this.imageFigureList.push(<ImageFigure {...element} key={index} ref={(image) => this.imagesDOM[index] = image} pos={pos}/>);
    });
    return (
      <section className="stage" ref={(stage) => this.stage = stage}>
        <section className="image-section">
          {this.imageFigureList}
        </section>
        <nav className="controller-nav"></nav>
      </section>
    );
  }
}

export default Gallery;
