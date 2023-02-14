let APIaddress = "34.105.1.151";

function FetchMenu() {
  fetch("http://" + APIaddress + "/fetch-menu")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lastMonth = date.setMonth(date.getMonth() - 1);
      document.getElementById("popular_menu").innerHTML =
        "<div>" +
        (date.getMonth() + 1) +
        "月のNo.1メニュー</div><div>" +
        data.menu_name[0].menu_name +
        "</div>";
    });
}

function FetchMenus() {
  fetch("http://" + APIaddress + "/fetch-menus")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let menusHTML = "";
      for (let i = 0; i < data.menus.length; i++) {
        menusHTML +=
          "<div class='radio_button'><input type='radio' name='menus' id=" +
          (i + 1) +
          " value=" +
          data.menus[i].menu_id +
          "><label for=" +
          (i + 1) +
          ">" +
          data.menus[i].menu_name +
          "</label></div>";
      }
      document.getElementById("request_menus").innerHTML = menusHTML;
      CheckCookie();
    });
}

function VoteMenu() {
  elements = document.getElementsByName("menus");
  for (let i = 0; i < elements.length; i++) {
    if (elements.item(i).checked) {
      fetch("http://" + APIaddress + "/vote-menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ menu_id: elements.item(i).value }),
      }).then(function () {
        CheckCookie();
      });
      break;
    }
  }
}

function AddMenu() {
  fetch("http://" + APIaddress + "/add-menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      menu_name: document.getElementById("menu_text").value,
    }),
  });
}
