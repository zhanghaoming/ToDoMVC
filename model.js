window.model = {
  data: {
    items: [
      // {msg:'', completed: false}
    ],
    msg: '',
    selector:'all'
  },
  TOKEN: 'ZHM',

  init: function(){
  	var model=window.model;
  	var storage = window.localStorage;
  	var data = storage.getItem(model.TOKEN);
  	try {
  		if (data) model.data = JSON.parse(data);
      model.data.selector='all';
  	}
  	catch (e) {
  		console.error(e);
  	}
  },

  flush: function(){
  	var model=window.model;
  	var storage = window.localStorage;
  	storage.setItem(model.TOKEN,JSON.stringify(model.data));
  	//console.log(this.data);
  }
};