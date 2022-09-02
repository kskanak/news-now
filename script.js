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
    
    <li onclick = "loadCatagoryNews('${category_id}')"><a class="link link-hover" href=" # ">${category_name}</a></li>
    
    `;
    // appending ul to container
    catagoryContainer.appendChild(li);
  });
};

//  loading catogory news by catagory id
const loadCatagoryNews = async (catagoryid) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${catagoryid}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCatagoryNews(data.data);
  } catch (error) {
    console.log(error);
  }
};

// displaying catogory news

const displayCatagoryNews = (catagoryNewsArray) => {
  console.log(catagoryNewsArray);
  //  looping through array
  catagoryNewsArray.forEach((news) => {
    console.log(news);
  });
};
loadCatagory();
