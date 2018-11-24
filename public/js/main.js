//css load spinner, hide slide content, add spinner
document.querySelector(".slides").style.display = "none";
document.querySelector(".slider").classList.add("spinner-1");
//mimic server request to wait 5sec then remove spinner, show slide content
setTimeout(() => {
  document.querySelector(".slider").classList.remove("spinner-1");
  document.querySelector(".slides").style.display = "block";
}, 5000);
//materialize js needed to make slider function
const slide = document.querySelectorAll(".slider");
M.Slider.init(slide, {
  indicators: false,
  height: 300,
  transition: 500,
  interval: 5000
});

//materialize js scrollspy Scroll down animation
const ss = document.querySelectorAll(".scrollspy");
M.ScrollSpy.init(ss, {});

//enable add job button, check if fields are empty when typing
const form = document.getElementById("form");
const addB = document.getElementById("addBtn");
let addDateValue = "";
let addCompValue = "";
let addPosValue = "";
let addSalValue = "";
form.addEventListener("keyup", function() {
  addDateValue = document.getElementById("date").value;
  addCompValue = document.getElementById("comp").value;
  addPosValue = document.getElementById("pos").value;
  addSalValue = document.getElementById("sal").value;
  if (
    addDateValue != "" &&
    addCompValue != "" &&
    addPosValue != "" &&
    addSalValue != ""
  ) {
    addB.classList.remove("disabled");
  } else {
    addB.classList.add("disabled");
  }
});

//add btn functionality to add job row to dom
addB.addEventListener("click", addJob);
function addJob() {
  let tBody = document.getElementById("jobs");
  let newRow = document.createElement("TR");

  let firstItem = document.createElement("TD");
  firstItem.innerHTML = `<td>${addDateValue}</td>`;

  let secondItem = document.createElement("TD");
  secondItem.innerHTML = `<td>${addCompValue}</td>`;

  let thirdItem = document.createElement("TD");
  thirdItem.innerHTML = `<td>${addPosValue}</td>`;

  let fourthItem = document.createElement("TD");
  fourthItem.innerHTML = `<td>${addSalValue}</td>`;

  let fifthItem = document.createElement("TD");
  fifthItem.innerHTML =
    '<a href="#form" class="scrollspy"><i class="material-icons editItem">edit</i></a><i class="material-icons red-text text-lighten-3 delItem">delete</i>';

  newRow.appendChild(firstItem);
  newRow.appendChild(secondItem);
  newRow.appendChild(thirdItem);
  newRow.appendChild(fourthItem);
  newRow.appendChild(fifthItem);
  tBody.insertBefore(newRow, tBody.childNodes[0]);

  //reset form input
  document.getElementById("comp").value = "";
  document.getElementById("pos").value = "";
  document.getElementById("sal").value = "";
}

//Materialize js intialize form select
document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, {});
});

//Get todays date and insert into form input
const today = new Date();
document.getElementById("date").value = `${today.getMonth() +
  1}/${today.getDate()}/${today.getFullYear()}`;

//filter event listener-> changes based on dropdown select
let filterOption = document.getElementById("options");
filterOption.addEventListener("change", function() {
  let opt = filterOption.options[filterOption.selectedIndex];
  document.getElementById("filterInput").placeholder = `Search by ${
    opt.text
  }...`;
});
//get input element
let filterInput = document.querySelector("#filterInput");
//add event listener
filterInput.addEventListener("keyup", filterJobs);

//get jobs table
let table = document.querySelector("#jobs");
//get tr from table
let tr = table.querySelectorAll("tr");

function filterJobs() {
  table = document.querySelector("#jobs");
  tr = table.querySelectorAll("tr");
  let filterValue = filterInput.value.toLowerCase();

  //loop through collection
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[filterOption.value];
    //if match
    if (td.innerHTML.toLowerCase().indexOf(filterValue) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

//in order to add functionality to all new items added, button element when table mousedown
table.addEventListener("mousedown", function() {
  const delButton = document.querySelectorAll(".delItem");
  const editButton = document.querySelectorAll(".editItem");
  for (let t = 0; t < delButton.length; t++) {
    delButton[t].addEventListener("click", deletedItem);
    editButton[t].addEventListener("click", editItem);
  }
});

//function to delete the row of selected when met with confirmation
function deletedItem(e) {
  let con = confirm("Are you sure you want to delete this item?");
  if (con) {
    e.target.parentElement.parentElement.remove();
    console.log("deleted...");
  }
}

//function to edit selected row when edit button is clicked(first click to edit, second to apply change)
function editItem(e) {
  let rowInputs = e.target.parentElement.parentElement.parentElement.children;
  if (!e.target.classList.contains("editing")) {
    e.target.classList.add("editing");
    //console.log("now editing");
    //disable add button while editing to prevent confusion
    addB.classList.add("disable");
    //Set form values to tr(row) values
    document.getElementById("date").value = `${rowInputs[0].innerHTML}`;
    document.getElementById("comp").value = `${rowInputs[1].innerHTML}`;
    document.getElementById("pos").value = `${rowInputs[2].innerHTML}`;
    document.getElementById("sal").value = `${rowInputs[3].innerHTML}`;

    //add class to form when editing for css difference
    for (let t = 0; t < form.children.length - 1; t++) {
      form.children[t].classList.add("editField");
    }
  } else {
    let confirmEdit = confirm("Are you sure you want to edit this item?");
    if (confirmEdit) {
      e.target.classList.remove("editing");
      //console.log("done editing");
      //set TR's TDs to value of form inputs
      rowInputs[0].innerHTML = document.getElementById("date").value;
      rowInputs[1].innerHTML = document.getElementById("comp").value;
      rowInputs[2].innerHTML = document.getElementById("pos").value;
      rowInputs[3].innerHTML = document.getElementById("sal").value;

      for (let t = 0; t < form.children.length - 1; t++) {
        form.children[t].classList.remove("editField");
      }

      //Reset form input values to blank
      document.getElementById("date").value = "";
      document.getElementById("comp").value = "";
      document.getElementById("pos").value = "";
      document.getElementById("sal").value = "";
    }
  }
}
