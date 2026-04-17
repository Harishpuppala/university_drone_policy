let colleges = [];
let template = "";

fetch("template.txt")
.then(res => res.text())
.then(data => {
template = data;
});

fetch("colleges.json")
.then(res => res.json())
.then(data => {

colleges = data;

let dropdown = document.getElementById("collegeDropdown");

data.forEach((college, index) => {

let option = document.createElement("option");
option.value = index;
option.text = college.name;

dropdown.appendChild(option);

});

new TomSelect("#collegeDropdown",{
create:false,
sortField:"text",
placeholder:"Type university name to search..."
});

});

function downloadPDF(){

let index = document.getElementById("collegeDropdown").value;

let college = colleges[index];

let policy = template
.replaceAll("{{UNIVERSITY_NAME}}", college.name)
.replaceAll("{{AIRSPACE_ZONE}}", college.zone);

const { jsPDF } = window.jspdf;

let doc = new jsPDF();

let lines = doc.splitTextToSize(policy,180);

doc.text(lines,10,10);

doc.save("Drone_Policy.pdf");

}
