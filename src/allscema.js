import Realm from 'realm';
export const TODOLIST_SCHEMA = 'TodoList';

export const TodoListSchema = {
  name: TODOLIST_SCHEMA,
  properties: {
    id: 'int',
    name: 'string',
  },
  primaryKey: 'id',
};

const databaseOptions = {
  path: 'todoListApp.realm',
  schema: [TodoListSchema],
};

export const insertNewTodoList = async newTodoList => {
  console.log(`CREATED: ${JSON.stringify(newTodoList)}`);
  const realmdb = await Realm.open(databaseOptions);
  try {
    realmdb.write(async () => {
      await Promise.all(realmdb.create(TODOLIST_SCHEMA, newTodoList));
    });
  } catch (e) {
  } finally {
  }
};

//update on basis of primary key from text input
export const updateTodoList = async todoList => {
  const realmdb = await Realm.open(databaseOptions);
  try {
    realmdb.write(async () => {
      const updatingValue = realmdb.objectForPrimaryKey(
        TODOLIST_SCHEMA,
        todoList.id,
      );
      updatingValue.name = todoList.name;
      console.log(`UPDATED Value ${JSON.stringify(updatingValue)}`);
    });
  } catch (e) {
  } finally {
  }
};

// clear database
export const deleteAllTodoList = async () => {
  const realmdb = await Realm.open(databaseOptions);
  try {
    realmdb.write(async () => {
      const alltodolist = realmdb.objects(TODOLIST_SCHEMA);
      realmdb.delete(alltodolist);
      console.log(`Everything DELETED : ${JSON.stringify(alltodolist)}`);
    });
  } catch (e) {
  } finally {
  }
};

export const deleteOne = async theId => {
  const realmdb = await Realm.open(databaseOptions);
  try {
    realmdb.write(async () => {
      const deleteIt = realmdb.objects(TODOLIST_SCHEMA).filtered(`id=${theId}`);
      realmdb.delete(deleteIt);
      const obj = realmdb.objects(TODOLIST_SCHEMA);
      console.log(`DELETED : ${JSON.stringify(obj)}`);
    });
  } catch (e) {
  } finally {
  }
};

//view all
export const viewall = async () => {
  const realmdb = await Realm.open(databaseOptions);
  try {
    realmdb.write(async () => {
      const alltodolist = realmdb.objects(TODOLIST_SCHEMA);
      console.log(`ALL Data : ${JSON.stringify(alltodolist)}`);
    });
  } catch (e) {
  } finally {
  }
};

export const viewOne = async daid => {
  const realmdb = await Realm.open(databaseOptions);
  try {
    realmdb.write(async () => {
      const alltodolist = realmdb.objectForPrimaryKey(TODOLIST_SCHEMA, daid);
      console.log(`The Data : ${JSON.stringify(alltodolist)}`);
    });
  } catch (e) {
  } finally {
  }
};

export const daytabase = async () => {
  const realmdb = await Realm.open(databaseOptions);
  try {
    let finaldata=null
    realmdb.write(async () => {
      const entiredb = realmdb.objects(TODOLIST_SCHEMA);
      finaldata = entiredb;
    });
    return finaldata;
  } catch (e) {
  } finally {
  }
};

export default new Realm(databaseOptions);
