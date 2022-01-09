
showtask();
let addtaskinput = document.getElementById("addtaskinput");
let addtaskbutton = document.getElementById("addtaskbtn");

addtaskbutton.addEventListener("click", function () {
    addtaskinputval = addtaskinput.value;
    if (addtaskinputval.trim() != 0) {
        let webtask = localStorage.getItem("localtask");
        if (webtask == null) {
            taskObject = [];
        } else {
            taskObject = JSON.parse(webtask);
        }
        taskObject.push({ 'task_name': addtaskinputval, 'completeStatus': false });
        localStorage.setItem("localtask", JSON.stringify(taskObject));
        addtaskinput.value = '';
    }
    showtask();
})

function showtask() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        taskObject = [];
    } else {
        taskObject = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObject.forEach((item, index) => {

        if (item.completeStatus == true) {
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
        } else {
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr>
                    <th scope="row">${index + 1}</th>
                    ${taskCompleteValue}
                    <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" class="text-success" id=${index}><i class="fa fa-check-square-o"></i>Complete</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="text-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
    });
    addedtasklist.innerHTML = html;
}
function edittask(index) {
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObject = JSON.parse(webtask);

    addtaskinput.value = taskObject[index]['task_name'];
    addtaskbtn.style.display = "none";
    savetaskbtn.style.display = "block";
}
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function () {
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObject = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;

    for (keys in taskObject[saveindex]) {
        if (keys == 'task_name') {
            taskObject[saveindex].task_name = addtaskinput.value;
        }
    }
    savetaskbtn.style.display = "none";
    addtaskbtn.style.display = "block";
    localStorage.setItem("localtask", JSON.stringify(taskObject));
    addtaskinput.value = '';
    showtask();
})

function deleteitem(index) {
    let webtask = localStorage.getItem("localtask");
    let taskObject = JSON.parse(webtask);
    taskObject.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObject));
    showtask();
}

let addedtasklist = document.getElementById("addedtasklist");
addedtasklist.addEventListener("click", function (e) {

    let webtask = localStorage.getItem("localtask");
    let taskObject = JSON.parse(webtask);

    let mytarget = e.target;
    if (mytarget.classList[0] === 'text-success') {
        let mytargetid = mytarget.getAttribute("id");

        mytargetpresibling = mytarget.parentElement.previousElementSibling.previousElementSibling;

        for (keys in taskObject[mytargetid]) {
            if (keys == 'completeStatus' && taskObject[mytargetid][keys] == true) {
                taskObject[mytargetid].completeStatus = false;
            } else if (keys == 'completeStatus' && taskObject[mytargetid][keys] == false) {
                taskObject[mytargetid].completeStatus = true;
            }
        }
        localStorage.setItem("localtask", JSON.stringify(taskObject));
        showtask();
    }
})

let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function () {
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObject = JSON.parse(webtask);
    if (webtask == null) {
        taskObject = [];
    } else {
        taskObject = JSON.parse(webtask);
        taskObject = [];
    }
    savetaskbtn.style.display = "none";
    addtaskbtn.style.display = "block";
    localStorage.setItem("localtask", JSON.stringify(taskObject));
    showtask();

})

