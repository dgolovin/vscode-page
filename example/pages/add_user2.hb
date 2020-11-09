{{#if invalid}}
  Invalid age set
{{else}}
    {{#if adult}}
      User is adult
       Credit Card Number: <input type=text id="ccnumber" oninput="validateCreditCardNumber()"><br>
    {{else}}
      User is minor
      What is your favorite color? <input type=text id="favcolor" oninput="validateFavoriteColor()"><br>
    {{/if}}
    <p id="addUserPage2Output">updatable for output</p>
   <button type="button" class="btn btn-secondary" id="addUserPageTwoSubmitButton" onclick="submitAddUser()">
          Finish...
   </button>

{{/if}}