buildList()

function buildList() {
  let wrapper = document.getElementById('list-wrapper');
  wrapper.innerHTML = '';
  let url = "http://127.0.0.1:8000/api/task-list/";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let list = data;
      for (let i in list) {
        let title = `<span class="title">${list[i].title}</span>`
        if (list[i].completed) {
          title = `<strike class="title">${list[i].title}</strike>`
        }
        let item = `
        <div id="data-row-${i}" data-itemid=${i} class="task-wrapper flex-wrapper">
          <div style="flex:7">
            ${title}
          </div>
          <div style="flex:1">
            <button class="btn btn-sm btn-outline-info edit">Edit</button>
          </div>
          <div style="flex:1">
            <button class="btn btn-sm btn-outline-dark delete">-</button>
          </div>
        </div>
      `
        wrapper.innerHTML += item;
      }
      let editBtns = document.querySelectorAll('.edit')
      editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', () => {
          let itemId = editBtn.closest('.task-wrapper').dataset.itemid;
          editItem(list[itemId]);
        })
      })

      let deleteBtns = document.querySelectorAll('.delete')
      deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', () => {
          let itemId = deleteBtn.closest('.task-wrapper').dataset.itemid;
          deleteItem(list[itemId]);
        })
      })

      let strikeBtns = document.querySelectorAll('.title')
      strikeBtns.forEach(strikeBtn => {
        strikeBtn.addEventListener('click', () => {
          let itemId = strikeBtn.closest('.task-wrapper').dataset.itemid;
          strikeItem(list[itemId]);
        })
      })
    })
}

let activeItem = null;
let form = document.getElementById('form')

function editItem(item) {
  activeItem = item;
  document.getElementById('title').value = activeItem.title;
}

function deleteItem(item) {
  fetch(`http://127.0.0.1:8000/api/task-delete/${item.id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  }).then(response => buildList())
}

function strikeItem(item) {
  item.completed = !item.completed
  fetch(`http://127.0.0.1:8000/api/task-update/${item.id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 'completed': item.completed })
  }).then(response => buildList())
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  let title = document.getElementById('title');
  let url;
  let requestMethod = 'POST'
  if (activeItem != null) {
    url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`;
    requestMethod = 'PUT';
    activeItem = null;
  }
  else {
    url = "http://127.0.0.1:8000/api/task-create/"
  }
  fetch(url, {
    method: `${requestMethod}`,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 'title': title.value })
  })
    .then(response => {
      if (response.status == 200 || response.status == 204) {
        buildList();
        title.value = '';
      }
    })
})