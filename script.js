let colleges = [];
let template = "";

/* Load template */
fetch("template.txt")
.then(response => response.text())
.then(data => {
template = data;
});

/* Load colleges */
fetch("colleges.json")
.then(response => response.json())
.then(data => {

colleges = data;

let dropdown = document.getElementById("collegeDropdown");

data.forEach((college,index)=>{

let option = document.createElement("option");

option.value = index;
option.text = college.name;

dropdown.appendChild(option);

});

});

function downloadPDF(){

let dropdown = document.getElementById("collegeDropdown");

let index = dropdown.value;

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
