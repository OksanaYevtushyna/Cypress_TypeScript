class BasicPage {
  titleOfThePage() {
    return cy.get("h1");
  }
  pageLogo = () => cy.get(".logo");

  inputField = (fieldType: string) => cy.get(`[name="user[${fieldType}]"]`);

  loginBtn = () => cy.get('input[type="submit"]');
}

export default BasicPage;
