/* Open Navigation*/
const hamburgerBtn = document.querySelector(".container .header .nav .wrapper .flex .nav-hamburger");
const navLinks = document.querySelector(".container .header .nav .wrapper .flex .nav-links-cont");

hamburgerBtn.addEventListener('click', ()=>{
    navLinks.classList.toggle('open');
})

/* Form */
const form = document.querySelector(".container .main .wrapper .link-shortener .link-shortener-form");

const listResult = document.querySelector(".container .main .wrapper .link-results");
const list = document.querySelector(".container .main .wrapper .link-results .flex");
var b='';


form.addEventListener('submit', ()=>{
    var val = form.querySelector("label input").value;
    console.log(val);
    if(val===''){
        form.classList.add('error');
    }
    else {
        form.classList.remove('error');
        var url = 'https://api.shrtco.de/v2/shorten?url='+val;
        fetch(url)
        .then((resp)=> resp.json())
        .then(function(data){
            let links = data.result;
            console.log(links);
            listResult.classList.add('open');
            var a =`
            <div class="link-result">
              <div class="flex">
                <p>${val}</p>
                <hr class="link-result-line">
                <a href="#">${links.full_share_link}</a>
                <button class="btn btn-copy">Copy</button>
              </div>
            </div>
            `;
            b=b+a;
            list.innerHTML=b;

            const linkBtn = document.querySelectorAll(".container .main .wrapper .link-results .flex .link-result .flex .btn-copy");
            linkBtn.forEach((btn)=>{
                btn.addEventListener('click',()=>{
                    linkBtn.forEach((bt)=>{
                        bt.classList.remove('copy');
                    })
                    btn.classList.add('copy');
                    btn.innerHTML='Copied';
                    document.execCommand('copy');
                })
            })

        })
        .catch(function(){

        })
    }
})
