const title = document.getElementById("title");
const category = document.getElementById("category");
const image = document.getElementById("image");
const content = document.getElementById("content");

const author = document.getElementById("author");
const date = document.getElementById("date");
const readingTime = document.getElementById("readingTime");

const confidence = document.getElementById("confidence");

const facts = document.getElementById("facts");
const timeline = document.getElementById("timeline");
const sources = document.getElementById("sources");

function getArticleId(){

    const params = new URLSearchParams(window.location.search);

    const id = parseInt(params.get("id"));

    return isNaN(id) ? 1 : id;

}

async function loadArticle(){

    try{

        const response = await fetch("./news/news.json");

        const news = await response.json();

        const id = getArticleId();

        const article = news.find(n => n.id == id);

        if(!article){

            title.textContent = "Article not found";

            return;

        }

        renderArticle(article);

    }

    catch(err){

        console.error(err);

        title.textContent = "Unable to load article.";

    }

}

function renderArticle(article){

    document.title = article.title + " | SYSTEMIC NEWS";

    title.textContent = article.title;

    category.textContent = article.category;

    image.src = article.image;

    image.onerror = ()=>{

        image.src = "assets/images/placeholder.jpg";

    };

    content.textContent = article.content;

    author.textContent = "👤 " + article.author;

    date.textContent = "📅 " + article.date + " " + article.time;

    readingTime.textContent = "📖 " + article.reading_time;

    confidence.textContent = article.confidence + "%";

    facts.innerHTML = "";

    (article.facts || []).forEach(item=>{

        facts.innerHTML += `<li>${item}</li>`;

    });

    timeline.innerHTML = "";

    (article.timeline || []).forEach(item=>{

        timeline.innerHTML += `<li>${item}</li>`;

    });

    sources.innerHTML = "";

    (article.sources || []).forEach(item=>{

        sources.innerHTML += `<li>${item}</li>`;

    });

}

window.addEventListener(

    "load",

    loadArticle

);
