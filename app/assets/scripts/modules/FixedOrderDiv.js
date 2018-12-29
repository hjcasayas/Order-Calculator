import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class FixedOrderDiv {
  constructor() {
    this.addOrdersDiv = $(".orders__container");
    this.createWayPoints();
  }

  createWayPoints() {
    this.addOrdersDiv.each(function(){
      var theItem = this;
      new Waypoint({
        element: theItem,
        handler: function() {
          $(theItem).addClass('orders--fixed-div');
        }
      });
    });
  }

}

export default FixedOrderDiv;