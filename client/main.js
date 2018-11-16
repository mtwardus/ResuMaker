function saveFormAsTextFile()
        
        {
        var textToSave =
          '\r\n\n'+
          'First Name: ' + document.getElementById('first_name').value + ' \r\n' + 
          'Last Name: ' + document.getElementById('last_name').value + ' \r\n' + 
          'Email: ' + document.getElementById('user_email').value + ' \r\n' +
          'Phone Number: ' + document.getElementById('phone_number').value + ' \r\n' + 
          'Location: ' + document.getElementById('location').value + ' \r\n' + 
          'LinkedIn: ' + document.getElementById('linkedin').value + ' \r\n' ;

        var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var fileNameToSaveAs = document.getElementById("filename").value;

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
        
        }

function destroyClickedElement(event)
    {
    document.body.removeChild(event.target);
    }
