import React, { Component } from 'react';
import { clone } from 'underscore';
import $ from 'jquery';

class Test extends Component {

  componentDidMount() {
    // var array1 =  [{a:{b:{c:1}}},{b:{c:{a:2}}},{c:{a:{b:3}}}];
    // var array2 = clone(array1);
    // console.log(array1 === array2);
    // console.log(array1[0] === array2[0]);

    const result = this.getBoundingBoxFor('.test-element');

    console.log(result);
  }

  getBoundingBoxFor(selector) {
    let bBox;
    
    $(selector).each(function () {
      const eleBb = this.getBoundingClientRect();

      if (bBox === undefined) {
        bBox = JSON.parse(JSON.stringify(eleBb));
      }
      
      bBox.top = Math.min(bBox.top, eleBb.top);
      bBox.left = Math.min(bBox.left, eleBb.left);
      bBox.right = Math.max(bBox.right, eleBb.right);
      bBox.bottom = Math.max(bBox.bottom, eleBb.bottom);
    });
    
    bBox.width = bBox.right - bBox.left;
    bBox.height = bBox.bottom - bBox.top;
    
    return bBox;
  }

    
  render() {
    return (
      <div className='test-element'>App</div>
    );
  }


}

export default Test;
