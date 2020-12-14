const puppeteer = require('puppeteer');
const { Parser } = require('json2csv');
var fs = require("fs");

puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080','--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] }).then(async browser => {

    var pages = [
    "https://www.amazon.com/Hormel-Black-Label-Bacon-Original/product-reviews/B000Q3AEBG/ref=cm_cr_arp_d_paging_btm_next_2?pageNumber=1",
    "https://www.amazon.com/Hormel-Black-Label-Bacon-Original/product-reviews/B000Q3AEBG/ref=cm_cr_arp_d_paging_btm_next_2?pageNumber=2",
    "https://www.amazon.com/Hormel-Bacon-Original-Microwave-Ready/product-reviews/B000R4ELK4/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Hormel-Bacon-Original-Microwave-Ready/product-reviews/B000R4ELK4/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Hormel-Bacon-Original-Microwave-Ready/product-reviews/B000R4ELK4/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Hormel-Bacon-Original-Microwave-Ready/product-reviews/B000R4ELK4/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=6",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=7",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=8",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=9",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=10",
    "https://www.amazon.com/Hormel-Black-Label-Fully-Cooked/product-reviews/B07WYKQBSC/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=11",
    "https://www.amazon.com/Hormel-Black-Label-Bacon-Original/product-reviews/B000Q3AEBG/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Hormel-Black-Label-Bacon-Original/product-reviews/B000Q3AEBG/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Hormel-Bacon-Original-Microwave-Ready/product-reviews/B000R4ELK4/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Hormel-Bacon-Original-Microwave-Ready/product-reviews/B000R4ELK4/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Hormel-Bacon-Original-Microwave-Ready/product-reviews/B000R4ELK4/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Hormel-Bacon-Original-Microwave-Ready/product-reviews/B000R4ELK4/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Hormel-Cooked-Bacon-Strips-2-52/product-reviews/B0012S73FE/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Hormel-Cooked-Bacon-Strips-2-52/product-reviews/B0012S73FE/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Hormel-Cooked-Bacon-Strips-2-52/product-reviews/B0012S73FE/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=6",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=7",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=8",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=9",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=10",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=11",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=12",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=13",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=14",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=15",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=16",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=17",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=18",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=19",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=20",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=21",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=22",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=23",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=24",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=25",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=26",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=27",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=28",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=29",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=30",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=31",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=32",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=33",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=34",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=35",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=36",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=37",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=38",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=39",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=40",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=41",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=42",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=43",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=44",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=45",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=46",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=47",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=48",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=49",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=50",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=51",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=52",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=53",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=54",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=55",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=56",
    "https://www.amazon.com/Hormel-Black-Label-Cooked-Slices/product-reviews/B074KN7S2D/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=57",
    "https://www.amazon.com/Applegate-Organic-Uncured-Sunday-Bacon/product-reviews/B000VHSIE2/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Applegate-Organic-Uncured-Sunday-Bacon/product-reviews/B000VHSIE2/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Applegate-Organic-Uncured-Sunday-Bacon/product-reviews/B000VHSIE2/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Applegate-Organic-Uncured-Sunday-Bacon/product-reviews/B000VHSIE2/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Applegate-Organic-Uncured-Sunday-Bacon/product-reviews/B000VHSIE2/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/Applegate-Organic-Sugar-Uncured-Bacon/product-reviews/B07LCTT3NN/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Applegate-Organic-Sugar-Uncured-Bacon/product-reviews/B07LCTT3NN/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Applegate-Natural-Uncured-Sunday-Bacon/product-reviews/B006T88XUQ/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Applegate-Natural-Uncured-Sunday-Bacon/product-reviews/B006T88XUQ/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Applegate-Natural-Uncured-Sunday-Bacon/product-reviews/B006T88XUQ/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Applegate-Natural-Uncured-Sunday-Bacon/product-reviews/B006T88XUQ/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Applegate-Natural-Uncured-Sunday-Bacon/product-reviews/B006T88XUQ/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/Applegate-Natural-Uncured-Sunday-Bacon/product-reviews/B006T88XUQ/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=6",
    "https://www.amazon.com/Applegate-Bacon-Turkey-Organic-0-5/product-reviews/B078HRLQJR/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Applegate-Bacon-Turkey-Organic-0-5/product-reviews/B078HRLQJR/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Applegate-Bacon-Turkey-Organic-0-5/product-reviews/B078HRLQJR/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Applegate-Bacon-Turkey-Organic-0-5/product-reviews/B078HRLQJR/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Applegate-Bacon-Turkey-Organic-0-5/product-reviews/B078HRLQJR/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/Applegate-Bacon-Turkey-Organic-0-5/product-reviews/B078HRLQJR/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=6",
    "https://www.amazon.com/Smithfield-Hometown-Original-Naturally-Hickory/product-reviews/B076KP6534/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Smithfield-Hometown-Original-Naturally-Hickory/product-reviews/B076KP6534/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Smithfield-Thick-Ready-Naturally-Smoked/product-reviews/B076KS16LS/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Smithfield-Thick-Ready-Naturally-Smoked/product-reviews/B076KS16LS/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Smithfield-Thick-Ready-Naturally-Smoked/product-reviews/B076KS16LS/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Smithfield-Hometown-Original-Cooked-Hickory/product-reviews/B076KP6NY6/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Smithfield-Hometown-Original-Cooked-Hickory/product-reviews/B076KP6NY6/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Wright-Naturally-Hickory-Smoked-Flavored/product-reviews/B00O8R6J8I/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Wright-Naturally-Hickory-Smoked-Flavored/product-reviews/B00O8R6J8I/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Wright-Naturally-Hickory-Smoked-Flavored/product-reviews/B00O8R6J8I/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Wright-Naturally-Hickory-Smoked-Flavored/product-reviews/B00O8R6J8I/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Wright-Naturally-Hickory-Smoked-Flavored/product-reviews/B00O8R6J8I/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/Wright-Naturally-Hickory-Smoked-Flavored/product-reviews/B00O8R6J8I/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=6",
    "https://www.amazon.com/Wright-Brand-Applewood-Smoked-Bacon/product-reviews/B008NBV0XY/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Wright-Brand-Applewood-Smoked-Bacon/product-reviews/B008NBV0XY/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Wright-Brand-Applewood-Smoked-Bacon/product-reviews/B008NBV0XY/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Wright-Brand-Applewood-Smoked-Bacon/product-reviews/B008NBV0XY/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Wright-Brand-Applewood-Smoked-Bacon/product-reviews/B008NBV0XY/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/Oscar-Mayer-Naturally-Hardwood-Bacon/product-reviews/B00SD7DGC6/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Oscar-Mayer-Naturally-Hardwood-Bacon/product-reviews/B00SD7DGC6/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Oscar-Mayer-Original-Cooked-Bacon/product-reviews/B000RYFD9C/ref=cm_cr_getr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Oscar-Mayer-Original-Cooked-Bacon/product-reviews/B000RYFD9C/ref=cm_cr_getr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Oscar-Mayer-Original-Cooked-Bacon/product-reviews/B000RYFD9C/ref=cm_cr_getr_d_paging_btm_next_3?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Oscar-Mayer-Fully-Cooked-Thick/product-reviews/B00G75WR26/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/Oscar-Mayer-Fully-Cooked-Thick/product-reviews/B00G75WR26/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/Oscar-Mayer-Fully-Cooked-Thick/product-reviews/B00G75WR26/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/Oscar-Mayer-Fully-Cooked-Thick/product-reviews/B00G75WR26/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/Oscar-Mayer-Fully-Cooked-Thick/product-reviews/B00G75WR26/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/Oscar-Mayer-Fully-Cooked-Thick/product-reviews/B00G75WR26/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=6",
    "https://www.amazon.com/Oscar-Mayer-Fully-Cooked-Thick/product-reviews/B00G75WR26/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=7",
    "https://www.amazon.com/Oscar-Mayer-Fully-Cooked-Thick/product-reviews/B00G75WR26/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=8",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=6",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=7",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=8",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=9",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=10",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=11",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=12",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=13",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=14",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=15",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Bacon/product-reviews/B074H5GZ7P/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=16",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Reduced/product-reviews/B074H7KL22/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Reduced/product-reviews/B074H7KL22/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Reduced/product-reviews/B074H7KL22/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=4",
    "https://www.amazon.com/365-Everyday-Value-Smokehouse-Reduced/product-reviews/B074H7KL22/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=5",
    "https://www.amazon.com/365-Everyday-Value-Uncured-Applewood/product-reviews/B074H67H4K/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/365-Everyday-Value-Uncured-Applewood/product-reviews/B074H67H4K/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2",
    "https://www.amazon.com/365-Everyday-Value-Uncured-Applewood/product-reviews/B074H67H4K/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=3",
    "https://www.amazon.com/365-Everyday-Value-Organic-Smokehouse/product-reviews/B07FWHFKGW/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=1",
    "https://www.amazon.com/365-Everyday-Value-Organic-Smokehouse/product-reviews/B07FWHFKGW/ref=cm_cr_arp_d_paging_btm_next_2?ie=UTF8&reviewerType=all_reviews&pageNumber=2"
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

            var review_body = document.querySelectorAll("div.review");
            
            for (var i = 0; i < review_body.length; i++) {

                var product_name = document.querySelector("div.product-title").innerText;
                    product_name = product_name.replace(/\s\,/gi,'_').toLowerCase();

                var product_brand = "hormel";

                var marketplace = "amazon";

                var author_nickname = review_body[i].querySelector("span.a-profile-name").innerText.trim();
                    author_nickname = author_nickname.replace(re_1," ");
                    author_nickname = author_nickname.replace(re_2,"");
                    author_nickname = author_nickname.replace(re_3," ");
                    author_nickname = author_nickname.replace(re_4," percent");
                    author_nickname = author_nickname.replace(re_5," ");

                var review_rating = review_body[i].querySelector("a[title*=stars]").innerText.substring(0,1);

                var review_title = review_body[i].querySelector("a.review-title").innerText.trim();
                    review_title = review_title.replace(re_1," ");
                    review_title = review_title.replace(re_2,"");
                    review_title = review_title.replace(re_3," ");
                    review_title = review_title.replace(re_4," percent");
                    review_title = review_title.replace(re_5," ");

                var review_text = review_body[i].querySelector("div.review-data span.review-text").innerText.trim();
                    review_text = review_text.replace(re_1," ");
                    review_text = review_text.replace(re_2,"");
                    review_text = review_text.replace(re_3," ");
                    review_text = review_text.replace(re_4," percent");
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

