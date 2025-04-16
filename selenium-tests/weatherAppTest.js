const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runWeatherValidationTests() {
    const options = new chrome.Options();
    options.addArguments('start-maximized');
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {

        console.log("Test Case 1: No State & City Selected");
        await driver.get('http://localhost:3000/browse');
        await driver.wait(until.elementLocated(By.id('checkForecastBtn')), 10000);
        const checkForecastBtn = await driver.findElement(By.id('checkForecastBtn'));
        await checkForecastBtn.click();

        const errorText1 = await driver.findElement(By.id('formError')).getText();
        if (errorText1.includes("Please select a state and a city")) {
            console.log(" Test Case 1 Passed: Proper validation shown when nothing is selected.");
        } else {
            console.log(" Test Case 1 Failed: Validation message incorrect.");
        }

        // Test Case 2: Only state selected
        console.log("\nTest Case 2: Only State Selected");
        await driver.findElement(By.id('stateDropdown')).sendKeys('California');
        await driver.findElement(By.id('cityDropdown')).sendKeys('--Select--');
        await checkForecastBtn.click();

        const errorText2 = await driver.findElement(By.id('formError')).getText();
        if (errorText2.includes("Please select a city")) {
            console.log(" Test Case 2 Passed: Proper validation shown when only state is selected.");
        } else {
            console.log(" Test Case 2 Failed: Validation message incorrect.");
        }


        console.log("\nTest Case 3: Only City Selected");
        await driver.navigate().refresh();
        await driver.wait(until.elementLocated(By.id('checkForecastBtn')), 10000);
        await driver.findElement(By.id('cityDropdown')).sendKeys('Los Angeles');
        await driver.findElement(By.id('checkForecastBtn')).click();

        const errorText3 = await driver.findElement(By.id('formError')).getText();
        if (errorText3.includes("Please select a state")) {
            console.log(" Test Case 3 Passed: Proper validation shown when only city is selected.");
        } else {
            console.log(" Test Case 3 Failed: Validation message incorrect.");
        }


        console.log("\nTest Case 4: Navigate back to Browse and check reset");
        await driver.get('http://localhost:3000/browse');
        await driver.wait(until.elementLocated(By.id('stateDropdown')), 5000);

        const selectedState = await driver.findElement(By.id('stateDropdown')).getAttribute('value');
        const selectedCity = await driver.findElement(By.id('cityDropdown')).getAttribute('value');

        if (!selectedState && !selectedCity) {
            console.log(" Test Case 4 Passed: State and city reset on return.");
        } else {
            console.log(" Test Case 4 Failed: State and city not reset.");
        }


        console.log("\nTest Case 5: Valid State and City");
        await driver.navigate().refresh();
        await driver.wait(until.elementLocated(By.id('stateDropdown')), 10000);
        await driver.findElement(By.id('stateDropdown')).sendKeys('California');
        await driver.wait(until.elementLocated(By.id('cityDropdown')), 5000);
        await driver.findElement(By.id('cityDropdown')).sendKeys('Los Angeles');
        await driver.findElement(By.id('checkForecastBtn')).click();

        await driver.wait(until.urlContains('/forecast'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        console.log(currentUrl.includes('/forecast') ? " Test Case 5 Passed: Navigated to Forecast page." : " Test Case 5 Failed: Did not navigate.");
    } catch (err) {
        console.log(" Test failed: " + err.message);
    } finally {
        await driver.quit();
    }
}

runWeatherValidationTests();

