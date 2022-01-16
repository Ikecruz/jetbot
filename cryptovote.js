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

        await page.waitForSelector('#__next > div.css-19qzm77 > div > div > div.css-1f1k94j > div.css-9xp0oz > div.css-1e7f1w4 > div.css-1y3e9n6 > div > div.css-14mz9tq > button.chakra-button.social-voting__vote-button_good.css-r80p4a')

        await page.click('#__next > div.css-19qzm77 > div > div > div.css-1f1k94j > div.css-9xp0oz > div.css-1e7f1w4 > div.css-1y3e9n6 > div > div.css-14mz9tq > button.chakra-button.social-voting__vote-button_good.css-r80p4a')
        .then(() => console.log("Passed : Click Event"))
        .catch((err) => console.error("Failed : Click Event"))

        await page.keyboard.type("lorem do sfj dgjg sd fdgdfg fhghj fgsfs rttyj dawery ", {delay: 5000})

    });

    for(let i = 0; i < 1000; i++){
        cluster.queue('https://crypto.com/price/jetoken');
    }

    // many more pages

    await cluster.idle();
    await cluster.close();
})();