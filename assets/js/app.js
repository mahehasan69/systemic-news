const heroImage = document.getElementById("heroImage");
const heroTitle = document.getElementById("heroTitle");
const heroSummary = document.getElementById("heroSummary");
const heroCategory = document.getElementById("heroCategory");
const heroLink = document.getElementById("heroLink");

const newsGrid = document.getElementById("newsGrid");
const trendingNews = document.getElementById("trendingNews");

const searchBox = document.getElementById("searchBox");
const themeButton = document.getElementById("themeButton");

let NEWS = [];

async function loadNews(){

    try{

        const response = await fetch("./news/news.json");

        if(!response.ok){

            throw new Error("Unable to load news.");

        }

        NEWS = await response.json();

        console.log("Loaded:",NEWS);

        if(NEWS.length===0){

            heroTitle.textContent="No News Available";

            heroSummary.textContent="The news feed is currently empty.";

            return;

        }

        buildHero();

        buildLatest();

        buildTrending();

    }

    catch(error){

        console.error(error);

        heroTitle.textContent="Failed to load news.";

        heroSummary.textContent="Please refresh later.";

    }

}

function buildHero(){

    const article = NEWS[0];

    heroImage.src = article.image;

    heroImage.onerror = ()=>{

        heroImage.src="assets/images/placeholder.jpg";

    };

    heroTitle.textContent=article.title;

    heroSummary.textContent=article.summary;

    heroCategory.textContent=article.category;

    heroLink.href=article.url;

}

function createCard(article){

    return `

    <article class="news-card">

        <img
            src="${article.image}"
            alt="${article.title}"
            onerror="this.src='assets/images/placeholder.jpg'">

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

                    ${article.time}

                </span>

                <a href="${article.url}">

                    Read →

                </a>

            </div>

        </div>

    </article>

    `;

}

function buildLatest(){

    newsGrid.innerHTML="";

    NEWS.slice(1).forEach(article=>{

        newsGrid.innerHTML += createCard(article);

    });

}

function buildTrending(){

    trendingNews.innerHTML="";

    NEWS.slice(0,4).forEach(article=>{

        trendingNews.innerHTML += createCard(article);

    });

}

searchBox.addEventListener("input",()=>{

    const keyword =

        searchBox.value

        .trim()

        .toLowerCase();

    if(keyword===""){

        buildLatest();

        return;

    }

    const result = NEWS.filter(article=>

        article.title.toLowerCase().includes(keyword)

        ||

        article.summary.toLowerCase().includes(keyword)

        ||

        article.category.toLowerCase().includes(keyword)

    );

    newsGrid.innerHTML="";

    result.forEach(article=>{

        newsGrid.innerHTML += createCard(article);

    });

});

/* ===========================
   THEME
=========================== */

themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    const light =

        document.body.classList.contains("light");

    localStorage.setItem(

        "theme",

        light ? "light" : "dark"

    );

    themeButton.textContent =

        light ? "☀️" : "🌙";

});

(function(){

    const theme =

        localStorage.getItem("theme");

    if(theme==="light"){

        document.body.classList.add("light");

        themeButton.textContent="☀️";

    }

})();

/* ===========================
   CARD CLICK
=========================== */

document.addEventListener(

    "click",

    (e)=>{

        const card =

            e.target.closest(".news-card");

        if(!card) return;

        const link =

            card.querySelector("a");

        if(link){

            window.location.href =

                link.href;

        }

    }

);

/* ===========================
   PAGE LOAD
=========================== */

window.addEventListener(

    "load",

    ()=>{

        loadNews();

    }

);

