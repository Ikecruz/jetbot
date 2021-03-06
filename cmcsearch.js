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

        await page.waitForSelector('.sc-1xvlii-0.dQjfsE')

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

        await page.click('#__next > div.bywovg-1.fUzJes > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div.sc-16r8icm-0.jKrmxw.container > div > div.sc-16r8icm-0.sc-19zk94m-1.gRSJaB > div.sc-16r8icm-0.dSXRna > div.sc-16r8icm-0.sc-19zk94m-4.iNWJA-d > div > div.pqmllm-2.hLrBVF > button:nth-child(1)')
        .then(() => console.log("Passed : Click Event"))
        .catch((err) => console.error("Failed : Click Event"))

        await page.keyboard.type("lorem do sfj dgjg sd fdgdfg fhghj fgsfs rttyj dawery ", {delay: 5000})

    });

    for(let i = 0; i < 10000; i++){
        cluster.queue('https://coinmarketcap.com/');
    }

    // many more pages

    await cluster.idle();
    await cluster.close();
})();