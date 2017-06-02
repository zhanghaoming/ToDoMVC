function $(id){
	return document.getElementById(id);
}

/*var add=document.getElementById('add_btn');
add.addEventListener('click',addToDo,false);*/
var data=window.model.data;
var amountActive=0;

const isCompleted='completed';

function updateListCount()
{
	$('count').innerHTML=amountActive+" items left";
}

updateListCount();

window.onload=function(){
	$('todo').addEventListener('keyup', function(event) {
		if (event.keyCode != 0xd) return;
		data.msg=$('todo').value;
		//addToDo();
		updateList();
	}, false);

	$('all').addEventListener('click', function() {
		data.selector='all';
		updateList();
	}, false);

	$('completed').addEventListener('click', function() {
		data.selector='completed';
		updateList();
	}, false);

	$('active').addEventListener('click', function() {
		data.selector='uncompleted';
		updateList();
	}, false);
	updateList();
}

function updateList()
{
	amountActive=0;
	var list=$('list');
	if(data.msg!=''){
		data.items.push({msg: data.msg, completed: false});
		data.msg='';
	}
	list.innerHTML='';
	data.items.forEach(function(item, index) {
		if(!item.completed)
			amountActive++;
		if(data.selector=='all'||(data.selector=='completed'&&item.completed)||(data.selector=='uncompleted'&&!item.completed)
			){
			var node=document.createElement('div');
			node.innerHTML='<li><input type="checkbox" class="check"><p class="event">'+item.msg+'</p><button class="destroy">X</button></li>';

			node.classList.add('node');
			list.insertBefore(node, list.childNodes[0]);

			var itemCheck = node.querySelector('.check');
			itemCheck.checked = item.completed;
			itemCheck.addEventListener('change', function() {
				item.completed = !item.completed;
				updateList();
			}, false);

			var itemDestroy=node.querySelector('.destroy');
			itemDestroy.addEventListener('click',function(){
				data.items.splice(index, 1);
        		updateList();
			})

			if(item.completed)
				node.getElementsByClassName('event')[0].setAttribute('style','text-decoration:line-through');
		}
		todo.value='';
	},false);
	updateListCount();

}


/*function addToDo()
{
	var todo=$('todo');
	var list=$('list');

	if(data.msg==''){
		console.warn('msg is null');
		return ;
	}

	console.log(data.msg);
	amountActive++;
	var item=document.createElement('div');
	item.innerHTML=todo.value;
	item.classList.add('node');
	list.insertBefore(item, list.childNodes[0]);
	var item_btn=document.createElement('div');
	item.appendChild(item_btn);

	item_btn.innerHTML='close';
	item_btn.classList.add('node_btn');
	item_btn.addEventListener('click',function(){
		list.removeChild(item);
		if(item.classList.contains(isCompleted))	{
			amountActive--;
		}
		updateListCount();
	})

	item.addEventListener('click',function(){
		if(item.classList.contains(isCompleted))	{
			amountActive++;
			item.classList.remove(isCompleted);
		}
		else{
			amountActive--;
			item.classList.add(isCompleted);
		}
		updateListCount();
	})
	todo.value='';
	updateListCount();
}*/

