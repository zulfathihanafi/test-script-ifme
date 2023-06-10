
const { Builder, By, Key, until } = require('selenium-webdriver');
var assert = require('assert');
const data = [
    { name: 'Sleep', strength: 10, total: 10, dosage: 10, days: true, error: false }, // maybe need to add days
    { name: '', strength: 10, total: 10, dosage: 10, days: true, error: true },
    { name: 'Sleep', strength: 0, total: 10, dosage: 10, days: true, error: true },
    { name: 'Sleep', strength: 10, total: 0, dosage: 10, days: true, error: true },
    { name: 'Sleep', strength: 10, total: 10, dosage: 0, days: true, error: true },
    { name: 'Sleep', strength: 10, total: 10, dosage: 10, days: false, error: false }
]

async function runTest() {
    let driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        // Navigate to the web page
        await driver.get('http://localhost:3000/users/sign_in');

        // Verify the page title



        // Simulate login functionality
        let usernameInput = await driver.findElement(By.id('user_email'));
        let passwordInput = await driver.findElement(By.id('user_password'));
        let submitButton = await driver.findElement(By.name("commit"));

        await usernameInput.sendKeys('test1@example.com');
        await passwordInput.sendKeys('passworD@99');
        await submitButton.click();



        let success = 0
        for (let index = 0; index < data.length; index++) {
            console.log("Test Case :", index + 1)
            const element = data[index];

            await driver.get("http://localhost:3000/medications/new")

            let medicationName = await driver.findElement(By.id('medication_name'));
            let medicationStrength = await driver.findElement(By.id('medication_strength'));
            let medicationTotal = await driver.findElement(By.id('medication_total'));
            let medicationDosage = await driver.findElement(By.id('medication_dosage'));
            let checkBoxes = await driver.findElements(By.className('Input__checkbox___3NP9X _global__gridRowSpaceBetween___1iY41'))

            if(!element.days){
            await checkBoxes.forEach((checkBox)=>{
                checkBox.click()
            })}

            let submitMedicationButton = await driver.findElement(By.id("submit"));

            await medicationName.sendKeys(element.name)
            await medicationStrength.sendKeys(element.strength)
            await medicationTotal.sendKeys(element.total)
            await medicationDosage.sendKeys(element.dosage)
            // await medicationStrength.sendKeys(element.strength)
            await submitMedicationButton.click()

            // after add, the page will reroute to the Strategy Page
            let actualTitle = await driver.getTitle();

            try {
                assert.equal(actualTitle, `if-me.org | ${element.name}`, "Failure")
                if (element.error == false) {
                    success++
                }
            } catch (e) {
                console.log(e)
                if (element.error == true) {
                    success++
                }
            }

        }

        console.log(`Success ${success} / ${data.length}`)
    }
    finally {
        // Quit the WebDriver instance
        await driver.quit();
    }
}

runTest();
