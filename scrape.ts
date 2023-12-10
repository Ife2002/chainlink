import axios from 'axios';
import cheerio from 'cheerio';

async function fetchHTML(url: any) {
    const { data } = await axios.get(url);
    return data;
  }

  function extractData(html: any) {
    const $ = cheerio.load(html);
  
    // Use jQuery-like selectors to extract data from div elements
    const title = $('title').text();
    const divData: string[] = [];
    
    $('div').each((index, element) => {
      // Modify the following line based on the structure of your div elements
      const divText = $(element).text();
      
      // You can also extract specific attributes from the div element if needed
      // const divAttribute = $(element).attr('your-attribute-name');
  
      divData.push(divText);
    });
  
    return {
      title,
      divData,
    };
  }
   

  async function runScraper(url: any) {
    try {
      const html = await fetchHTML(url);
      const data = extractData(html);
      console.log('Scraped Data:', data);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  }
  
  const targetUrl = 'https://birdeye.so/token/8c71AvjQeKKeWRe8jtTGG1bJ2WiYXQdbjqFbUfhHgSVk?chain=solana';
  runScraper(targetUrl);
  
