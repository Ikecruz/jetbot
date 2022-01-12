const { Cluster } = require('puppeteer-cluster');

(async () => {
    const cluster = await Cluster.launch({
        puppeteerOptions: { headless: false, timeout: 0 },
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 1,
    });

    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url, {
            timeout: 0,
            waitUntil: "load"
        })

        await page.click('.sc-1xvlii-0.dQjfsE')
        .then(() => console.log("Passed : Click Event"))
        .catch((err) => console.error("Failed : Click Event"))

        await page.keyboard.type("Jetoken", {delay: 200})
        .then(() => console.log("Passed : Type Event"))
        .catch((err) => console.error("Failed : Type Event"))

        await page.keyboard.press('Enter')
        .then(() => console.log("Passed : Enter Event"))
        .catch((err) => console.error("Failed : Enter Event"))

        await page.keyboard.type("lorem do sfj dgjg sd fdgdfg fhghj fgsfs rttyj dawery ", {delay: 5000})

    });

    for(let i = 0; i < 200; i++){
        cluster.queue('https://coinmarketcap.com/');
    }

    // many more pages

    await cluster.idle();
    await cluster.close();
})();