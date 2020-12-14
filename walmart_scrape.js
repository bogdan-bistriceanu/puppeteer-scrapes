const puppeteer = require('puppeteer');
const { Parser } = require('json2csv');
var fs = require("fs");

puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] }).then(async browser => {

    var pages = [
        'https://www.walmart.com/reviews/product/43710697?page=1',
        'https://www.walmart.com/reviews/product/43710697?page=2',
        'https://www.walmart.com/reviews/product/43710697?page=3',
        'https://www.walmart.com/reviews/product/43710697?page=4',
        'https://www.walmart.com/reviews/product/43710697?page=5',
        'https://www.walmart.com/reviews/product/43710697?page=6',
        'https://www.walmart.com/reviews/product/43710697?page=7',
        'https://www.walmart.com/reviews/product/43710697?page=8',
        'https://www.walmart.com/reviews/product/43710697?page=9',
        'https://www.walmart.com/reviews/product/43710697?page=10',
        'https://www.walmart.com/reviews/product/43710697?page=11',
        'https://www.walmart.com/reviews/product/43710697?page=12',
        'https://www.walmart.com/reviews/product/43710697?page=13',
        'https://www.walmart.com/reviews/product/43710697?page=14',
        'https://www.walmart.com/reviews/product/43710697?page=15',
        'https://www.walmart.com/reviews/product/43710697?page=16',
        'https://www.walmart.com/reviews/product/43710697?page=17',
        'https://www.walmart.com/reviews/product/43710697?page=18',
        'https://www.walmart.com/reviews/product/10293911?page=1',
        'https://www.walmart.com/reviews/product/10293911?page=2',
        'https://www.walmart.com/reviews/product/10293911?page=3',
        'https://www.walmart.com/reviews/product/10293911?page=4',
        'https://www.walmart.com/reviews/product/10293911?page=5',
        'https://www.walmart.com/reviews/product/346866251?page=1',
        'https://www.walmart.com/reviews/product/346866251?page=2',
        'https://www.walmart.com/reviews/product/23816525?page=1',
        'https://www.walmart.com/reviews/product/23816525?page=2',
        'https://www.walmart.com/reviews/product/10290981?page=1',
        'https://www.walmart.com/reviews/product/10290981?page=2',
        'https://www.walmart.com/reviews/product/10290981?page=3',
        'https://www.walmart.com/reviews/product/10290981?page=4',
        'https://www.walmart.com/reviews/product/10290981?page=5',
        'https://www.walmart.com/reviews/product/10290981?page=6',
        'https://www.walmart.com/reviews/product/10290981?page=7',
        'https://www.walmart.com/reviews/product/10290981?page=8',
        'https://www.walmart.com/reviews/product/10290981?page=9',
        'https://www.walmart.com/reviews/product/10290981?page=10',
        'https://www.walmart.com/reviews/product/10290981?page=11',
        'https://www.walmart.com/reviews/product/10292659?page=1',
        'https://www.walmart.com/reviews/product/10292659?page=2',
        'https://www.walmart.com/reviews/product/10292659?page=3',
        'https://www.walmart.com/reviews/product/10292659?page=4',
        'https://www.walmart.com/reviews/product/10292659?page=5',
        'https://www.walmart.com/reviews/product/10292659?page=6',
        'https://www.walmart.com/reviews/product/10292659?page=7',
        'https://www.walmart.com/reviews/product/10292659?page=8',
        'https://www.walmart.com/reviews/product/10292659?page=9',
        'https://www.walmart.com/reviews/product/10292659?page=10',
        'https://www.walmart.com/reviews/product/10292659?page=11',
        'https://www.walmart.com/reviews/product/10292659?page=12',
        'https://www.walmart.com/reviews/product/10292659?page=13',
        'https://www.walmart.com/reviews/product/10292659?page=14',
        'https://www.walmart.com/reviews/product/10292659?page=15',
        'https://www.walmart.com/reviews/product/10292659?page=16',
        'https://www.walmart.com/reviews/product/10292659?page=17',
        'https://www.walmart.com/reviews/product/10292659?page=18',
        'https://www.walmart.com/reviews/product/10292659?page=19',
        'https://www.walmart.com/reviews/product/10292667?page=1',
        'https://www.walmart.com/reviews/product/10292667?page=2',
        'https://www.walmart.com/reviews/product/10292667?page=3',
        'https://www.walmart.com/reviews/product/10292667?page=4',
        'https://www.walmart.com/reviews/product/10292667?page=5',
        'https://www.walmart.com/reviews/product/10292667?page=6',
        'https://www.walmart.com/reviews/product/10292667?page=7',
        'https://www.walmart.com/reviews/product/10292667?page=8',
        'https://www.walmart.com/reviews/product/10533738?page=1',
        'https://www.walmart.com/reviews/product/10533738?page=2',
        'https://www.walmart.com/reviews/product/10533738?page=3',
        'https://www.walmart.com/reviews/product/10533738?page=4',
        'https://www.walmart.com/reviews/product/10533738?page=5',
        'https://www.walmart.com/reviews/product/21268963?page=1',
        'https://www.walmart.com/reviews/product/21268963?page=2',
        'https://www.walmart.com/reviews/product/21268963?page=3',
        'https://www.walmart.com/reviews/product/21268963?page=4',
        'https://www.walmart.com/reviews/product/21268963?page=5',
        'https://www.walmart.com/reviews/product/21268963?page=6',
        'https://www.walmart.com/reviews/product/10292660?page=1',
        'https://www.walmart.com/reviews/product/10292660?page=2',
        'https://www.walmart.com/reviews/product/10292660?page=3',
        'https://www.walmart.com/reviews/product/10292660?page=4',
        'https://www.walmart.com/reviews/product/10292660?page=5',
        'https://www.walmart.com/reviews/product/10292660?page=6',
        'https://www.walmart.com/reviews/product/10292660?page=7',
        'https://www.walmart.com/reviews/product/10292660?page=8',
        'https://www.walmart.com/reviews/product/10292660?page=9',
        'https://www.walmart.com/reviews/product/10292660?page=10',
        'https://www.walmart.com/reviews/product/10292660?page=11',
        'https://www.walmart.com/reviews/product/36511541?page=1',
        'https://www.walmart.com/reviews/product/36511541?page=2',
        'https://www.walmart.com/reviews/product/36511541?page=3',
        'https://www.walmart.com/reviews/product/36511541?page=4',
        'https://www.walmart.com/reviews/product/22210908?page=1',
        'https://www.walmart.com/reviews/product/22210908?page=2',
        'https://www.walmart.com/reviews/product/16777272?page=1',
        'https://www.walmart.com/reviews/product/16777272?page=2',
        'https://www.walmart.com/reviews/product/16777272?page=3',
        'https://www.walmart.com/reviews/product/16777272?page=4',
        'https://www.walmart.com/reviews/product/16777272?page=5',
        'https://www.walmart.com/reviews/product/16777272?page=6',
        'https://www.walmart.com/reviews/product/16777272?page=7',
        'https://www.walmart.com/reviews/product/16777272?page=8',
        'https://www.walmart.com/reviews/product/16777272?page=9',
        'https://www.walmart.com/reviews/product/16777272?page=10',
        'https://www.walmart.com/reviews/product/43710698?page=1',
        'https://www.walmart.com/reviews/product/43710698?page=2',
        'https://www.walmart.com/reviews/product/43710698?page=3',
        'https://www.walmart.com/reviews/product/43710698?page=4',
        'https://www.walmart.com/reviews/product/43710698?page=5',
        'https://www.walmart.com/reviews/product/43710698?page=6',
        'https://www.walmart.com/reviews/product/43710698?page=7',
        'https://www.walmart.com/reviews/product/43710698?page=8',
        'https://www.walmart.com/reviews/product/43710698?page=9',
        'https://www.walmart.com/reviews/product/43710698?page=10',
        'https://www.walmart.com/reviews/product/32250879?page=1',
        'https://www.walmart.com/reviews/product/32250879?page=2',
        'https://www.walmart.com/reviews/product/32250879?page=3',
        'https://www.walmart.com/reviews/product/32250879?page=4',
        'https://www.walmart.com/reviews/product/32250879?page=5',
        'https://www.walmart.com/reviews/product/32250879?page=6',
        'https://www.walmart.com/reviews/product/32250879?page=7',
        'https://www.walmart.com/reviews/product/10403359?page=1',
        'https://www.walmart.com/reviews/product/10403359?page=2',
        'https://www.walmart.com/reviews/product/10403359?page=3',
        'https://www.walmart.com/reviews/product/15610398?page=1',
        'https://www.walmart.com/reviews/product/15610398?page=2',
        'https://www.walmart.com/reviews/product/15610398?page=3',
        'https://www.walmart.com/reviews/product/48387913?page=1',
        'https://www.walmart.com/reviews/product/48387913?page=2',
        'https://www.walmart.com/reviews/product/48387913?page=3',
        'https://www.walmart.com/reviews/product/48387913?page=4',
        'https://www.walmart.com/reviews/product/48387913?page=5'
    ];

    const page = await browser.newPage();

    var review_data = [];
    var review_data_index = 0;

    for (var x=0; x<pages.length; x++){
        //console.log(x)
        await page.goto(pages[x]);
        await page.waitFor(5000);

        var news = await page.evaluate(() => {
            var scrape_data = [];

            var re_1 = /\.{1,}/gi //match multiple periods in a row
            var re_2 = /\'/gi //match apostrophes
            var re_3 = /[^a-zA-Z0-9\s\#\%]/gi //match all non alphanumeric, space, pound #, or percent % characters
            var re_4 = /\%/gi //match percent % characters
            var re_5 = /\s{2,}/gi //match multiple spaces in a row

            var review_body = document.querySelectorAll("div.customer-review-body");
            
            for (var i = 0; i < review_body.length; i++) {

                var product_name = document.querySelector("h2.prod-ProductTitle").innerText;
                    product_name = product_name.replace(/(\s|\,)/gi,'_').toLowerCase();

                var product_brand = product_name.split("_");
                    product_brand = product_brand[0] + "_" + product_brand[1];

                var marketplace = "walmart";

                var author_nickname = review_body[i].querySelector('span.review-footer-userNickname');
                    author_nickname != null ? author_nickname = author_nickname.innerText.trim() : author_nickname = "";
                    author_nickname = author_nickname.replace(re_1," ");
                    author_nickname = author_nickname.replace(re_2,"");
                    author_nickname = author_nickname.replace(re_3," ");
                    author_nickname = author_nickname.replace(re_4," percent");
                    author_nickname = author_nickname.replace(re_5," ");

                var review_rating = review_body[i].querySelector('div.review-heading span.average-rating span.seo-avg-rating').innerText.split('.')[0];

                var review_title = review_body[i].querySelector('h3.review-title');
                    review_title != null ? review_title = review_title.innerText.trim() : review_title = "";
                    review_title = review_title.replace(re_1," ");
                    review_title = review_title.replace(re_2,"");
                    review_title = review_title.replace(re_3," ");
                    review_title = review_title.replace(re_4," percent");
                    review_title = review_title.replace(re_5," ");

                var review_text = review_body[i].querySelector('div.review-text');
                    review_text != null ? review_text = review_text.innerText.trim() : review_text = "";
                    review_text = review_text.replace(re_1," ");
                    review_text = review_text.replace(re_2,"");
                    review_text = review_text.replace(re_3," ");
                    review_text = review_text.replace(re_4," percent");
                    review_text = review_text.replace(re_5," ");

                var review_time = review_body[i].querySelector('div.review-date').innerText.trim();
                
                var helpful_vote = review_body[i].querySelector('div.ReviewHelpfulness button.yes-vote span.yes-no-count').innerText.trim()


                scrape_data[i] = {
                    "author_nickname": author_nickname,
                    "review_rating": review_rating,
                    "review_title": review_title,
                    "review_text": review_text,
                    "review_time": review_time,
                    "review_length": review_text.length,
                    "review_helpful": helpful_vote,
                    "product_name":product_name,
                    "product_brand":product_brand,
                    "marketplace":marketplace
                };
            };
            return scrape_data
        });

        for(y=0; y<news.length; y++){
            review_data[review_data_index] = news[y]
            review_data_index++
        }
    }

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(review_data);
    fs.writeFileSync('bacon_review_data_walmart.csv', csv);
    console.log(">>>CSV saved<<<");
     
    //console.log(csv);

    fs.writeFile("reviews.json", JSON.stringify(review_data), function(err) {
        if (err) throw err;
        console.log(">>>JSON saved<<<");
    });

    //console.log(review_data);
    await browser.close();
    


}).catch(function(error) {
    console.error(error);
});

