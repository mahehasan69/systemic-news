const params = new URLSearchParams(
    window.location.search
);

const articleId = params.get("id") || "0";

let NEWS = [];

async function loadArticle() {

    const response = await fetch(
        "news/news.json"
    );

    NEWS = await response.json();

    const article = NEWS[articleId];

    if (!article) {

        document.body.innerHTML =
        "<h1>Article Not Found</h1>";

        return;

    }

    renderArticle(article);

    renderRelated(article);

}

function renderArticle(article){

    document.title =
    article.title + " | SYSTEMIC NEWS";

    document.getElementById(
        "articleTitle"
    ).textContent = article.title;

    document.getElementById(
        "articleCategory"
    ).textContent = article.category;

    document.getElementById(
        "articleDate"
    ).textContent = article.date;

    document.getElementById(
        "readingTime"
    ).textContent =
    article.reading_time;

    document.getElementById(
        "articleImage"
    ).src = article.image;

    document.getElementById(
        "articleContent"
    ).innerHTML = article.content;

    buildFacts(article);

    buildTimeline(article);

    buildSources(article);

    buildConfidence(article);

}
function buildFacts(article){

    const list =
    document.getElementById(
        "factList"
    );

    list.innerHTML = "";

    (article.facts || []).forEach(fact=>{

        list.innerHTML +=
        `<li>${fact}</li>`;

    });

}

function buildTimeline(article){

    const box =
    document.getElementById(
        "timeline"
    );

    box.innerHTML = "";

    (article.timeline || []).forEach(item=>{

        box.innerHTML += `

        <div class="timeline-item">

            ${item}

        </div>

        `;

    });

}

function buildSources(article){

    const box =
    document.getElementById(
        "sources"
    );

    box.innerHTML = "";

    (article.sources || []).forEach(source=>{

        box.innerHTML += `

        <span class="source-tag">

            ${source}

        </span>

        `;

    });

}

function buildConfidence(article){

    document.getElementById(
        "confidenceScore"
    ).textContent =
    (article.confidence || 100) + "%";

}
function renderRelated(current){

    const grid = document.getElementById(
        "relatedNews"
    );

    grid.innerHTML = "";

    NEWS
    .filter(item=>item.title!==current.title)
    .slice(0,6)
    .forEach((article,index)=>{

        grid.innerHTML += `

        <article class="news-card">

            <img src="${article.image}" alt="">

            <div class="news-content">

                <div class="news-category">

                    ${article.category}

                </div>

                <h3 class="news-title">

                    ${article.title}

                </h3>

                <p class="news-summary">

                    ${article.summary}

                </p>

                <div class="news-footer">

                    <span>

                        ${article.date}

                    </span>

                    <a href="article.html?id=${index}">

                        Read →

                    </a>

                </div>

            </div>

        </article>

        `;

    });

}

window.addEventListener(

    "load",

    ()=>{

        loadArticle();

    }

);
