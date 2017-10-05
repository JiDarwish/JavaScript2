const hyfUrl = "https://api.github.com/orgs/HackYourFuture/repos"; //api url

//div stores all the repositories
let allDiv = document.createElement("div");
allDiv.setAttribute("id", "allRepoContainer");
document.body.appendChild(allDiv);

// div for all repo's searched for
let searchDiv = document.createElement("div");
searchDiv.setAttribute("id", "searchedContainer");
document.body.appendChild(searchDiv);

//clearing all the repos
let allRepoClearer = document.getElementById("repoEraser");
allRepoClearer.onclick = function () {
    allDiv.innerHTML = "";
    searchDiv.innerHTML = "";
};

//  XHR Get request + a callback as parameter
function XHR(theUrl, callback) {
    let request = new XMLHttpRequest();
    request.open("GET", theUrl, true);
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState < 4) {
            //do sth
        } else if (request.readyState === 4 && request.status === 200) {

            let data = JSON.parse(request.responseText);
            callback(data);
        }
    }
}

// button calls XHR and passes allRepoRender
let repoRender = document.getElementById("repoRender");
repoRender.onclick = function () {
    allDiv.innerHTML = "";
    XHR(hyfUrl, allRepoRender); // calling the XHR and adding a callback to display repos
}


// create elements to contain all repos
function allRepoRender(theData) {
    let ul = document.createElement("ul"); // ul creater
    allDiv.appendChild(ul);
    //loop prints all repos name into fitting elements
    for (i in theData) {
        let li = document.createElement("li");
        li.setAttribute("class", "oneOfAll");
        let h3 = document.createElement("h3");
        h3.innerHTML = theData[i].name;
        li.appendChild(h3);
        let link = document.createElement("a");
        link.setAttribute("href", "https://github.com/HackYourFuture/" + theData[i].name);
        link.innerHTML = "here";
        let p = document.createElement("p");
        p.innerHTML = "A link to the course: ";
        p.appendChild(link);
        li.appendChild(p);
        ul.appendChild(li);
    }
}



// button will call XHR func passing in the repo url and callback searched 
let searchButton = document.getElementById("findRepo");
searchButton.onclick = function () {
    searchDiv.innerHTML = "";
    let repoName = document.getElementById("searchText").value;
    XHR(getRepoUrl(repoName), searched);
}

//functions gets the repo url accourding to user input
function getRepoUrl(repo) {
    let generalUrl = "https://api.github.com/repos/HackYourFuture/";
    let repoUrl = generalUrl + repo;
    return repoUrl;
}


function searched(theData) {

    let searchedHeader = document.createElement("div");
    searchedHeader.setAttribute("id", "searchedHeader");

    let ul = document.createElement("ul");
    ul.setAttribute("id", "contriItemsParent");
    let h2 = document.createElement("h2");
    h2.innerHTML = theData.name;
    let h3 = document.createElement("h3");
    h3.innerHTML = "Awesome contributers: ";
    searchedHeader.appendChild(h2);
    searchedHeader.appendChild(h3);
    searchDiv.appendChild(searchedHeader);
    searchDiv.appendChild(ul);
    let contrUrl = getRepoUrl(theData.name) + "/contributors";
    XHR(contrUrl, displayContributers);


}

function displayContributers(theData) {
    let ul = document.getElementById("contriItemsParent");
    for (i in theData) {
        let li = document.createElement("li");
        li.setAttribute("class", "contriItems");
        let h4 = document.createElement("h4");
        h4.innerHTML = theData[i].login;
        let link = document.createElement("a");
        link.setAttribute("href", theData[i].html_url);
        link.setAttribute("alt", theData[i].login + "'s photo");
        link.setAttribute("title", "check out " + theData[i].login + "'s github");
        let img = document.createElement("img");
        img.setAttribute("alt", "contributer's name");
        img.setAttribute("src", theData[i].avatar_url);
        link.appendChild(img);
        li.appendChild(link);
        li.appendChild(h4);
        ul.appendChild(li);
    }
}
