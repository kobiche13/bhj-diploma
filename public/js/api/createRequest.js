/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let url = options.url;
  options.callback = (err, response) => {
    if (err === null){    
      console.log( 'Данные, если нет ошибки', response );
    } else {
      console.log( 'Ошибка, если есть', err );
    }
  }
  let method = options.method;
  let formData;
  if (options.data) {
    if (options.method === 'GET') {
        url += url.indexOf('?') >= 0 ? '&' : '?';
        for (let key in options.data) {
            url += key + '=' + encodeURI(options.data[key])+ '&';
        }
        url = url.slice(0, -1);
    } else {
         formData = new FormData();  
        for (let key in options.data) {
          formData.append(key, options.data[key]);
        }
    }
  }  
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  try {    
    xhr.open(method, url);      
    if (options.method === 'GET') {  
      xhr.send(); 
    } else{
      xhr.send(formData)
    }
    xhr.addEventListener('load', function() {
      if (this.status == 200 || this.status == 201) {
        options.callback(xhr.response);                
      }               
    })
  }
  catch(err) {    
    options.callback(err);
  }
}

createRequest({
  url : '/user', // адрес
  data: { // произвольные данные, могут отсутствовать
    email: 'ivan@poselok.ru',
    password: 'odinodin'
  },
  method: 'GET',
  /*callback: (err, response) => {
    if (err === null){    
      console.log( 'Данные, если нет ошибки', response );
    } else {
      console.log( 'Ошибка, если есть', err );
    }
    if (response !== null){    
      err === null;
      console.log( 'Данные, если нет ошибки', response );
    } else {
      console.log( 'Ошибка, если есть', err );
    }
  }*/
})