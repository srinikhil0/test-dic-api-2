const wrapper = document.querySelector(".dic_wrapper"),
    searchInput = wrapper.querySelector("input"),
    relatedLinks = wrapper.querySelector(".dic_relatedLinks .dic_list"),
    infoText = wrapper.querySelector(".dic_info-text"),
    volumeIcon = wrapper.querySelector(".dic_word i"),
    removeIcon = wrapper.querySelector(".dic_search span");
// let audio;

//data function
function data(result, dic_word) {
    if (result.title) {
        //if api returns the message of pass by word
        infoText.innerHTML = `Can't find the meaning of <span>"${dic_word}"</span>. Please, check your spelling or try to search with another word`;
    } else {
        // console.log(result);
        wrapper.classList.add("active");
        let definitions = result[0];
        // phonetics = `${result[0].meanings[0].partOfSpeech} / ${result[0].phonetics[0].text}/`;

        //passing the particular response data to a particular html element
        document.querySelector(".dic_word p").innerText = result[0].word;
        // document.querySelector(".dic_word span").innerText = phonetics;
        document.querySelector(".dic_meaning span").innerText = definitions.meaning;
        document.querySelector(".dic_example span").innerText = definitions.firstOccurence;
        // audio = new Audio("https:" + result[0].phonetics[0].audio); //creating new audio object and passing audio src

        if (definitions.relatedLinks[0] == undefined) { //if there is no synonym then hide the synonym div
            relatedLinks.parentElement.style.display = "none";
        } else {
            relatedLinks.parentElement.style.display = "block";
            relatedLinks.innerHTML = "";
            for (let i = 0; i < 5; i++) { //getting only 5 relatedLinks out of many
                let tag = `<span onclick=search('${definitions.relatedLinks[i]}')><a href="https://${definitions.relatedLinks[i]}" target="_blank">${definitions.relatedLinks[i]}</a>,</span>`;
                relatedLinks.insertAdjacentHTML("beforeend", tag); //passing all 5 relatedLinks inside relatedLinks           
            }
        }
    }
}

//search synonym word
// function search(word){
//     searchInput.value = word;
//     fetchApi(word);
// }

//fetch api function
function fetchApi(dic_word) {
    wrapper.classList.remove("active");
    infoText.style.color = '#000';
    infoText.innerHTML = `Searching for <span>"${dic_word}"</span>`;
    let url = `https://test-dic-api-2.herokuapp.com/${dic_word}`;
    //fetching api response and returning it with parsing into js object and in another then
    //method calling data function with passing api response and searched word as an arugument
    fetch(url).then(res => res.json()).then(result => data(result, dic_word));
}

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && e.target.value) {
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click", () => {
    audio.play();
});

removeIcon.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color = '#9a9a9a';
    infoText.innerHTML = "Type a word and press enter";
});