
// fetch api data by url
const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNav(data.data))
}
// display nav title
const displayNav = navigation => {
    const container = document.getElementById("nav");
    navigation.news_category.forEach(cat => {
        const li = document.createElement('li');
        li.classList.add('list-none')
        li.innerHTML = `
        <a class="font-semibold" onclick="showCatNews('${cat.category_id}')" href="#">${cat.category_name}</a>
        `;
        container.appendChild(li);
    });
}
// show category new
const showCatNews = catId => {
    const url = `https://openapi.programming-hero.com/api/news/category/${catId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCard(data.data))
}
// show cat news on card
const displayCard = data => {
    // console.log(data.length)
    document.getElementById("recent").innerText = data.length + ' ' + 'recent post in this category!!';
    const container = document.getElementById("article-area");
    container.textContent = '';
    data.forEach(details => {
        const createDiv = document.createElement('div');
        createDiv.classList.add('mb-4');
        createDiv.innerHTML = `
            <div class="card p-4 grid grid-cols-3 bg-gray-200 shadow-xl">
                <div>
                    <img class="w-full h-full" src="${details.image_url}" alt="" />
                </div>
                <div class="col-span-2 p-2">
                    <span>${details.author.published_date}</span>
                    <h2 class="font-semibold text-2xl py-2">${details.title}</h2>
                    <p>${details.details.slice(1, 180)}...</p>
                </div> 
                <div class="flex justify-around p-2">
                    <div>hello</div>
                    <div>now</div>
                    <div>func</div>
                </div>
            </div>
        `;
        container.appendChild(createDiv);
    });
}



const allNews = id => {
    fetch('https://openapi.programming-hero.com/api/news/category/08')
        .then(res => res.json())
        .then(data => displayAll(data.data))
}
const displayAll = data => {
    const container = document.getElementById("post");
    data = data.slice(0, 7);
    data.forEach((singleNews) => {
        const {image_url, title, details, author, total_view} = singleNews;
        const createDiv = document.createElement('div');
        createDiv.classList.add('mb-4');
        createDiv.innerHTML = `
            <div class="card p-4 grid grid-cols-3 bg-gray-200 shadow-xl">
            <div>
                <img class="w-full h-full" src="${image_url}" alt="" />
            </div>
            <!-- img area closed -->
            <div class="col-span-2 p-2">
                <h2 class="font-semibold text-2xl py-2">${title}</h2>
                <p>${details.slice(1, 180)}...</p>
                <div class="flex justify-around p-2">
                    <div>
                        <div class="flex items-center space-x-4">
                            <img class="w-10 h-10 rounded-full" src="${author.img}" alt="">
                            <div class="font-medium dark:text-white">
                                <div>${author.name}</div>
                                <div class="text-sm text-gray-500 dark:text-gray-400">
                                    ${author.published_date}</div>
                            </div>
                        </div>
                    </div>
                    <!-- autor img closed here -->
                    <div><i class="fa-solid fa-eye"></i> ${total_view}</div>
                    <!-- modal area start here -->
                    <p class="btn">Details</p>
                </div>
            </div>
            </div>
        `;
        container.appendChild(createDiv)
    });
}


allNews()