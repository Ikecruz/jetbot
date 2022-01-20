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

        await page.waitForSelector('#post-8730 > div.snax.snax-post-container > div > div > div > a > span')
        
        await page.click('#post-8730 > div.snax.snax-post-container > div > div > div > a > span')
        .then(() => console.log("Passed : Click Event"))
        .catch((err) => console.error("Failed : Click Event"))

        await page.keyboard.type("lorem do sfj dgjg sd fdgdfg fhghj fgsfs rttyj dawery ", {delay: 5000})

    });

    for(let i = 0; i < 10000; i++){
        cluster.queue('https://cryptonextgem.com/jetoken/');
    }

    // many more pages

    await cluster.idle();
    await cluster.close();
})();