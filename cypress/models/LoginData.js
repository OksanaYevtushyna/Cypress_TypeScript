import BasePage from "../integration/page-objects/BasicPage.object";

const TIMEOUT_LONG = 10000;
const WELLCOME_MSG = "Sign in to Goodreads";

const basePage = new BasePage();
let envVariables = Cypress.env();

export function loginAsUser() {
  it("visit the site", () => {
    cy.visit(envVariables.baseUrl, { timeout: 10000 });
    cy.url().should("contain", envVariables.baseUrl);
    basePage.pageLogo().should("exist").and("be.visible");
    basePage
      .titleOfThePage()
      .invoke("text")
      .then((data) => {
        expect(data).to.contain("Sign in to Goodreads");
      });
    cy.intercept("https://www.goodreads.com/").as("login");
    basePage.inputField("email").should("exist").and("be.visible");
    basePage.inputField("email").click().type("oksana.yevtushyna@gmail.com");
    basePage.inputField("password").click().type("needforspeed1993zk.,k.rybub");
    basePage.loginBtn().click();
    cy.wait("@login", { timeout: 20000 });
    cy.contains(WELLCOME_MSG, { timeout: TIMEOUT_LONG }).should("not.exist");
  });
}
