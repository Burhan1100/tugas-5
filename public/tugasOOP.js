class UserRepository{
    getAll(){
        throw new Error ("USER_REPOSITORY.METHOD_NOT_IMPLEMENT");
    }

    addAll(user){
        throw new Error ("USER_REPOSITORY.METHOD_NOT_IMPLEMENT");
    }

    getById(id){
        throw new Error ("USER_REPOSITORY.METHOD_NOT_IMPLEMENT");
    }

    deleteById(){
        throw new Error ("USER_REPOSITORY.METHOD_NOT_IMPLEMENT");
    }
 }

 class UserRepositoryPostgres extends UserRepository{
     constructor(users){
        super();
        users = this.users
     }

    getAll(){
        return this.users;  
    };

     addAll(user) {
     this.users.push(user);
     return this.users; 
     };

     getById(id){
       for (const i in this.users) {
        if (this.users[i]["id"]==id) {
          return this.users[i];
        }
       }        
     }

     deleteById(id) {
    const deleteById = this.users.filter(user=>user.id != id) 
        return deleteById;
    }
 }

 const users = [
  {
   id: 1,
   name: "John"
 },{
    id: 2,
   name: "DOla"
 }]
;

const userBaru = { id: 4, name: "FAza"};
const userPostgres = new UserRepositoryPostgres(users);

console.table(userPostgres.getAll());
console.table(userPostgres.addAll(userBaru));
//console.table(userPostgres.getById(4));
//console.table(userPostgres.deleteById(2));
 