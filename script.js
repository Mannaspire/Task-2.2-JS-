let dataList = [];

document.getElementById("inputDate").max = new Date().toISOString().split('T')[0];

const selectGender = () => {
    let radiobtn = document.getElementsByName("gender");
    let selected = Array.from(radiobtn).find(radio => radio.checked);
    location.reload();
    return selected.value;
}

function setRadiobtn(gender) {
    document.getElementById("gender").checked = true;
}

function validateForm() {

    var Phone = document.getElementById("inputPhone").value;
    if (Phone == "") {
        document.getElementById('phone-valid').innerHTML = "Please fill the mobile NUmber field";
        return false;
    }
    if (isNaN(Phone)) {
        document.getElementById('phone-valid').innerHTML = "User must write digits only not characters";
        return false;
    }
    if (Phone.length != 10) {
        document.getElementById('phone-valid').innerHTML = "Mobile Number must be 10 digits only";
        return false;
    }
    return true;
}

function showData() {

    var dataList;
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    }
    else {
        dataList = JSON.parse(localStorage.getItem("dataList"))
    }

    var html = "";

    dataList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.inputName + "</td>";
        html += "<td>" + element.inputEmail + "</td>";
        html += "<td>" + element.inputAddress + "</td>";
        html += "<td>" + element.inputCity + "</td>";
        html += "<td>" + element.inputState + "</td>";
        html += "<td>" + element.inputPhone + "</td>";
        html += "<td>" + element.inputLang + "</td>";
        html += "<td>" + element.inputGender + "</td>";
        html += "<td>" + element.inputDate + "</td>";
        html += '<td><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="" class="bi bi-trash3-fill" viewBox="0 0 16 16"> <a href="#" onclick="deleteData(' + index + ')" class="btn"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/></a></svg></td>'
        html += '<td><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16"><a href="#" onclick="updateData(' + index + ')" class="btn btn-light"> <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/></svg></a></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {

    if (validateForm() == true) {
        
        var inputName = document.getElementById("inputName").value;
        var inputEmail = document.getElementById("inputEmail").value;
        var inputAddress = document.getElementById("inputAddress").value;
        var inputCity = document.getElementById("inputCity").value;
        var inputState = document.getElementById("inputState").value;
        var inputPhone = document.getElementById("inputPhone").value;
        var inputLang = document.getElementById("inputLang").value;
        var inputGender = selectGender();
        var inputDate = document.getElementById("inputDate").value;

        var dataList;
        if (localStorage.getItem("dataList") == null) {
            dataList = [];
        }
        else {
            dataList = JSON.parse(localStorage.getItem("dataList"));
        }

        dataList.push({
            inputName: inputName,
            inputEmail: inputEmail,
            inputAddress: inputAddress,
            inputCity: inputCity,
            inputState: inputState,
            inputPhone: inputPhone,
            inputLang: inputLang,
            inputGender: inputGender,
            inputDate: inputDate,
        });

        localStorage.setItem("dataList", JSON.stringify(dataList));

        showData();

        document.getElementById("inputName").value = "";
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputAddress").value = "";
        document.getElementById("inputCity").value = "";
        document.getElementById("inputState").value = "";
        document.getElementById("inputPhone").value = "";
        document.getElementById("inputLang").value = "";
        inputGender = "";
        document.getElementById("inputDate").value = "";

        alert("Data Added!!")

    }
}

function deleteData(index) {

    var dataList;
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    }
    else {
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }

    let text = "Are you sure want to Delete Data ??";
    if (confirm(text) == true) {
        dataList.splice(index, 1);
        localStorage.setItem("dataList", JSON.stringify(dataList));
        showData();
    } else {
        console.log("You have canceled");
    }

    // dataList.splice(index, 1);
    // localStorage.setItem("dataList", JSON.stringify(dataList));
    // showData();
}

function updateData(index) {

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var dataList;
    if (localStorage.getItem("dataList") == null) {
        dataList = [];
    }
    else {
        dataList = JSON.parse(localStorage.getItem("dataList"));
    }

    document.getElementById("inputName").value = dataList[index].inputName;
    document.getElementById("inputEmail").value = dataList[index].inputEmail;
    document.getElementById("inputAddress").value = dataList[index].inputAddress;
    document.getElementById("inputCity").value = dataList[index].inputCity;
    document.getElementById("inputState").value = dataList[index].inputState;
    document.getElementById("inputPhone").value = dataList[index].inputPhone;
    document.getElementById("inputLang").value = dataList[index].inputLang;
    setRadiobtn(dataList[index].inputGender);
    document.getElementById("inputDate").value = dataList[index].inputDate;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {

            dataList[index].inputName = document.getElementById("inputName").value;
            dataList[index].inputEmail = document.getElementById("inputEmail").value;
            dataList[index].inputAddress = document.getElementById("inputAddress").value;
            dataList[index].inputCity = document.getElementById("inputCity").value;
            dataList[index].inputState = document.getElementById("inputState").value;
            dataList[index].inputPhone = document.getElementById("inputPhone").value;
            dataList[index].inputLang = document.getElementById("inputLang").value;
            dataList[index].inputGender = selectGender();
            dataList[index].inputDate = document.getElementById("inputDate").value;

            localStorage.setItem("dataList", JSON.stringify(dataList));

            showData();

            document.getElementById("inputName").value = "";
            document.getElementById("inputEmail").value = "";
            document.getElementById("inputAddress").value = "";
            document.getElementById("inputCity").value = "";
            document.getElementById("inputState").value = "";
            document.getElementById("inputPhone").value = "";
            document.getElementById("inputLang").value = "";
            inputGender = "";
            document.getElementById("inputDate").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";

            alert("Data Updated!!")
        }
    }
}