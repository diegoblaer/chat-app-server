const users = []

const addUser = ({ id, name, age, avatar }) => {

    // Validate the data
    if(!name || !age || !avatar){
        return{
            error: "Name, age and avatar are required!"
        }
    }

    // Clean the data
    name = name.trim().toLowerCase()
    age = age.trim().toLowerCase()


    const user = { id, name, age, avatar }
    users.push(user)
    return { user }
}

const removeUser = id => {
    const index = users.findIndex(user => user.id === id)

    if(index !== -1){
        return users.splice(index, 1)[0]
    }
}

const getUser = id => {
    return users.find(user => user.id === id)
}

const getAllUsers = () => users;

module.exports = {
    addUser, 
    removeUser,
    getUser,
    getAllUsers
}