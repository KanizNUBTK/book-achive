
// search box loader 
const searchBook = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search value
    searchField.value = '';
    // console.log(searchText);
    const url =`https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {if(data.numFound == 0){
         // clear search value
        const numberFound = document.getElementById('number-found');
        numberFound.innerHTML = '';
        const searchResult = document.getElementById('search-result');
       searchResult.innerHTML = '';
        alert("Sorry Data Not Found");
    }else{
        displayBook(data.docs);
        const numberFound = document.getElementById('number-found');
        numberFound.innerHTML = '';
        const p = document.createElement('p');
        p.innerText=`About ${data.numFound} results`;
        // console.log(data.numFound);
        numberFound.appendChild(p);}
        });
}

const displayBook = docs =>{
    // console.log(docs);
    const searchResult = document.getElementById('search-result');
     // clear search value
    searchResult.innerHTML = '';
    docs.forEach(book =>{
        // console.log(book.lenght);
        let authors = '';
        let publishers = '';
        book.author_name ? book.author_name.forEach((author , index) =>{authors = authors + `${index !== 0 ? `,` : ``}${author}`}): authors ='Data Not Aviable';
        book.publisher ? book.publisher.forEach((publish , index) =>{publishers = publishers + `${index !== 0 ? `,` : ``}${publish}`}): publishers ='Publisher Date is Not Aviable';
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                        <div class="card">
                        <img src="${book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : ``}" alt="${book.cover_i ? `${book.title}` : `Image Not Available`}" />
                            <div class="card-body">
                                <h5 class="card-title">Book tittle: ${book.title}</h5>
                                <p class="card-title">Author name: ${authors}</p>
                                <p class="card-title">Publisher of Book: ${publishers}</p>
                                <p class="card-title">Book First Publish Year: ${book.first_publish_year ? book.first_publish_year : 'No Data Available'}</p>
                            </div>
                        </div>
                    `;
                    searchResult.appendChild(div);
    })
}
