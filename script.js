window.addEventListener("load", ()=>{
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }
    var barHeight = 100
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > barHeight){
            document.getElementsByClassName("bottomBar")[0].style.left="-"+(window.pageYOffset-barHeight)*5+"px";
            document.getElementsByClassName("topBar")[0].style.left=(window.pageYOffset-barHeight)*5+"px";
            document.getElementsByClassName("firstBlock")[0].style.top=(window.pageYOffset-barHeight)+"px";
        } else{
            document.getElementsByClassName("bottomBar")[0].style.left=0;
            document.getElementsByClassName("topBar")[0].style.left=0;
            document.getElementsByClassName("firstBlock")[0].style.top=0;
        }
    }, false);
    imageArray=["aaron", "abby", "gavin", "gracie", "layden", "meghan", "paige", "taylor"]
    fNameArray=["Aaron", "Abby", "Gavin", "Gracie", "Layden", "Meghan", "Paige", "Taylor"]
    lNameArray=["Largent", "Smith", "Gorrell", "Limmer", "Halcomb", "Strother", "Warren", "Sloan"]
    peopleSection = Array.from(document.getElementsByClassName("pfpContainer"))[0]
    for (let i = 0; i<8; i++){
        peopleSection.insertAdjacentHTML("beforeend", `
            <div class="pfp">
                <div class="pfpImages">
                    <img src="images/pfp/${imageArray[i]}pfp.jpg"  alt="Image of ${fNameArray[i]} ${lNameArray[i]}"/>
                </div>
                <div class="pfpName">
                    <p>${fNameArray[i]} <span class="mInitial"></span>. ${lNameArray[i]}</p>
                </div>
                <div class="pfpDescriptor">
                    <p>Founding Member #<span class="fNum"></span></p>
                </div>
            </div>
        `);
    }
    imageArrayN=["alex",      "cris",     "grant",  "alyssa",    "justin", "emely",          "kea", "serenity", "bishop",  "raven", "jeremiah", "jansen",    "lexi",   "trevor", "wubi",    "daniel", "seb"]
    fNameArrayN=["Alexander", "Cristian", "Grant",  "Alyssa",    "Justin", "Emely",          "Kea", "Serenity", "Bishop",  "Raven", "Jeremiah", "Jansen",    "Alexia", "Trevor", "Wubi",    "Daniel", "Seb"]
    lNameArrayN=["Miles",     "Cuevas",   "Booker", "Freimanis", "Kroh",   "Solis Aparicio", "Yeh", "Sosa",     "Markham", "Haney", "Jones",    "Breshears", "Bowlen", "Blair",  "Halefom", "Gaitan", "Gonzalez"]
    peopleSection = Array.from(document.getElementsByClassName("pfpContainer"))[0]
    for (let i = 0; i<imageArrayN.length; i++){
        peopleSection.insertAdjacentHTML("beforeend", `
            <div class="pfp">
                <div class="pfpImages">
                    <img src="images/pfp/${imageArrayN[i]}pfp.jpg" alt="Image of ${fNameArrayN[i]} ${lNameArrayN[i]}"/>
                </div>
                <div class="pfpName">
                    <p>${fNameArrayN[i]} <span class="mInitial"></span>. ${lNameArrayN[i]}</p>
                </div>
                <div class="pfpDescriptor">
                    <p>Member #<span class="fNumTwo"></span></p>
                </div>
            </div>
        `);
    }
    var charList = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    window.addEventListener('load', (event) => {
        Array.from(document.getElementsByClassName("mInitial")).forEach(function(element) {
            element.innerHTML=charList[getRandomInt(0, 25)];
        })
        Array.from(document.getElementsByClassName("fNum")).forEach(function(element) {
            element.innerHTML=getRandomInt(0, 100);
        })
        Array.from(document.getElementsByClassName("fNumTwo")).forEach(function(element) {
            element.innerHTML=getRandomInt(100, 1000);
        })
    });
    function initNFT(){
        var nftRequest = newttpRequest();
        nftRequest.open('GET', 'https://api.mintable.app/gasless-by-address?address=0x8a03b60620b7c07939f56effdf1453a902c6bc62');
        nftRequest.onload = function() {
            if (nftRequest.status >= 200 && nftRequest.status < 400) {
                nftLoaded(JSON.parse(nftRequest.responseText));
            }
        }
        nftRequest.send();
    }
    function nftLoaded(nftData){
        var ethRequest = new XMLHttpRequest();
        ethRequest.open('GET', 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
        ethRequest.onload = function() {
            if (ethRequest.status >= 200 && ethRequest.status < 400) {
                onDataLoad(nftData, JSON.parse(ethRequest.responseText));
            }
        }
        ethRequest.send();
    }    
    function onDataLoad(nftData, ethData){
        idMatrix = [
            "62425729928725477093966862552082104794484340994386089791651867979095816573797",
            "62425729928725477093966862552082104794484340994412125421445367888080265049976",
            "62425729928725477093966862552082104794484340994417329617175045769182462809936",
            "62425729928725477093966862552082104794484340994411812310278398203715609188354",
            "62425729928725477093966862552082104794484340994386759878445730710252043059329",
            "62425729928725477093966862552082104794484340994386818052578451671874074394756",
            "62425729928725477093966862552082104794484340994400963094845227605182394075208",
            "62425729928725477093966862552082104794484340994392276991167359249750911711027"
        ]
        nftData.forEach(element => {
            if (idMatrix.includes(element.token_id)){
                anHtmlString = `<div class="nftCard">
                                    <div class="nftLeft">
                                        <img src="${element.preview_images}">
                                    </div>
                                    <div class="nftRight">
                                        <div class="nftDetails">
                                            <p class="nftTitle">Collection: ${element.title}</p>
                                            <p class="nftSubTitle">${element.sub_title}</p>
                                            <p class="nftDescr">Description:</p>
                                            <span class="nftDescC">${element.description}</span>
                                            <p class="nftCost">0.02 ETH, $${Math.round(0.02 * ethData[0].current_price*100)/100}</p>
                                            <a href="https://mintable.com/browse?other=buy_now&search=${element.token_id}" style="text-decoration:none;" tabindex="-1">
                                                <button class="nftButton">Buy Now!</button>
                                            </a>
                                        </div>
                                    </div>
                                </div>`;
                document.getElementById("nftSlideShow").insertAdjacentHTML("beforeend", anHtmlString);
            }
        });
        genSlides();
    }
    function genSlides(){
        cardList = Array.from(document.getElementsByClassName("nftCard"));
        cardList.forEach(element => {
            element.classList.add("d-none");
        });
        cardList[0].classList.remove("d-none");
        arrowAdditions(cardList);
    }
    function arrowAdditions(){
        var pickedIndex = 0;
        document.getElementById("nftLeftArrow").addEventListener("click", ()=>{
            cardList[pickedIndex].classList.add("d-none");
            if (pickedIndex == 0){
                pickedIndex = cardList.length - 1;
            } else{
                pickedIndex--;
            }
            cardList[pickedIndex].classList.remove("d-none");
        }, cardList);
        document.getElementById("nftRightArrow").addEventListener("click", ()=>{
            cardList[pickedIndex].classList.add("d-none");
            if (pickedIndex == cardList.length - 1){
                pickedIndex = 0;
            } else{
                pickedIndex++;
            }
            cardList[pickedIndex].classList.remove("d-none");
        }, cardList);
        document.getElementById("nftLeftArrow").addEventListener("keypress", (event)=>{
            if (event.key == " " || event.key == "Enter"){
                cardList[pickedIndex].classList.add("d-none");
                if (pickedIndex == 0){
                    pickedIndex = cardList.length - 1;
                } else{
                    pickedIndex--;
                }
                cardList[pickedIndex].classList.remove("d-none");
            }
        }, cardList);
        document.getElementById("nftRightArrow").addEventListener("keypress", (event)=>{
            if (event.key == " " || event.key == "Enter"){
                cardList[pickedIndex].classList.add("d-none");
                if (pickedIndex == cardList.length - 1){
                    pickedIndex = 0;
                } else{
                    pickedIndex++;
                }
                cardList[pickedIndex].classList.remove("d-none");
            }
        }, cardList);
    }
    initNFT()
});