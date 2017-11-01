import React, {Component} from "react";
import "../css/imageFigure.css";

/**
 * props:
 *    title
 *    desc
 *    imageUrl
 */
class ImageFigure extends Component {

  getScrollRect() {
    return {"scrollWidth": this.figure.scrollWidth, "scrollHeight": this.figure.scrollHeight};
  }

  render() {
    let style;
    // if(typeof this.props.pos === "object"){
      style= this.props.pos.position;
    // }
    // console.log(style);
    return (
      <figure className="image-figure" ref={(figure) => this.figure = figure} style={style} >
        <img src={this.props.imageUrl} alt={this.props.title}/>
        <figcaption>
          <h2 className="image-title">{this.props.desc}</h2>
        </figcaption>
      </figure>
    );
  }
}

export default ImageFigure;