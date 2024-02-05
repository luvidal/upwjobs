import { parseString } from 'xml2js'

const proxy = 'https://izgeif5siijuvo3hnb63yodxfe0lslmz.lambda-url.us-east-1.on.aws/'

const Upwork = async q => 
{
    q.contractor_tier = 3
    q.connect_price = 16
    q.verified_payment_only = 1
    
    q.sort = 'recency'
    q.subcategory2_uid = '531770282589057025,531770282589057032,531770282589057028,531770282584862733'
    q.api_params = 1
    q.securityToken = 'b3dfc26d3cf77f129f7713456e1592d9ef4de1a7008f87292665198a5116eb5cd99cd191daa8b871333770b12455bb6b6d3838922b433e50526ac54b52ce79b6'
    q.userUid = '757653532002590720'
    q.orgUid = '757653532002590722'

    const query = Object.keys(q).map(key => key + '=' + encodeURIComponent(q[key])).join('&')

    return fetch(`${proxy}?${query}`)
        .then(response => response.text())
        .then(xml => xml2arr(xml))
        .catch(error => {
            console.error('RSS fetch error', error);
            throw error;
        })
}

export default Upwork

// ------------------------------------------------------------------------------------------------------------------------------------------------

function xml2arr(xml) 
{
    let arr = [];
    parseString(xml, (error, result) => 
    {
        if (error) throw new Error('Failed to parse XML');
        const items = result.rss.channel[0].item
        arr = items ? items.map(item => gigObject(item)) : []
    })

  return arr;
}

function gigObject(item, age = 10)
{
    const title = item.title[0].decodeHTML().replace(' - Upwork', '')
    const link = decodeURIComponent(item.link[0]).split('?')[0]
    const jobid = link.split('~')[1]
    const date = (new Date(item.pubDate[0])).toLocaleString('es-CL', { dateStyle:'short', timeStyle:'short', timeZone:'America/Santiago' })
    const inputString = item.description[0].removeExtraSpaces()
    const young = (item.pubDate[0].getMinutesPassed() < age)

    // Match the information using regular expressions
    const budgetMatch = inputString.match(/<b>Budget<\/b>: ([^<]+)/);
    const hourlyMatch = inputString.match(/<b>Hourly Range<\/b>: ([^<]+)/);
    const categoryMatch = inputString.match(/<b>Category<\/b>: ([^<]+)/);
    const skillsMatch = inputString.match(/<b>Skills<\/b>: ([^<]+)/);
    const countryMatch = inputString.match(/<b>Country<\/b>: ([^<]+)/);

    // Extract the matched information or set to 'undefined' if not found
    const budget = budgetMatch ? budgetMatch[1].trim() : undefined;
    const hourly = hourlyMatch ? hourlyMatch[1].trim() : undefined;
    const category = categoryMatch ? categoryMatch[1].trim().decodeHTML() : undefined;
    const skills = skillsMatch ? skillsMatch[1].trim() : undefined;
    const country = countryMatch ? countryMatch[1].trim() : undefined;

    // Remove the the "table" in the bottom and decode
    const description = inputString.split('<br /><br /><b>')[0].decodeHTML()

    return { jobid, title, budget, hourly, date, young, category, skills, country, link, description }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------

String.prototype.removeExtraSpaces = function() 
{
    return this.replace(/\s+/g, ' ').trim();
};

String.prototype.getMinutesPassed = function() 
{
  const startDate = new Date(this)
  const now = new Date()
  const diffInMinutes = Math.floor((now - startDate) / 60000) // Calculate the difference in minutes

  return diffInMinutes
}

String.prototype.decodeHTML = function() {
  const entities = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'", }

  return this.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(entity) {
    return entities[entity] || entity
  })
}
