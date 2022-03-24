let allExpense = [];
let shopName = '';
let shopCost = '';
let total = 0;
const url = 'http://localhost:8000';

window.onload = init = async() => {  
  const inputName = document.getElementById('place');
  const inputCost = document.getElementById('cost');
  inputName.addEventListener('change', updateValueName);
  inputCost.addEventListener('change', updateValueCost);
  const resp = await fetch(`${url}/allExp`, {
    method: 'GET'
  }); 
  let result = await resp.json();
  allExpense = result;
  render();    
}

const onClickButton = async () => {     
  const resp = await fetch(`${url}/CreateExp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }, body: JSON.stringify({
      place: shopName,
      date: new Date(),
      cost: Number(shopCost)   
    })
  });
  const result = await resp.json();   
  allExpense.push(result);
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
const dateTransform = (date) => {  
  let result = date.substr(8, 2) + '.' + date.substr(5, 2) + '.' + date.substr(0, 4);  
  return result; 
}

const render = () => {
  const content = document.getElementById('value-container');
   
  while(content.firstChild) {                       //избегает повторяющегося элемента
    content.removeChild(content.firstChild);
  }; 
  const total = document.getElementById('box-total')
    total.innerText = allExpense
    .map((item) => item.cost)
    .reduce((sum, current) => {
      return sum + current;
    }, 0);
    
  allExpense.map((item, index) => {
    const {_id, place, cost, date} = item;
    const id = _id;    
    const container = document.createElement('div');
    container.className = 'expenses';
    container.id = `accounting-${id}`;    ;
    content.appendChild(container);  
    const placeValue = document.createElement('p')
    placeValue.innerText = `${index+1}) ${place}`;
    placeValue.className = 'placeValue';
    placeValue.id = `placeValue-${id}`;
    container.appendChild(placeValue);
    const dataValue = document.createElement('p');
    dataValue.innerText = dateTransform(date);
    dataValue.className = 'dataValue';
    dataValue.id = `wasted-${id}`;
    container.appendChild(dataValue);
    const costValue = document.createElement('p');
    costValue.innerText = `${cost} p.`;
    costValue.id = `costName-${id}`;
    costValue.className = 'costValue';
    container.appendChild(costValue);
    const editImg = document.createElement('img');
    editImg.className = 'icons';
    editImg.id = 'edit'  
    editImg.src = 'img/edit.png';
    editImg.onclick = () => editText(container, item, id);
    container.appendChild(editImg);
    const deleteImg = document.createElement('img');
    deleteImg.className = 'icons';
    deleteImg.src = 'img/delete.png';
    deleteImg.onclick = () => deleteTask(id);
    container.appendChild(deleteImg);  
  })    

  const deleteTask = async (id) => { 
    const resp = await fetch(`${url}/deleteExp/?_id=${id}`, {
      method: 'DELETE', 
    });   
    const result = await resp.json();
    allExpense = result;
    render();
  };
  
  const editText = (container, item, index) => {
    while(container.firstChild) {
      container.removeChild(container.firstChild);
    };
    const {place, cost, date} = item;
    const inputText = document.createElement('input');
    container.appendChild(inputText);
    inputText.value = place;
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
    const resp = await fetch(`${url}/updateExp`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',        
      }, body: JSON.stringify({
        _id: index,            
        place: text,
        date: date,
        cost: cost               
      })    
    });
    const result = await resp.json();
    allExpense = result;
    render();    
  };

  const cancel = () => {
    render();
  };
};