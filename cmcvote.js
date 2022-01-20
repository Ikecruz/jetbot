const { Cluster } = require('puppeteer-cluster');

(async () => {
    const cluster = await Cluster.launch({
        puppeteerOptions: {
            headless: false, 
            timeout: 0,
        },
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 1,
    });

    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url, {
            timeout: 0,
            waitUntil: "load"
        })

        await page.waitForSelector('div.pqmllm-2.hLrBVF > button:nth-child(1)')

        await page.click('div.pqmllm-2.hLrBVF > button:nth-child(1)')
        .then(() => console.log("Passed : Click Event"))
        .catch((err) => console.error("Failed : Click Event"))

        await page.keyboard.type("lorem do sfj dgjg sd fdgdfg fhghj fgsfs rttyj dawery ", {delay: 5000})

    });

    for(let i = 0; i < 10000; i++){
        cluster.queue('https://coinmarketcap.com/currencies/jetoken/');
    }

    // many more pages

    await cluster.idle();
    await cluster.close();
})();