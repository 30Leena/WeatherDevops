const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runWeatherValidationTests() {
    const options = new chrome.Options();
    options.addArguments('start-maximized');
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Test Case 1: No state and city selected
        console.log("Test Case 1: No State & City Selected");
        await driver.get('http://localhost:3000/browse');
        await driver.wait(until.elementLocated(By.id('checkForecastBtn')), 10000);
        const checkForecastBtn = await driver.findElement(By.id('checkForecastBtn'));
        await checkForecastBtn.click();

        const errorDiv1 = await driver.findElement(By.id('formError'));
        const errorText1 = await errorDiv1.getText();
        if (errorText1.includes("Please select a state and a city")) {
            console.log("✅ Test Case 1 Passed: Proper validation shown when nothing is selected.");
        } else {
            console.log("❌ Test Case 1 Failed: Validation message incorrect.");
        }

        // Test Case 2: Only state selected
        console.log("\nTest Case 2: Only State Selected");
        const stateDropdown = await driver.findElement(By.id('stateDropdown'));
        await stateDropdown.sendKeys('California');

        const cityDropdown = await driver.findElement(By.id('cityDropdown'));
        await cityDropdown.sendKeys(''); // Reset to default if applicable

        await checkForecastBtn.click();

        const errorDiv2 = await driver.findElement(By.id('formError'));
        const errorText2 = await errorDiv2.getText();
        if (errorText2.includes("Please select a city")) {
            console.log("✅ Test Case 2 Passed: Proper validation shown when only state is selected.");
        } else {
            console.log("❌ Test Case 2 Failed: Validation message incorrect.");
        }

        // Test Case 3: Only city selected
        console.log("\nTest Case 3: Only City Selected");
        await driver.navigate().refresh();
        await driver.wait(until.elementLocated(By.id('checkForecastBtn')), 10000);

        const cityDropdownOnly = await driver.findElement(By.id('cityDropdown'));
        await cityDropdownOnly.sendKeys('Los Angeles');

        const checkForecastBtn3 = await driver.findElement(By.id('checkForecastBtn'));
        await checkForecastBtn3.click();

        const errorDiv3 = await driver.findElement(By.id('formError'));
        const errorText3 = await errorDiv3.getText();
        if (errorText3.includes("Please select a state")) {
            console.log("✅ Test Case 3 Passed: Proper validation shown when only city is selected.");
        } else {
            console.log("❌ Test Case 3 Failed: Validation message incorrect.");
        }

    } catch (err) {
        console.log("Test failed: " + err.message);
    } finally {
        await driver.quit();
    }
}

runWeatherValidationTests();






