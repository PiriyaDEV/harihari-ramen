import React, { Component } from 'react'
import LottieAnimation from './Lottie';
import home from './loading.json';

export default class Loading extends Component {
  render() {
    return (
      <div>
        <LottieAnimation lotti={home} height={300} width={300} />
      </div>
    )
  }
}
