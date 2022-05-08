import React from 'react';
import './Carousel.scss';

type State = {
  position: number;
};

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

class Carousel extends React.Component < Props, State > {
  state = {
    position: 0,
  };

  clickNext = () => {
    const { position } = this.state;
    const {
      infinite,
      images,
      itemWidth,
      step,
      frameSize,
    } = this.props;

    const stepWidth = itemWidth * step;
    const maxRight = (images.length * -itemWidth) + (itemWidth * frameSize);
    const currentLeft = ((position - stepWidth) < maxRight)
      ? maxRight
      : position - stepWidth;

    this.setState({
      position: (position === maxRight && infinite)
        ? 0
        : currentLeft,
    });
  };

  clickPrev = () => {
    const { position } = this.state;
    const {
      infinite,
      images,
      itemWidth,
      step,
      frameSize,
    } = this.props;

    const maxRight = (images.length * -itemWidth) + (itemWidth * frameSize);
    const stepWidth = itemWidth * step;
    const currentLeft = ((position + stepWidth) > 0)
      ? 0
      : position + stepWidth;

    this.setState({
      position: (position === 0 && infinite)
        ? maxRight
        : currentLeft,
    });
  };

  render() {
    const {
      position,
    } = this.state;

    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    return (
      <div className="carousel">
        <div
          className="carousel__wraper"
          style={{
            width: `${frameSize * itemWidth}px`,
            height: `${itemWidth}px`,
          }}
        >
          <ul
            className="carousel__list"
            style={{
              left: `${position}px`,
              transition: `${animationDuration}ms`,
            }}
          >
            {
              images.map((image, i) => {
                return (
                  <li
                    key={image}
                    className="carousel__item"
                    style={{
                      width: `${itemWidth}px`,
                      height: `${itemWidth}px`,
                    }}
                  >
                    <img
                      src={image}
                      alt={`${i + 1}`}
                    />
                  </li>
                );
              })
            }
          </ul>
        </div>

        <div className="carousel__buttons">
          <button
            className="carousel__button"
            type="button"
            onClick={this.clickPrev}
          >
            Prev
          </button>

          <button
            className="carousel__button"
            type="button"
            onClick={this.clickNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default Carousel;
