var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var visitBtns;
var indexFinder = 0;

var bookmarks = [];


if(getBookmarks()){
    bookmarks = getBookmarks()
}

display()

function saveBookmarks(){
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
}

function getBookmarks(){
    return JSON.parse(localStorage.getItem("bookmarks"))
}

function addBook(){
    var bookmark = {
        name :bookmarkName.value,
        src: bookmarkURL.value, 
    }
    bookmarks.push(bookmark);
    saveBookmarks()
    display()
    clearInput()
}

function display(){
    var cartoon = "";
    for (var i = 0 ; i < bookmarks.length ; i++){
        cartoon += `
            <tr>
                <td>${i + 1}</td>
                <td>${bookmarks[i].name}</td>       
                <td>
                  <button class="btn btn-visit" onclick="visitWebsite(${i})" data-index="${i}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" onclick="removeBookmark(${i})" data-index="${i}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
        `;
    }
    tableContent.innerHTML = cartoon;
}

function removeBookmark(k){

    bookmarks.splice(k,1);
    saveBookmarks();
    display();
}
function clearInput() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
  }

  function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].src)) {
      open(bookmarks[websiteIndex].siteURL);
    } else {
      open(`https://${bookmarks[websiteIndex].src}`);
    }
  }
  
  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }


