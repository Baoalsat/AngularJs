(function () {
    'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .provider('ShoppingListCheckOffService', ShoppingListCheckOffServiceProvider)
 
  .config(Config);

  Config.$inject = ['ShoppingListCheckOffServiceProvider'];
  function Config(ShoppingListCheckOffServiceProvider){
    ShoppingListCheckOffServiceProvider.defaults.maxItems= 4;
    ShoppingListCheckOffServiceProvider.defaults.cartDefault = 0;
    ShoppingListCheckOffServiceProvider.defaults.message = "Wanna buy some?";
    
  }
 //ng-controller
ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService){
  var list = this;
  list.items = ShoppingListCheckOffService.getItems();
  list.itemName = "";
  list.itemQuantity= "";
  list.getMessage= function(){ 
  return ShoppingListCheckOffService.getMessage()};
  list.addItem = function(){
    try{ 
      ShoppingListCheckOffService.addItem(list.itemName, list.itemQuantity);
      list.errorMessage = "";
  }
  catch (error){
    list.errorMessage = error.message;
  }
}

list.removeItem = function (itemIndex){
  ShoppingListCheckOffService.removeItem(itemIndex);
 }
 list.ToBuy = function(itemIndex){
  try{
  ShoppingListCheckOffService.ToBuy(itemIndex);
  }
  catch(error){
    list.errorMessage = error.message;
  }
 }
}

AlreadyBoughtController.$inject= ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBought();
    

 
}

//service
function ShoppingListCheckOffService(maxItems,cartDefault,DefaultMessage){
  var service = this;
  var items = [] ;
  var cart = [];
  var message = DefaultMessage;
  service.cartDefault= cartDefault;
  service.addItem= function(itemName,quantity){
    if((maxItems === undefined)||
        (maxItems !== undefined)&&(items.length <= maxItems)){
          var item = {
            name: itemName,
            quantity: quantity
          };
          if (!item.name || !item.quantity) {
  throw new Error("Name and quantity are required.");
}
          else{
            items.push(item);
          }
        }
        else{
          throw new Error("Max items (" + (maxItems + 1) + ") reached.");
        }
  };
  service.removeItem = function(itemIndex) {
    items.splice(itemIndex,1);
  } 
  service.getItems= function(){
    return items;
  }
  service.ToBuy = function(itemIndex){
    
    if((itemIndex >= 0) && (itemIndex < items.length)){
      var buffer = items.splice(itemIndex,1)[0];
      cart.push(buffer);
      return cart;
    }
    else 
    { throw new Error ("Your cart is empty! >< ")}
  }
  service.getBought= function(){
    return cart;
  }
  service.getMessage = function(){
      if(items.length <= 0 && cart.length == 5){
      return "Damn, you buy all thing out of here, still need more?";
    }
    if(items.length <= 0){
      return message;
    }
    if(items.length == 5){
      cartDefault = items.length;
      return "Maximum quantity of goods!";
    }
    else{
      cartDefault = items.length;
      return "";
    }
  }
 
 
}


//provider
function ShoppingListCheckOffServiceProvider(){
  var provider = this;

  provider.defaults = {
    maxItems: 10,
    cartDefault: 0,
    message: "wanna buy some?"
  };
 
  provider.$get =function() {
    var ShoppingList = new ShoppingListCheckOffService(provider.defaults.maxItems,provider.defaults.cartDefault,provider.defaults.message);
    return ShoppingList;
  };
}

})();
