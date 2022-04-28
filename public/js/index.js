const bookslist = document.querySelector('.books')

;(async ()=>{
    let books = await fetch('http://localhost:3000/files')
    books = await books.json()

    renderBooks(books)
})()

btn.onclick = async() => {
    let formdata = new FormData()
    formdata.append('files',inputFile.files[0])
    formdata.append('files',inputFile2.files[0])
    formdata.append('fileName','File')
    formdata.append('title','File')


    await fetch('http://localhost:3000/cancat/add',{
        method: 'POST',
        body: formdata
    })
    // inputFile.value = null
}

function renderBooks(books) {
    bookslist.innerHTML = null
    console.log(books)
    if(!books.length) return
    books.forEach((el,index) => {
            const [li,img,h3,p,img2, img3, btn] = createElements('li','object','h3','p','img', 'img','button');
            img.setAttribute('data', el.filePath);
            img.setAttribute('class', 'img');
            img.setAttribute('alt', 'pic');
            img2.setAttribute('src', 'https://www.svgrepo.com/show/293410/delete-stop.svg')
            img2.setAttribute('style', 'width: 20px; position: absolute; top:5px; left: 205px; cursor:pointer;')
            img3.setAttribute('src', 'https://www.svgrepo.com/show/273992/check.svg')
            img3.setAttribute('disabled', 'true')
            img3.setAttribute('style', 'width: 20px; position: absolute; top:5px; left: 5px; cursor:pointer;')
            btn.setAttribute('disabled', 'true')
            btn.append(img3)
            
            img2.onclick = () => {
                li.remove()
            }

            h3.onkeyup = () => {
                btn.removeAttribute('disabled', 'disabled')
            }
            p.onkeyup = () => {
                btn.removeAttribute('disabled', 'disabled')
            }

            btn.onclick = () => {
                btn.setAttribute('disabled', 'true')
            }

            h3.textContent = el.fileName;
            p.textContent = (el.fileSize / 1024 / 1024).toFixed(3) + ' MB';

            li.append(img,h3,p,img2,btn);
            bookslist.append(li);
    });
}

function createElements(...array) {
    return array.map(el => document.createElement(el))
}