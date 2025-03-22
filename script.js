






AOS.init();




const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      const answer = item.nextElementSibling;
      const icon = item.querySelector('i');

      item.addEventListener('click', () => {
          faqItems.forEach(otherItem => {
              if (otherItem !== item) {
                  const otherAnswer = otherItem.nextElementSibling;
                  const otherIcon = otherItem.querySelector('i');

                  otherAnswer.classList.remove('active');
                  otherIcon.classList.remove('active');
                  otherAnswer.style.maxHeight = "0";
              }
          });

          answer.classList.toggle('active');
          icon.classList.toggle('active');
          answer.style.maxHeight = answer.classList.contains('active') ? answer.scrollHeight + "px" : "0";
      });
  });


document.addEventListener("scroll", () => {
    document.querySelectorAll(".card__peach").forEach((el) => {
      let rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 500) {
        el.classList.add("show2");
      }
    });
  });
  


  let burger = document.querySelector('.bar')
  let modal = document.querySelector('.modal')

  burger.addEventListener('click' , function(){
    if(modal.className === 'modal' ){
      modal.classList.add('newOpen')
    }
    else{
      modal.classList.remove('newOpen')
    }
  })