const puppeteer = require('puppeteer');
const { Parser } = require('json2csv');
var fs = require("fs");

puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] }).then(async browser => {

    var pages = [
    "https://www.amazon.com/Hormel-Black-Label-Bacon-Original/product-reviews/B000Q3AEBG/ref=cm_cr_arp_d_paging_btm_next_2?pageNumber=1"
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
			var re_3 = /\%/gi //match percent % characters
			var re_4 = /[^a-zA-Z0-9\s\#\%]/gi //match all non alphanumeric, space, pound #, or percent % characters
			var re_5 = /\s{2,}/gi //match multiple spaces in a row

            var review_body = document.querySelectorAll("div.review");
            
            for (var i = 0; i < review_body.length; i++) {

                var product_name = document.querySelector("div.product-title").innerText;
                    product_name = product_name.replace(/\s\,/gi,'_').toLowerCase();

                var product_brand = "hormel";

                var marketplace = "amazon";

                var author_nickname = review_body[i].querySelector("span.a-profile-name").innerText.trim();
                    author_nickname = author_nickname.replace(re_1," ");
                    author_nickname = author_nickname.replace(re_2,"");
                    author_nickname = author_nickname.replace(re_3," percent");
                    author_nickname = author_nickname.replace(re_4," ");
                    author_nickname = author_nickname.replace(re_5," ");

                var review_rating = review_body[i].querySelector("a[title*=stars]").innerText.substring(0,1);

                var review_title = review_body[i].querySelector("a.review-title").innerText.trim();
                    review_title = review_title.replace(re_1," ");
                    review_title = review_title.replace(re_2,"");
                    review_title = review_title.replace(re_3," percent");
                    review_title = review_title.replace(re_4," ");
                    review_title = review_title.replace(re_5," ");

                var review_text = review_body[i].querySelector("div.review-data span.review-text").innerText.trim();
                    review_text = review_text.replace(re_1," ");
                    review_text = review_text.replace(re_2,"");
                    review_text = review_text.replace(re_3," percent");
                    review_text = review_text.replace(re_4," ");
                    review_text = review_text.replace(re_5," ");

                var review_time = review_body[i].querySelector("span.review-date").innerText.trim();
                if(review_body[i].querySelector("span.cr-vote-text") == null){
                    var helpful_vote = ""
                }else{
                    if(review_body[i].querySelector("span.cr-vote-text").innerText.startsWith('One')){
                        var helpful_vote = 1
                    }else{
                        var helpful_vote = review_body[i].querySelector("span.cr-vote-text").innerText.substring(0,2).trim()
                    }
                }

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
    fs.writeFileSync('bacon_review_data_amazon.csv', csv);
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

