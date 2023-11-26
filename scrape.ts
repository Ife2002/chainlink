import axios from 'axios';
import cheerio from 'cheerio';

async function fetchHTML(url: any) {
    const { data } = await axios.get(url);
    return data;
  }

  function extractData(html: any) {
    const $ = cheerio.load(html);
  
    // Use jQuery-like selectors to extract data
    const title = $('title').text();
    const links = $('a').map((index, element) => $(element).attr('href')).get();
  
    return { title, links };
  }
   

  async function runScraper(url: any) {
    try {
      const html = await fetchHTML(url);
      const data = extractData(html);
      console.log('Scraped Data:', data.title);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
  
  const targetUrl = 'https://polygonscan.com/address/0x00000000000000adc04c56bf30ac9d3c0aaf14dc';
  runScraper(targetUrl);
  
