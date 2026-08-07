const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");
const heroSummary = document.getElementById("heroSummary");
const heroCategory = document.getElementById("heroCategory");
const heroLink = document.getElementById("heroLink");

const newsGrid = document.getElementById("newsGrid");
const trendingGrid = document.getElementById("trendingNews");

const searchBox = document.getElementById("searchBox");
const themeButton = document.getElementById("themeButton");

let NEWS = [];

async function loadNews() {

    try {

        const response = await fetch("news/news.json");

        NEWS = await response.json();

        if (!NEWS.length) return;

        buildHero();

        buildLatest();

        buildTrending();

    }

    catch (err) {

        console.error(err);

    }

}

function buildHero() {

    if (!NEWS.length) return;

    const article = NEWS[0];

    heroImage.src =
        article.image || "assets/images/placeholder.jpg";

    heroTitle.textContent =
        article.title || "No title";

    heroSummary.textContent =
        article.summary || "";

    heroCategory.textContent =
        article.category || "News";

    heroLink.href =
        article.url || "#";

}

function createCard(article){

    return `

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

                <span>${article.time}</span>

                <a href="${article.url}">

                    Read →

                </a>

            </div>

        </div>

    </article>

    `;

}
function buildLatest(){

    newsGrid.innerHTML = "";

    NEWS.slice(1,13).forEach(article=>{

        newsGrid.innerHTML += createCard(article);

    });

}

function buildTrending(){

    trendingGrid.innerHTML = "";

    NEWS.slice(0,4).forEach(article=>{

        trendingGrid.innerHTML += createCard(article);

    });

}

searchBox.addEventListener("input",()=>{

    const keyword = searchBox.value
        .toLowerCase()
        .trim();

    if(keyword===""){

        buildLatest();

        return;

    }

    const results = NEWS.filter(article=>{

        return (

            article.title
            .toLowerCase()
            .includes(keyword)

            ||

            article.summary
            .toLowerCase()
            .includes(keyword)

            ||

            article.category
            .toLowerCase()
            .includes(keyword)

        );

    });

    newsGrid.innerHTML="";

    results.forEach(article=>{

        newsGrid.innerHTML += createCard(article);

    });

});
themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    const light = document.body.classList.contains("light");

    localStorage.setItem(

        "theme",

        light ? "light":"dark"

    );

    themeButton.innerHTML =

        light ? "☀️":"🌙";

});

(function(){

    const theme =

        localStorage.getItem("theme");

    if(theme==="light"){

        document.body.classList.add("light");

        themeButton.innerHTML="☀️";

    }

})();

document.addEventListener(

    "click",

    (e)=>{

        const card = e.target.closest(".news-card");

        if(!card) return;

        const link =

        card.querySelector("a");

        if(link){

            window.location =

            link.href;

        }

    }

);

window.addEventListener(

    "load",

    ()=>{

        loadNews();

    }

);
