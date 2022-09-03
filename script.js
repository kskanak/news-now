//  fetching data from url

const loadCatagory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCatagory(data.data.news_category);
  } catch (error) {
    console.log(error);
  }
};

//  display catagory
const displayCatagory = (catagoryArray) => {
  // catching catagory container
  const catagoryContainer = document.getElementById("catagory-container");

  // looping through array
  catagoryArray.forEach((catagoryName) => {
    // destructuring catagoryName
    const { category_id, category_name } = catagoryName;

    // making ul for catagory
    const li = document.createElement("li");

    //  writing inneHTML
    li.innerHTML = `
    
    <li onclick = "loadCatagoryNews('${category_id}', '${category_name}')"><a class="link link-hover" href=" # ">${category_name}</a></li>
    
    `;
    // appending ul to container
    catagoryContainer.appendChild(li);
  });
};

//  loading catogory news by catagory id
const loadCatagoryNews = async (catagoryid, catagoryName) => {
  // setting preload
  document.getElementById("preloader").classList.remove("hidden");

  const url = `https://openapi.programming-hero.com/api/news/category/${catagoryid}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCatagoryNews(data.data, catagoryName);
  } catch (error) {
    console.log(error);
  }
};
loadCatagoryNews("02");
// displaying catogory news

const displayCatagoryNews = (catagoryNewsArray, catagoryName) => {
  // news result setting
  if (catagoryNewsArray.length === 0 || catagoryNewsArray === null) {
    document.getElementById("result").innerText = `No News  Available`;
    document.getElementById("preloader").classList.add("hidden");
  } else {
    document.getElementById("result").innerText = `${
      catagoryNewsArray.length
    } Items for Catagory ${catagoryName ? catagoryName : ""}`;
    document.getElementById("preloader").classList.add("hidden");
  }

  // sorting by newsView count
  const sortArray = catagoryNewsArray.sort(
    ({ total_view: a }, { total_view: b }) => b - a
  );

  // fetching newsContainer
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.textContent = "";

  //  looping through array
  sortArray.forEach((news) => {
    // destructuring news

    const {
      thumbnail_url,
      title,
      author,
      details,
      total_view,
      published_date,
      rating,
      _id,
    } = news;

    const { number } = rating;
    const { img, name } = author;

    // creating card div
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `

    <div
    class="card lg:card-side bg-base-100 shadow-xl border-slate-200 border-2 text-slate-700"
  >
    <figure>
      <img src="${
        thumbnail_url ? thumbnail_url : "N/A"
      }" alt="news_thumbnail" class= "w-full lg:w-72 p-4"/>
    </figure>
    <div class="card-body ">
      <h2 class="card-title">${title ? title : "N/A"}</h2>
      <p>${details ? details.slice(0, 300) : "N/A"} ....</p>
      <div
        class="card-footer sm:flex justify-between font-semibold items-center text-purple-700"
      >
     
        <div class="author flex items-center mr-3">
 
          <img
            src="${img ? img : "N/A"}"
            alt="author_img"
            class="mask mask-circle h-10"
          />
   
          <div class="author-name ml-3">
            <h6 class="text-xs">${name ? name : "N/A"}</h6>
            <h6 class="text-xs">${published_date ? published_date : "N/A"}</h6>
          </div>
        </div>

       
        <div class="viewNews my-4 flex">
          <div>
          <i class="fa-solid fa-eye"></i>
          <small>
          ${total_view ? total_view : "N/A"}</small>
          </div>

          <div class="ratings ml-16 md:ml-28">
          <small>Ratings: ${number ? number : "N/A"} </small>
           </div>
        </div>

        
        

        <div class="card-actions justify-center md:justify-end mt-2 sm:mt-0">
     
          <label for="my-modal" class="btn modal-button bg-purple-800 text-white" onclick = "loadDetails('${_id}')""> Detail News</label>
        </div>
      </div>
      <!-- card btn -->
    </div>
  </div>

    `;
    // appending
    newsContainer.appendChild(newsDiv);
  });
};

// loading news details from details API

const loadDetails = async (deitalsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${deitalsId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // displayDetails(data.data[0]);
    displayDetails(data.data[0]);
  } catch (error) {
    console.log(error);
  }
};

const displayDetails = (newsDeitals) => {
  // destructuring
  const { image_url, title, others_info, details, rating, total_view, author } =
    newsDeitals;
  const { is_trending } = others_info;
  const { badge } = rating;
  const { name } = author;

  //  details container
  const detailsContainer = document.getElementById("detailsContainer");
  detailsContainer.innerHTML = `

  <img src="${image_url}" alt="" class= "h-full"/>

  <div class="details-content mt-10">
    <h3 class="font-bold text-xl text-purple-500">Title : ${title}</h3>
    <h3 class="font-semibold text-lg text-purple-500">Author : ${
      name ? name : "N/A"
    }</h3>
  
    <h3 class="font-semibold text-lg text-purple-500">
      News : ${is_trending ? "Trending" : "Not Trending"}
    </h3>
  
    <h3 class="font-semibold text-lg text-purple-500">
      Review : ${badge}
    </h3>
  
    <h3 class="font-semibold text-lg text-purple-500">
      Total_View : ${total_view ? total_view : "N/A"}
    </h3>
  
    <p class="py-4 text-slate-700 text-sky-500">
      <span class="text-purple-500 text-lg font-semibold"
        >Details</span
      >
      : ${details}
    </p>
  
  </div>

  `;
};

loadCatagory("s");
