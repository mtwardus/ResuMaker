function saveFormAsTextFile()

    {    

      var textToSave = 'First Name, Last Name, Email, Phone Number, Home City, Home State, LinkedIn, Section Heading, School Name, School City, School State, Degree, Major, GPA, ' + 
      'School Start, School End, Section Heading, Company Name, Work City, Work State, Job Title, Job Responsibilites, Work Start, Work End, Section Heading,  ' +
      'Programming Languages, Languages, Other Skills\n'+

      document.getElementById('first_name').value+","+
      document.getElementById('last_name').value+","+
      document.getElementById('user_email').value+","+
      document.getElementById('phone_number').value+","+
      document.getElementById('user_city').value+","+
      document.getElementById('user_state').value+","+
      document.getElementById('linkedin').value+ ","+
      document.getElementById('heading1').value+ ","+
      document.getElementById('school_name').value+ ","+
      document.getElementById('school_city').value+","+
      document.getElementById('school_state').value+","+
      document.getElementById('degree').value+ ","+
      document.getElementById('major').value+ ","+
      document.getElementById('gpa').value+ ","+
      document.getElementById('school_start_1').value+ ","+
      document.getElementById('school_end_1').value+ "," +
      document.getElementById('heading2').value+ ","+
      document.getElementById('company_name').value+ ","+
      document.getElementById('work_city').value+","+
      document.getElementById('work_state').value+","+
      document.getElementById('job_title').value+ ","+
      document.getElementById('job_responsibilities').value+ "," +
      document.getElementById('work_start_1').value+ ","+
      document.getElementById('work_end_1').value+ ","+
      document.getElementById('heading3').value+ ","+
      document.getElementById('programming_languages').value+ ","+
      document.getElementById('languages').value+ ","+
      document.getElementById('other_skills').value;

    /*var textToSave = '\r\n\n'+
      'First Name: ' + document.getElementById('first_name').value + ' \r\n'+ 
      'Last Name: ' + document.getElementById('last_name').value + ' \r\n' + 
      'Email: ' + document.getElementById('user_email').value + ' \r\n' +
      'Phone Number: ' + document.getElementById('phone_number').value + ' \r\n' + 
      'Location: ' + document.getElementById('location').value + ' \r\n' + 
      'LinkedIn: ' + document.getElementById('linkedin').value + ' \r\n' +
      'School Name: ' + document.getElementById('school_name').value + ' \r\n';*/

      //job_responsibilities.splice(0, 0, document.getElementById('job_responsibilities').value);

    /* var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("filename").value;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();*/
    
    //---For CSV
    var downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(textToSave);
    downloadLink.target = '_blank';
    downloadLink.download = 'resume.csv';
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();

    }

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function howitworks_1() {

  document.getElementById("demo1").innerHTML =
    "You will input basic information in the form input fields. We create your resume when you input information such as personal information, educational history, work experience and skills.";

}

function howitworks_2() {

  document.getElementById("demo2").innerHTML =
    "We will process the inputted information. The inputted information will be collected, stored, converted and in turn generate arrays of information which can be transformed into a resume.";
  
}

function howitworks_3() {

  document.getElementById("demo3").innerHTML =
    "Then we let you select a predefined resume template all with different fonts and designs. Then, we will generate a resume based on your defined template and all you to save it as a PDF, or Microsoft Word document.";
}

function validateForm() {
  var x = document.forms["personal_info"]["first_name"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

/*var job_responsibilities = [];
function saveAllJobRes() {

job_responsibilities.push(document.getElementById('newId').value);

}*/