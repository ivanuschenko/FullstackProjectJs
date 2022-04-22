let allTask = [];
let shopName = '';
let shopCost;
let total = 0;
const url = 'http://localhost:8000';

window.onload = init = async() => {
  inputName = document.getElementById('where');
  inputCost = document.getElementById('how');
  inputName.addEventListener('change', updateValueName);
  inputCost.addEventListener('change', updateValueCost);
  const resp = await fetch(`${url}/allAcc`, {
    method: 'GET'
  }); 
  let result = await resp.json();
  allTask = result
  render();    
}
const onClickButton = async () => {     
  const resp = await fetch(`${url}/CreateAcc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }, body: JSON.stringify( {
      name: shopName,
      date: new Date(),
      cost: Number(shopCost)   
    })
  });
  let result = await resp.json();  
  allTask = result;
  shopName = '';
  shopCost = '';  
  render();  
} 

const updateValueName = (event) => {
  shopName = event.target.value;   
}
const updateValueCost = (event) => {
  shopCost = event.target.value;
}
const DateTransform = (date) => {  
  let result = date.substr(8, 2) + '.' + date.substr(5, 2) + '.' + date.substr(0, 4);  
  return result; 
}

const render = () => {
  const content = document.getElementById('value-container');
  const total = document.getElementById('total');  
  while(content.firstChild) {                       //избегает повторяющегося элемента
    content.removeChild(content.firstChild);
  };
  while(total.firstChild) {                       //избегает повторяющегося элемента
    total.removeChild(total.firstChild);
  };  

  const totalPrice = document.createElement('p');
  totalPrice.innerText = `Итого: ${allTask.map(object => object.cost).reduce((p, c) => p + c)} p.`;
  totalPrice.className = 'total';  
   total.appendChild(totalPrice);

  allTask.map((item, index) => {     
    const {name, cost, date, _id} = item;    
    const container = document.createElement('div');
    container.className = 'expenses';
    container.id = `accounting-${_id})`;
    content.appendChild(container);  
    const whereWasted = document.createElement('p')
    whereWasted.innerText = `${index+1}) ${name}`;
    whereWasted.className = 'whereWasted';
    whereWasted.id = `whereWasted-${_id}`;
    container.appendChild(whereWasted);
    const dataWasted = document.createElement('p');
    dataWasted.innerText = DateTransform(date);
    dataWasted.className = 'dataWasted';
    dataWasted.id = `wasted-${_id}`;
    container.appendChild(dataWasted);
    const howMuchWasted = document.createElement('p');
    howMuchWasted.innerText = `${cost} p.`;
    howMuchWasted.id = `costName-${_id}`;
    howMuchWasted.className = 'howMuchWasted';
    container.appendChild(howMuchWasted);
    const editImg = document.createElement('img');
    editImg.className = 'icons';
    editImg.id = 'edit'  
    editImg.src = 'img/edit.png';
    editImg.onclick = () => editText(container, item, _id);
    container.appendChild(editImg);
    const deleteImg = document.createElement('img');
    deleteImg.className = 'icons';
    deleteImg.src = 'img/delete.png';
    deleteImg.onclick = () => DeleteTask(_id);
    container.appendChild(deleteImg);  
  })    

  const DeleteTask = async (_id) => { 
    const resp = await fetch(`${url}/deleteAcc/?_id=${_id}`, {
      method: 'DELETE', 
    });   
    const result = await resp.json();
    allTask = result;
    render();
  };
  
  const editText = (container, item, index) => {
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    };
    const {name, cost, date} = item;
    const inputText = document.createElement('input');
    container.appendChild(inputText);
    inputText.value = name;
    inputText.className = 'inputText'; 
    const inputData = document.createElement('input');
    container.appendChild(inputData);
    inputData.value = date;
    inputData.className = 'inputData';
    const inputCost = document.createElement('input');
    container.appendChild(inputCost);
    inputCost.value = cost;
    inputCost.className = 'inputCost'; 
    const cancelImg = document.createElement('img');
    cancelImg.src = 'img/decline.png';
    cancelImg.className = 'icons';
    cancelImg.id = 'cancelImg';
    cancelImg.onclick = () => cancel();
    container.appendChild(cancelImg);
    const saveImg = document.createElement('img');
    saveImg.src = 'img/okey.png';
    saveImg.className = 'icons';
    saveImg.id = 'saveImg';
    saveImg.onclick = () => changeValue(index, inputText.value, inputData.value, inputCost.value);
    container.appendChild(saveImg);
  };
  const changeValue = async(index, text, date, cost) => {     
    const resp = await fetch(`${url}/updateAcc`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',        
      }, body: JSON.stringify( {
        _id: index,            
        name: text,
        date: date,
        cost: cost               
      })    
    });
    const result = await resp.json(); 
    allTask = result;
    render();
  };
  const cancel = () => {
    render();
  };
};