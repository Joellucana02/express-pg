$(document).ready(() => {
  const $container = $("#container");
  $.getJSON("http://localhost:3000/fishes").then((fishes) => {
    fishes.forEach((fish) => {
      let $newFish = $("<li>", {
        html: `${fish.name} ${fish.type}
        <button class="delete">X</button>
        `,
        "data-id": `${fish.id}`,
      });
      $container.append($newFish);
      console.log("this is a fish", fish);
    });
  });
});
$("#new-fish-form").on("submit", (e) => {
  e.preventDefault();
  const $container = $("#container");
  console.log("0000000000000000000000");
  const name = $("#name").val();
  const type = $("#type").val();

  $.post("http://localhost:3000/fishes", { name, type }).then((e) => {
    let $newFish = $("<li>", {
      text: `${e.name} ${e.type},
      <button class='delete'>X</button>`,
      "data-id": `${e.id}`,
    });
    $container.append($newFish);
    $("#new-fish-form").trigger("reset");
  });
});

$("#container").on("click", ".delete", (e) => {
  e.preventDefault();
  console.log("-----------------------");
  console.log(e.target);

  const id = $(e.target).parent().data("id");

  const type = $.ajax({
    method: "DELETE",
    url: `http://localhost:3000/fishes/${id}`,
  }).then((e) => {
    $(e.target).parent().remove();
  });
});
