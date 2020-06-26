const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const employees = []

//Employee Questions
const questions = [
    {
        type: "input",
        message: "Enter employee name.",
        name: "name"
    },
    {
        type: "input",
        message: "Enter employee id #",
        name: "id"
    },
    {
        type: "input",
        message: "Enter employee Email.",
        name: "email"
    }
    
    ];



function askQuestions() {
    inquirer
        .prompt( questions )
        .then( ( response ) =>{
          
            
           askForEmployeeRole()
           
        })
        .catch(err =>{
            console.log(err)
        })
};

function askToContinue() {
    inquirer
    .prompt({
        type: "confirm",
        message: "Do you want to to add another team member?",
        name: "continue"
    })
    .then( ( response ) =>{
        console.log("=============================")
        if(response.continue === true){
            askForEmployeeRole()
        } else {
            console.log("Team Built!");
            console.log(employees);
           
            createHTMLFile();
        }
        
    })
}

function askForEmployeeRole(){
    console.log("==================================");
    inquirer.prompt({ 
            type: "list",
            message: "Select team member role",
            choices: ["Engineer", "Intern"],
            name: "role"
        })
        .then( (response ) =>{
            if( response.role === "Engineer") {
                
                askForEngineerInfo();
            } else if( response.role === "Intern") {
             
                askForInternInfo();
            }
        })
}

function askForManagerInfo(){
    console.log("==================================");
    console.log("Add a new Manager");
    console.log("==================================");
     inquirer
        .prompt([
        ...questions,
            {
                message: "What is the Manager's office number?",
                type: "input",
                name: "officeNumber"
            }
         ])
        .then( ( {name, id, email, officeNumber} ) =>{
            employees.push( new Manager( name, id, email, officeNumber))
           
            askForEmployeeRole();
        })
   
}

function askForEngineerInfo(){
    console.log("==================================");
    console.log("Add new Engineer");
    console.log("==================================");
    inquirer
        .prompt([
            ...questions,
            {
                message: "What is the Engineer's Github user name?",
                type: "input",
                name: "github"
            }
        ])
        .then( ( {name, id, email, github} ) => {
          employees.push( new Engineer(name, id, email, github) )
          askToContinue();
        })
  
}

function askForInternInfo(){
    console.log("==================================");
    console.log("Add new Intern");
    console.log("==================================");
    inquirer
        .prompt([
            ...questions,
            {
                message: "What is the Intern's School name?",
                type: "input",
                name: "school"
            }
        ])
        .then( ( {name, id, email, school} ) => {
            employees.push( new Intern(name, id, email, school))
            askToContinue();
        })
    
    
}
function createHTMLFile(){
    //console.log( render(employees))
    const HTML = render( employees );
    
    if( ! fs.existsSync(OUTPUT_DIR) ) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFile( outputPath, HTML, (err) =>{
        if(err) console.log(err);
        else console.log('HTML File Created');
    })

}

askForManagerInfo();
