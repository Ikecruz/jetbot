const { Cluster } = require('puppeteer-cluster');
const userAgent = require('user-agents');


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

        await page.setUserAgent(userAgent.toString())

        await page.waitForSelector("#coin_details > div > div.row.align-items-center.p-4.rounded-3.border.shadow-sm.m-1.bg-181d23 > div.col-lg-9.mt-5.mt-lg-0 > div.d-grid.gap-2.d-md-flex.justify-content-md-start.mt-4 > button")

        await page.click('#coin_details > div > div.row.align-items-center.p-4.rounded-3.border.shadow-sm.m-1.bg-181d23 > div.col-lg-9.mt-5.mt-lg-0 > div.d-grid.gap-2.d-md-flex.justify-content-md-start.mt-4 > button')
        .then(() => console.log("Passed : Click Event"))
        .catch((err) => console.error("Failed : Click Event"))

        await page.keyboard.type("lorem do sfj dgjg sd fdgdfg fhghj fgsfs rttyj dawery ", {delay: 5000})

    });

    for(let i = 0; i < 10000; i++){
        cluster.queue('https://cointoplist.net/coin/jetoken');
    }

    // many more pages

    await cluster.idle();
    await cluster.close();
})();

