import * as vscode from "vscode";
import { MesssageMaping } from "vscode-page";
import * as handlebars from "handlebars";
import { userInfo } from "os";

handlebars.registerHelper("formatDate", function(dateTime) {
  return new Date(dateTime).toLocaleDateString();
});


export declare type User = {
  id: string,
  name: string,
  age: number,
  cc?: string,
  candy?: string
};

const ben: User = {
  id: 'ben',
  name: 'ben lastname',
  age: 10,
  candy: 'kit kat'
}

const susan: User = {
  id: 'susan',
  name: 'susan lastname',
  age: 43,
  cc: '8675 3090 8675 3090'
}

let model: Map<String,User>;
function getUsers() : User[] {
  if( model == null ) {
    model = new Map<String,User>();
    model.set(ben.id, ben);
    model.set(susan.id, susan);
  }
  return [...model.values()];
}

function addUser(user:User) {
  model.set(user.id, user);
}
function removeUser(user:User) {
  model.delete(user.id);
}

function readyCommandMapping() {
  return {
  command: "ready",
  handler: async () => {
    let users = getUsers();
    return {
      users: users
    };
  },
  templates: [
    {
      id: "users",
      content: `
      {{#each users}}
        <li>
          <a class="bd-toc-link" onclick="showUser('{{id}}')" href="#">
            {{name}}
          </a>
        </li>
      {{/each}}
      `
    }
  ]
};
}

function showUserMapping() {
  return {
  command: "showUser",
  handler: async (parameters:any) => {
    return model.get(parameters.userid);
  },
  templates: [
    {id: 'title', content: 'User {{name}}'},
    {
      id: "content",
      content: `
      <li>Id: {{id}}</li>
      <li>Name: {{name}}</li>
      <li>Age: {{age}}</li>
      <li>CC: {{cc}}</li>
      <li>Candy: {{candy}}</li>
      `
    }
  ]
};
}


function showAddUserPage1Mapping() {
  return {
  command: "showAddUserPage1",
  handler: async (parameters:any) => {
    return;
  },
  templates: [
    {id: 'title', content: 'Add a user'},
    {
      id: "content",
      contentUrl: "pages/add_user.hb"
    }
  ]
};
}

function isNumber(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

function validateWorkflow1Page1Mapping() {
  return {
    command: "validateAddUserPage1",
    handler: async (parameters: any) => {
      const name1 = parameters.name;
      const age1 = parameters.age;
      const country1 = parameters.country;
      var msg = '';
      if( !isNumber(age1)) {
        msg = age1 + ' is not a number';
      } else if( Number(age1.toString()) < 18 ) {
        msg = 'User is under 18'
      } else {
        msg = 'User is 18 or older'
      }
      return {
        validationMsg: msg
      };
    },
    templates: [
      {
        id: "addUserPage1Output",
        content: `{{validationMsg}}`
      }
    ]
  }
}


export const messageMappings: MesssageMaping[] = [
  readyCommandMapping(),
  showUserMapping(),
  showAddUserPage1Mapping(),
  validateWorkflow1Page1Mapping()
];
