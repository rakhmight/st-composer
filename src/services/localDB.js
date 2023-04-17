import { openDB, deleteDB, wrap, unwrap } from 'idb'

//let openRequest, db, tests, savings, testsTransaction, savingsTransaction

export function initDB(){
  let openRequest = indexedDB.open("composerStorage", 2)

  // обновление версии инициализация БД
  openRequest.onupgradeneeded = function() {
      let db = openRequest.result
      // инициализация хранилища
      if (!db.objectStoreNames.contains('tests')) { // если хранилище "tests" не существует
          db.createObjectStore('tests', {keyPath: 'id'}) // создаём хранилище
      }
      if (!db.objectStoreNames.contains('savings')) { // если хранилище "savings" не существует
          db.createObjectStore('savings', {keyPath: 'id'}) // создаём хранилище
      }

      console.log('(DB) БД инициализировано');
  }

  // Обработчик ошибки создания БД
  openRequest.onerror = function() {
      console.error("(DB) Ошибка: ", openRequest.error)
  }
}

// Template
export async function operationFromStore(type, params) {
  let db = await openDB("composerStorage", 2)
  
  let testsTransaction = db.transaction('tests', 'readwrite')
  let savingsTransaction = db.transaction('savings', 'readwrite')
  let tests = testsTransaction.objectStore('tests')
  let savings = savingsTransaction.objectStore('savings')

  try{

    // Tests
    if(type=='addTest'){
      await tests.add(params.data)
    }else if(type=='getAllTests' && params.sort){
      let result = await tests.getAll()
      let output = []

      for(let i = 0; i!=result.length; i++){
        if(result[i].author==params.sort.author && result[i].status.isDeleted==params.sort.isDeleted){
          output.push(result[i])
        }
      }

      return output
    }else if(type=='getByTestID'){
      let result = await tests.get(params.id)
      return result
    }else if(type=='deleteTest'){
      await tests.delete(params.id)
    }

    
    // Savings
    else if(type=='addSaving'){
      await savings.add(params.data)
    }else if(type=='getAllSavings' && params.sort){
      let result = await savings.getAll()
      let output = []

      for(let i = 0; i!=result.length; i++){
        if(result[i].testID==params.sort.id){
          output.push(result[i])
        }
      }
      return output
    }else if(type=='getBySavingID'){
      let result = await savings.get(params.id)
      return result
    }else if(type=='deleteSaving'){
      await savings.delete(params.id)
    }
  }catch(e){
    console.error('(DB) Ошибка: ', e.message)
  }
}