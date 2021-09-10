import BasePage from "../page-objects/BasicPage.object";

const TIMEOUT_LONG: number = 10000;
const WELLCOME_MSG: string = "Sign in to Goodreads";

const basePage: any = new BasePage();
let envVariables = Cypress.env();

export function loginAsUser() {
  cy.visit(envVariables.baseUrl, { timeout: 20000 });
  cy.url().should("contain", envVariables.baseUrl);
  basePage.pageLogo().should("exist").and("be.visible");
  basePage
    .titleOfThePage()
    .invoke("text")
    .then((data: string) => {
      expect(data).to.contain("Sign in to Goodreads");
    });
  cy.intercept("https://www.goodreads.com/").as("login");
  basePage.inputField("email").should("exist").and("be.visible");
  basePage.inputField("email").click().type("oksana.yevtushyna@gmail.com");
  basePage.inputField("password").click().type("needforspeed1993zk.,k.rybub");
  basePage.loginBtn().click();
  cy.wait("@login", { timeout: 20000 });
  cy.contains(WELLCOME_MSG, { timeout: TIMEOUT_LONG }).should("not.exist");
}
