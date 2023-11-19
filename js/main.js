var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');

var bookmarkContainer = [];

if (localStorage.getItem('bookmarks') != null) {
    bookmarkContainer = JSON.parse(localStorage.getItem('bookmarks'));
    displayData()
}

function addData() {

    if(validateName() == true && validateUrl() == true){
        books = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value
        }
    
        for(var i = 0 ; i < bookmarkContainer.length ; i++){
            if(siteNameInput.value.toLowerCase() == bookmarkContainer[i].siteName.toLowerCase()){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: `This site name already exists , please choose another name `,
                })
                siteNameInput.value = '';
                return true;
            }
        }

        bookmarkContainer.push(books);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkContainer));
    
        // console.log(bookmarkContainer);
        displayData()
        clearForm();
    }
    else{
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `Site Name or Url is not valid, Please follow the rules below :
            Site name must contain at least 3 characters ( ex: facebook ) &
            Site URL must be a valid one ( ex: https://www.facebook.com )`,
        })
    }

    
}


function displayData() {
    var container = ""


    

    

    for (var i = 0; i < bookmarkContainer.length; i++) {


        

        container += `<tr>
            <td>${i + 1}</td>
            <td>${bookmarkContainer[i].siteName}</td>
            <td><button class="btn btn-success"><a href="${bookmarkContainer[i].siteUrl}" target="_blank"
                        id="visitLink"><i class="fa-solid fa-eye pe-2"></i>visit</a></button></td>
            <td><button class="btn btn-danger" onclick='deleteData(${i})'><i
                        class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`
    }

    document.getElementById('tableBody').innerHTML = container;
}


function clearForm(){
    siteNameInput.value = '';
    siteUrlInput.value = '';
}



function deleteData(index){
    bookmarkContainer.splice(index, 1);
    localStorage.setItem('bookmarks' , JSON.stringify(bookmarkContainer));

    displayData();
}


function validateName(){
    var regex = /([a-z]|[A-Z]){3,}$/
    var text = siteNameInput.value

    if(regex.test(text) == true){
        siteNameInput.classList.add('is-valid');
        siteNameInput.classList.remove('is-invalid');
        return true;
    }
    else{
        siteNameInput.classList.add('is-invalid');
        siteNameInput.classList.remove('is-valid');
        return false;
    }
}


function validateUrl(){
    var regex = /^(https?:\/\/)(w{3}\.)\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
    var text = siteUrlInput.value

    if(regex.test(text) == true){
        siteUrlInput.classList.add('is-valid');
        siteUrlInput.classList.remove('is-invalid');
        return true;
    }
    else{
        siteUrlInput.classList.add('is-invalid');
        siteUrlInput.classList.remove('is-valid');
        return false;
    }
}