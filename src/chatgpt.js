const key = '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'

const Letter = async (item) =>
{
    const question = await item2jobpost(item)
    const coverltr  = await chat(question)
    
    return coverltr
}

export default Letter;

async function chat(message) 
{
    const url = 'https://api.openai.com/v1/chat/completions';

    const body = JSON.stringify({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
      temperature: 0.8,
    })

    const headers = { 'Content-Type':'application/json', Authorization:`Bearer ${key}`}
    const options = { method:'POST', headers, body }
  
    let content = ''
    try {
      const response = await fetch(url, options)
      const responseData = await response.json()
      content = responseData.choices[0].message.content
    } catch (error) {
      const errorData = await error.json()
      const type = errorData.error.type.split('_').join(' ')
      const errorMessage = errorData.error.message
      content = `${type}: ${errorMessage}`
    }
  
    return content
}

function generateJobDescription() 
{
  return `- This is a job description for "{{ title }}":
  {{ description }}.

  - These are the required skills for the job:
  {{ skills }}.

  - Fill the blanks in this template:

  Hi! I will gladly help you _________________.

  As I am a senior software engineer with all corresponding accreditations, I can swiftly _____________ your ________.

  Thank you very much for considering my proposal, as I have intended each of these words and I really think I am a great fit for this challenge.

  Yours sincerely,
  Luis Andrés.

  PS: We can have a quick chat to explore options for reducing the budget and tightening the deadlines.`;
}

async function item2jobpost(item)
{
  const modifiedData = generateJobDescription()
    .replace('{{ title }}', html2txt(item.title))
    .replace('{{ description }}', html2txt(item.description))
    .replace('{{ skills }}', skills2show(item.skills))

  return modifiedData.replace(/\n/g, '\\n');
}

function html2txt(htmlString) 
{
    const aux = document.createElement('div'); // aux DOM element
    aux.innerHTML = htmlString;
    
    aux.querySelectorAll('br').forEach(br =>  // Replace <br> tags with spaces
    {
      br.insertAdjacentHTML('beforebegin', ' ');
      br.remove();
    });
    
    return aux.textContent || aux.innerText || ''
}

function skills2show(reqskills) 
{
    reqskills = reqskills.split(', ')
    const ownskills = [].concat(front, back, desk, dbase, proto, infra, other)
    const intersection = ownskills.filter(value => reqskills.includes(value));

    return intersection.join(', ')
}

const front = ['Front-End Development','JavaScript', 'React', 'Vue.js', 'Tailwind CSS', 'jQuery', 'Bootstrap', 'React Native', 'Responsive Design', 'HTML', 'CSS' ]
const back  = ['Back-End Development', 'PHP', 'Custom PHP', 'Laravel', 'Node.js', 'NodeJS Framework', 'ExpressJS', 'API Integration', 'API' ]
const desk  = ['Visual Basic for Applications', 'Microsoft Access Programming']
const dbase = ['SQL', 'Database Design', 'MS-SQL', 'MySQL', 'SQLite', 'PostgreSQL', 'MariaDB', 'Microsoft Access']
const proto = ['WebSockets', 'AJAX', 'JSON', 'XML']
const infra = ['AWS Lambda', 'AWS CloudFront', 'Google Cloud Platform', 'DigitalOcean', 'Microsoft Azure']
const other = ['Web Development', 'Web Application', 'SaaS']
