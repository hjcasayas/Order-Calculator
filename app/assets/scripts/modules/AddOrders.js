import $ from 'jquery';

class AddOrders {

// Constructor
  constructor() {
    this.addOrderIcon = $('.add-orders__icon');
    this.orders = [];
    this.events();
  }
  
  // Events
  events() {
    this.addOrderIcon.click(this.addOneOrder);
  }

  // Functions
  
  addOneOrder() {
    let addOne = parseInt($(this).attr('data-one'));
    let ordersList = $('.orders-list');    
    let currentNumberOfOrders = $(this)
      .closest('.add-orders__buttons')
      .find('.add-orders__number-of-orders');
    let numberOfOrders = parseInt(currentNumberOfOrders.html());
    let nextNumberOfOrders = addOne + numberOfOrders;
    let menuName = $(this).closest('.menu__info').find('.menu__name').text();
    let menuPrice = $(this).closest('.menu__info').find('.menu__price').text();
    
    if(nextNumberOfOrders<0) {
      currentNumberOfOrders.html(0);
      nextNumberOfOrders = 0;
    } else {
      currentNumberOfOrders.html(nextNumberOfOrders);

      let orders = [];
      let orderNames = document.getElementsByClassName('order__name');
      let orderPrices = document.getElementsByClassName('order__price');
      let orderQuantity = document.getElementsByClassName('order__quantity');
      
      for (let x = 0; x < orderNames.length; x++) {
        let name = orderNames[x].textContent;
        let price = orderPrices[x].textContent;
        let quantity = orderQuantity[x].textContent;
        let currentOrder = {name: name, price: price, quantity: quantity};
        orders.push(currentOrder);
      }
      
      let orderPrice = nextNumberOfOrders*parseInt(menuPrice);
      let currentOrder = {name: menuName, price: orderPrice, quantity: nextNumberOfOrders};
      let orderExist = false;
      
      for (let order of orders) {
        if(currentOrder.name == order.name) {
          order.quantity = currentOrder.quantity;
          order.price = currentOrder.price;
          orderExist = true;
          break;
        }
      }
      
      let orderIndex = orders.findIndex(item => item.quantity == 0);
      if (!(orderIndex < 0)) {
        orders.splice(orderIndex, 1);
      }

      if (!orderExist) {
        orders.push(currentOrder);
        ordersList.append(`<li class="order"><span class="order__name">${currentOrder.name}</span> (<span class="order__quantity">${currentOrder.quantity}</span>) - <span class="order__price">${currentOrder.price}</span> Pesos</li>`);
      } else {
        ordersList.empty();
        for (let order of orders) {
          ordersList.append(`<li class="order"><span class="order__name">${order.name}</span> (<span class="order__quantity">${order.quantity}</span>) - <span class="order__price">${order.price}</span> Pesos</li>`);
        }      
      }
    }

  }

}

export default AddOrders;