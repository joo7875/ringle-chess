import React, { Component } from 'react';
import { clone } from 'underscore';
import $ from 'jquery';

const eleBb = {
  top: 100,
  left: 100,
  right: 100,
  bottom: 100
}

class Test extends Component {

  componentDidMount() {
    // var array1 =  [{a:{b:{c:1}}},{b:{c:{a:2}}},{c:{a:{b:3}}}];
    // var array2 = clone(array1);
    // console.log(array1 === array2);
    // console.log(array1[0] === array2[0]);

    this.getBoundingBoxFor(1);
  }

  getBoundingBoxFor(selector) {

    let bBox;

    // let bBox = {
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   bottom: 0
    // };

    $(selector).each(() => {

      if (bBox === undefined) {
        // bBox = clone(eleBb);
        bBox = { ...eleBb };
      }

      console.log(bBox === eleBb);
      console.log(bBox[0] === eleBb[0]);

      bBox.top = Math.min(bBox.top, eleBb.top);
      bBox.left = Math.min(bBox.left, eleBb.left);
      bBox.right = Math.max(bBox.right, eleBb.right);
      bBox.bottom = Math.max(bBox.bottom, eleBb.bottom);

    });

    bBox.width = bBox.right - bBox.left;
    bBox.height = bBox.bottom - bBox.top;

    console.log(bBox);

  }

  render() {
    return (
      <div>App</div>
    );
  }


}

export default Test;

