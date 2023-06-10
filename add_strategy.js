const { Builder, By, Key, until } = require('selenium-webdriver');
var assert = require('assert');
const data = [
    { name: 'Sleep', description: 'Get rest', error : false },
    // { name: 'Play sports', description: "", error : true },
    // { name: '', description: 'Get rest', error : true }
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

            await driver.get("http://localhost:3000/strategies/new")

            let strategyName = await driver.findElement(By.id('strategy_name'));
            let description = await driver.findElement(By.id('strategy_description'));
            let submitStrategyButton = await driver.findElement(By.id("submit"));

            await strategyName.sendKeys(element.name)
            await description.sendKeys(element.description)
            await submitStrategyButton.click()

            // after add, the page will reroute to the Strategy Page
            let actualTitle = await driver.getTitle();

            try {
                assert.equal(actualTitle, `if-me.org | ${element.name}`, "Failure")
                if(element.error==false){
                    success++
                }
            } catch (e) {
                console.log(e)
                if(element.error==true){
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
