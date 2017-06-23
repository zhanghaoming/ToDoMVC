function $(id){
	return document.getElementById(id);
}

var amountActive=0;

const isCompleted='completed';

function updateListCount()
{
	$('count').innerHTML=amountActive+" items left";
}

window.onload=function(){
	model.init();
	var data=window.model.data;
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

	$('allPick').addEventListener('ontouchstart',function() {
        $('allPick').style.borderColor = "green";
    });

    $('allPick').addEventListener('ontouchend',function() {
       $('allPick').style.borderColor = "white";
    });

    $('allPick').addEventListener('click',function(){
    	if(data.selector=='all'||data.selector=='uncompleted')
    	{
    		var isAllCompleted=true;
    		for(var i=0;i<data.items.length;i++){
				 if(!data.items[i].completed)
				 {
				 	isAllCompleted=false;
				 	break;
				 }
			}
    		data.items.forEach(function(item, index) {
    			item.completed=!isAllCompleted;
    		});
    	}
    	else//删除所有已完成
    	{
    		for(var i=0;i<data.items.length;)
    		{
    			if(data.items[i].completed)
    				data.items.splice(i,1)
    			else
    				i++;
    		}
    	}
    	updateList();
    });
	updateList();
}

function updateList()
{
	var data=window.model.data;
	amountActive=0;
	var list=$('list');
	if(data.msg!=''){
		data.items.push({msg: data.msg, completed: false});
		data.msg='';
	}
	model.flush();
	console.log(data.selector);
	if(data.selector=='all')
	{
		$('allPick').style.backgroundImage='url("v.png")'
		$('all').style.backgroundColor='rgba(0,0,0,0.2)';
		$('completed').style.backgroundColor='white';
		$('active').style.backgroundColor='white';
	}
	if(data.selector=='completed')
	{
		$('allPick').style.backgroundImage='url("delete.png")'
		$('all').style.backgroundColor='white';
		$('completed').style.backgroundColor='rgba(0,0,0,0.2)';
		$('active').style.backgroundColor='white';
	}
	if(data.selector=='uncompleted'){
		$('allPick').style.backgroundImage='url("v.png")'
		$('all').style.backgroundColor='white';
		$('completed').style.backgroundColor='white';
		$('active').style.backgroundColor='rgba(0,0,0,0.2)';
	}

	list.innerHTML='';
	data.items.forEach(function(item, index) {
		if(data.selector=='all'||(data.selector=='completed'&&item.completed)||(data.selector=='uncompleted'&&!item.completed)
			){
			amountActive++;
			var node=document.createElement('div');
			node.innerHTML='<li><input type="checkbox" class="check"><p class="event">'+item.msg+'</p><button class="destroy">X</button></li>';
			node.classList.add('node');

			list.insertBefore(node, list.childNodes[0]);

			//绑定插入事件
			var edit=node.querySelector('li');
			edit.addEventListener('dblclick',function(){
				var editInput=document.createElement('input');
				var finished=false;

				editInput.setAttribute('type', 'text');
		        editInput.setAttribute('class', 'edit');
		        editInput.setAttribute('value', item.msg);
		        editInput.addEventListener('keyup',function(event){
		        	if (event.keyCode != 0xd) return;
		        	if(editInput.value!='')
		        	{
		        		item.msg=editInput.value;
		        		if(!finished){
		        			finished=true;
		        			edit.removeChild(editInput);
		        			console.log('edit');
		        		}
		        		updateList();
		        	}
		        })

		        editInput.addEventListener('blur', function() {
		        	if(finished) return;
		        	finished=true;
		        	edit.removeChild(editInput);
		        	console.log("blur");
		        });

		        edit.appendChild(editInput);
				editInput.classList.add('editInput');
				editInput.focus();
			});

			//手机端双击事件
			var countTouch = 0;
			edit.addEventListener('touchstart',function(){
				countTouch++;
		        setTimeout(function () {
		            countTouch = 0;
		        }, 500);
		        if (countTouch > 1) {
		            countTouch = 0;
				var editInput=document.createElement('input');
				var finished=false;

				editInput.setAttribute('type', 'text');
		        editInput.setAttribute('class', 'edit');
		        editInput.setAttribute('value', item.msg);
		        editInput.addEventListener('keyup',function(event){
		        	if (event.keyCode != 0xd) return;
		        	if(editInput.value!='')
		        	{
		        		item.msg=editInput.value;
		        		if(!finished){
		        			finished=true;
		        			edit.removeChild(editInput);
		        			console.log('edit');
		        		}
		        		updateList();
		        	}
		        })

		        editInput.addEventListener('blur', function() {
		        	if(finished) return;
		        	finished=true;
		        	edit.removeChild(editInput);
		        	console.log("blur");
		        });

		        edit.appendChild(editInput);
				editInput.classList.add('editInput');
				editInput.focus();
		        }
			});

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

