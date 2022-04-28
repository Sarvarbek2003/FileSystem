const bookslist = document.querySelector('.books')
const backendApi = 'http://localhost:3000'
;(async()=>{
    let books = await fetch(backendApi+'/files')
    books = await books.json()
    renderBooks(books)
})()

btn.onclick = async() => {
    let formdata = new FormData()
    formdata.append('files',inputFile.files[0])
    formdata.append('files',inputFile2.files[0])
    formdata.append('fileName','File')
    formdata.append('title','File')
    inputFile.value = null

    let a = await fetch(backendApi+'/cancat/add',{
        method: 'POST',
        body: formdata
    })
    if(a.status == 201){
        let books = await fetch(backendApi+'/files')
        books = await books.json()
        renderBooks(books)
    }
}

function renderBooks(books) {
    bookslist.innerHTML = null
    if(!books.length) return
    books.forEach( (el,index) => {
            const [li,div,a,img,span,h3, p, span2] = createElements('li','div','a','img','span','h3', 'p','span');
            img.setAttribute('src', 'https://www.svgrepo.com/show/222005/down-arrow.svg')
            h3.textContent = el.fileName
            p.textContent = (el.fileSize / 1024 / 1024).toFixed(3) + ' MB'
            span2.textContent = el.title
            a.setAttribute('href',backendApi+'/download'+el.filePath)
            a.append(img)

            span.append(h3,p)
            div.append(a,span)
            li.append(div,span2)
            bookslist.append(li)

    });
}

function createElements(...array) {
    return array.map(el => document.createElement(el))
}
