/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  let url = options.url;
  let formData = new FormData();
  let method = options.method;
  for (let key in options.data) {
    formData.append(key, options.data[key]);
  }
  const xhr = new XMLHttpRequest();
  try {
    
    xhr.open(method, url);
    xhr.responseType = 'json';   
    xhr.send(formData); 
    /*xhr.addEventListener('readystatechange', function() {
      if (this.readyState == xhr.DONE) {
          let response = this.response;
          if (this.status == 200 || this.status == 201) {
            options.callback(response);                
          }
        }        
    })
    */
  }
  catch(err) {    
    console.log(this.err);
  }
}

createRequest({
  url : '/user', // адрес
  data: { // произвольные данные, могут отсутствовать
    email: 'ivan@poselok.ru',
    password: 'odinodin'
  },
  method: 'POST',
  callback: (err, response) => {
    /*if (err === null){    
      console.log( 'Данные, если нет ошибки', response );
    } else {
      console.log( 'Ошибка, если есть', err );
    }*/
    if (response !== null){    
      err === null;
      console.log( 'Данные, если нет ошибки', response );
    } else {
      console.log( 'Ошибка, если есть', err );
    }
  }
});