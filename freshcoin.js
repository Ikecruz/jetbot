const { Cluster } = require('puppeteer-cluster');

(async () => {
    const cluster = await Cluster.launch({
        puppeteerOptions: {
            headless: false,
            timeout: 0,
        },
        concurrency: Cluster.CONCURRENCY_BROWSER,
        maxConcurrency: 1,
    });

    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url, {
            timeout: 0,
            waitUntil: "load"
        })

        await page.focus('#__next > div > div.chakra-container.css-1c41ou2 > button')

        await page.keyboard.press('Tab')

        await page.keyboard.press('Enter')
        .then(() => console.log("Passed : Click Event"))
        .catch((err) => console.error("Failed : Click Event"))

        await page.keyboard.type("lorem do sfj dgjg sd fdgdfg fhghj fgsfs rttyj dawery ", {delay: 5000})

    });

    for(let i = 0; i < 10000; i++){
        cluster.queue('https://www.freshcoins.io/coins/jetoken');
    }

    // many more pages

    await cluster.idle();
    await cluster.close();
})();