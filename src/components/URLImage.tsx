import { ImageConfig } from 'konva/lib/shapes/Image';
import React from 'react';
import { Image } from 'react-konva';

// Based on: https://github.com/konvajs/react-konva/issues/362
export interface IURLImageProps extends Omit<ImageConfig, 'image'> {
  src: string;
  x: number;
  y: number;
  // imageNode: string;
}

export interface IURLImageStates {
  image: HTMLImageElement | null;
}

class URLImage extends React.Component<IURLImageProps, IURLImageStates> {
  public static defaultProps = {
    y: null,
    // imageNode: null
  };

  constructor(props: IURLImageProps) {
    super(props);
    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps: IURLImageProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    if (this.state.image) {
      this.state.image.removeEventListener('load', this.handleLoad);
    }
  }

  loadImage() {
    // save to "this" to remove "load" handler on unmount
    const image = new window.Image();
    image.src = this.props.src;
    image.addEventListener('load', this.handleLoad);
    this.setState({ image });
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.state.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    //  this.props.imageNode.getLayer().batchDraw();
  };

  render() {
    return (
      <Image
        {...this.props}
        image={this.state.image as CanvasImageSource}
        alt={this.props.alt ?? ''}
      />
    );
  }
}

export default URLImage;
