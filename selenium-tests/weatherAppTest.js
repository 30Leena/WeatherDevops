const { Builder, By, until, Alert } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

async function runWeatherAppTests() {
    const options = new chrome.Options();
    options.addArguments('start-maximized');
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Test Case 1: Select state and city and navigate to Forecast page
        console.log("Test Case 1: State and City Selection Test");
        await driver.get('http://localhost:3000/'); // Home page
        console.log("Opening Home page...");

        // Increase timeout and ensure the button is visible
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkForecastBtn'))), 20000);
        const checkForecastButton = await driver.findElement(By.id('checkForecastBtn'));
        await checkForecastButton.click();
        console.log("Clicking the 'Check Forecast' button...");

        await driver.wait(until.urlContains('Browse'), 20000); // Ensure the Browse page loads
        console.log("Waiting for Browse page to load...");

        // Select state and city in Browse page
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('stateDropdown'))), 20000);
        const stateDropdown = await driver.findElement(By.id('stateDropdown'));
        await stateDropdown.sendKeys('Karnataka');

        const cityDropdown = await driver.findElement(By.id('cityDropdown'));
        await cityDropdown.sendKeys('Bangalore');

        const goToForecastButton = await driver.findElement(By.id('go-to-forecast'));
        await goToForecastButton.click();
        console.log("State and city selected. Navigating to Forecast page...");

        await driver.wait(until.urlContains('forecast'), 20000); // Ensure the Forecast page loads

        // Test Case 2: Redirect to Browse page if trying to access Forecast without state and city
        console.log("Test Case 2: Redirection Test");
        await driver.get('http://localhost:3000/forecast'); // Directly accessing Forecast page

        // Wait for alert (should redirect)
        try {
            await driver.wait(until.alertIsPresent(), 20000);
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            console.log(`Alert text: ${alertText}`);
            alert.accept();
            console.log("Test Case 2 Passed: Redirected to Browse page successfully!");
        } catch (error) {
            console.log("Test Case 2 Failed: Unexpected Alert not found.");
        }

        // Test Case 3: Page Navigation Test - Re-select state and city after navigating to other pages
        console.log("Test Case 3: Page Navigation Test");
        await driver.get('http://localhost:3000/'); // Go back to Home page
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('checkForecastBtn'))), 20000);
        await driver.get('http://localhost:3000/about'); // Navigate to About page

        // Ensure state and city selection is reset when navigating to About page
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('stateDropdown'))), 20000);
        const stateDropdownReset = await driver.findElement(By.id('stateDropdown'));
        const cityDropdownReset = await driver.findElement(By.id('cityDropdown'));
        const stateValue = await stateDropdownReset.getAttribute('value');
        const cityValue = await cityDropdownReset.getAttribute('value');

        console.log(`State after navigation: ${stateValue}, City: ${cityValue}`);
        if (!stateValue || !cityValue) {
            console.log("Test Case 3 Passed: State and city selection reset.");
        } else {
            console.log("Test Case 3 Failed: State and city selection retained.");
        }

        // Test Case 4: Ensure weather condition is displayed after selecting state and city
        console.log("Test Case 4: Forecast Display Test");
        await driver.get('http://localhost:3000/'); // Go back to Home page
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('check-forecast'))), 20000);
        await driver.get('http://localhost:3000/browse'); // Go to Browse page
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('state-dropdown'))), 20000);
        await stateDropdown.sendKeys('California');
        await cityDropdown.sendKeys('Los Angeles');

        await goToForecastButton.click();
        console.log("Navigating to Forecast page with selected state and city...");

        await driver.wait(until.urlContains('forecast'), 20000); // Ensure Forecast page loads

        // Verify weather data is displayed (just an example check for the existence of a forecast element)
        await driver.wait(until.elementIsVisible(driver.findElement(By.id('weather-info'))), 20000);
        const weatherInfo = await driver.findElement(By.id('weather-info'));
        const weatherText = await weatherInfo.getText();
        console.log(`Weather info displayed: ${weatherText}`);
        if (weatherText.includes('Los Angeles')) {
            console.log("Test Case 4 Passed: Weather information displayed correctly.");
        } else {
            console.log("Test Case 4 Failed: Weather information not displayed correctly.");
        }

    } catch (error) {
        // Suppress the full stack trace and just print the custom error message
        console.log("Test failed: " + error.message);
    } finally {
        await driver.quit();
    }
}

runWeatherAppTests();





