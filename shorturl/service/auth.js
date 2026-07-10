const sessionIdToUserMap = new Map();

function setUSer(id, user){
    sessionIdToUserMap.set(id, user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}

module.exports = {setUSer, getUser,};