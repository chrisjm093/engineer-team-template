const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const team = []
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
    },
    {
        type: "list",
        message: "Select team member role",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    },
    //Role specific questions
    {
        type: "input",
        message: "Enter Manager's office number.",
        when: answers => {
            return (answers.role === "Manager")
        },
        name: "officeNumber"
    },
    {
        type: "input",
        message: "Enter the Engineer's Github username.",
        when: answers => {
            return(answers.role === "Engineer")
        },
        name: "github"
    },
    {
        type: "input",
        message: "Enter the Intern's School name.",
        when: answers => {
            return(answers.role === "Intern")
        },
        name: "school"
    }
    ];



function askQuestions() {
    inquirer
        .prompt( questions )
        .then( ( response ) =>{
          
            team.push(response);
            askToContinue();
           
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
        console.log("============")
        if(response.continue === true){
            askQuestions()
        } else {
            console.log(team)
            // createHTMLFile()
        }
        
    })
}

function createHTMLFile(){

    const HTML = render( employees );
    fs.writeFile( outputPath, HTML, (err) =>{
        if(err) console.log(err);
        else console.log('HTML File Created');
    })

}
askQuestions()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```