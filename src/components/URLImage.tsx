import { ImageConfig } from 'konva/lib/shapes/Image';
import Konva from 'konva';
import { Image } from 'konva/lib/shapes/Image';
import React from 'react';
import { Image as KonvaImage } from 'react-konva';

// Based on: https://github.com/konvajs/react-konva/issues/362
export interface IURLImageProps extends Omit<ImageConfig, 'image'> {
  src: string;
  x: number;
  y: number;
  red?: number,
  green?: number,
  blue?: number,
  // imageNode: string;
}

export interface IURLImageStates {
  imageNode: Image | undefined;
  image: HTMLImageElement | undefined;
}

class URLImage extends React.Component<IURLImageProps, IURLImageStates> {
  public static defaultProps = {};

  constructor(props: IURLImageProps) {
    super(props);
    this.state = {
      imageNode: undefined,
      image: undefined,
    };
  }

  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps: IURLImageProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
      this.applyFilter();
    }
    if (oldProps.red !== this.props.red ||
      oldProps.green !== this.props.green ||
      oldProps.blue !== this.props.blue
    ) {
      this.applyFilter();
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

  /*
  if (!isBunker && mapItem.teamId !== 'NONE') {
    imageNode.cache();
    imageNode.filters([Konva.Filters.RGB]);
    konvaFactionTint(imageNode, mapItem.teamId);
     >> {
        imageNode.red(parseFloat(factionRGB.r));
        imageNode.green(parseFloat(factionRGB.g));
        imageNode.blue(parseFloat(factionRGB.b));}
      }
  
  */
  applyFilter() {
    const {
      red,
      green,
      blue,
    } = this.props;

    if (red == undefined || green == undefined || blue == undefined) {
      return;
    }

    if (this.state.imageNode) {
      // const [red, green, blue, alpha] = color.rgba();

      this.state.imageNode.cache();
      this.state.imageNode.setAttrs({
        red,
        green,
        blue,
        // alpha: this.state.imageNode.alpha,
      });
    }
  }

  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.state.image
    });
    this.applyFilter();
    // if you keep same image object during source updates
    // you will have to update layer manually:
    //  this.props.imageNode.getLayer().batchDraw();
  };

  render() {
    return (
      <KonvaImage
        ref={node => {
          if (this.state.imageNode == undefined && node instanceof Image) {
            this.setState({ imageNode: node });
          }
        }}
        filters={[Konva.Filters.RGB]}
        {...this.props}
        image={this.state.image as CanvasImageSource}
        alt={this.props.alt ?? ''}
      />
    );
  }
}

export default URLImage;
