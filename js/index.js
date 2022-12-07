
function userSearcher(userName) {
  fetch(`https://api.github.com/search/users?q=${userName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/vnd.github.v3+json",
    },
  })
    .then((response) => response.json())
    .then(
      (userNames) => {
        let arrayOfUsers = userNames.items;
        for (items of arrayOfUsers) {
          let li;
          li = document.createElement("li");
          li.className = "userList";
          document.querySelector("#user-list").append(li);
          li.textContent = items["login"];
        }
      }
      //     function addElements(){

      //   }
    );
}
const searchInput = document.querySelector("#github-form");
searchInput.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchName = event.target.search.value;
  userSearcher(searchName);
  fetch(`https://api.github.com/users/${searchName}/repos`)
    .then((response) => response.json())
    .then((repositories) => {
      console.log(repositories);
      let searchedUser = document.querySelector("li.userList");
      searchedUser.addEventListener("click", function () {
        console.log(repositories);
        for (repository of repositories) {
          let repoList = document.createElement("li");
          document.querySelector("ul#repos-list").append(repoList);
          repoList.textContent = repository["name"];
          }
      });
    });
});

// When the form is
//submitted, it should take the value of the
// input and search GitHub for user
//matches using the [User Search Endpoint]
//(#user-search-endpoint).
//display information about the users
//Clicking on one of these users should
// return data about all the
//repositories for that user