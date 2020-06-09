class Employee{
    constructor (name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName(name){
        return this.name
    }

    getId(id){
        return this.id
    }
     
    getEmail(email){
        return this.email
    }

    getRole(){
      return "Employee";  
    }


}

module.exports = Employee;