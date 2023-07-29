import React, {useState, useEffect, Component} from 'react'
import {AddUserForm} from "./forms/AddUserForms";
import {EditUserForm} from "./forms/EditUserForm";
import {UserTables} from "./tables/UserTables";
import Loader from "./Loader/Loader";



const PUSSY = () => {

  const usersData = []

  const [users, setUsers] = useState(usersData)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => alert(error));
  }, []);

  // console.log(users);

  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)

  
  const addUser = user => {
      user.id = users.length + 1
      setUsers([ ...users, user ])
  }

  const deleteUser = (id) => {
      setUsers(users.filter(user => user.id !== id))
  }

  const updateUser = (id, updatedUser) => {
      setEditing(false)
      setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  const editRow = user => {
      setEditing(true)
      setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }



  return (
      <div className="container">
          <h1>CONTACTS</h1>
          <div className="flex-row">
              <div className="flex-large">
                  {editing ? (
                      <div>
                          <h2>Редактировать пользователя</h2>
                          <EditUserForm
                              editing={editing}
                              setEditing={setEditing}
                              currentUser={currentUser}
                              updateUser={updateUser}
                          />
                      </div>
                  ) : (
                      <div>
                          <h2>Добавить пользователя</h2>
                          <AddUserForm addUser={addUser} />
                      </div>
                  )}
              </div>
              <div className="flex-large">
                  <h2>Просмотор пользователей</h2>
                  <UserTables users={users} editRow={editRow} deleteUser={deleteUser} />
              </div>
          </div>
      </div>
  )
}



class App extends Component {

  state ={
    isLoading: true,
    data: [],
  }

  async componentDidMount() {
    const response = await fetch(` https://jsonplaceholder.typicode.com/users`)
    const data = await response.json()
    //  console.log(data)
    this.setState({
      isLoading: false,
      data
    }) 
  }


render() {
  return (

    <div className="container">
     {
      this.state.isLoading 
      ? <Loader />
      : <PUSSY/>
     } 
      {/* {
        
        this.state.isLoading 
        ? <Loader />
        : <Table 
        data={this.state.data}
        />
      } */}
      </div>
  )
}
}


export default App;