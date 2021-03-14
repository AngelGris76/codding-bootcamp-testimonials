const userData = [{ img: 'assets/images/image-tanya.jpg',
                    name: 'Tanya Sinclair',
                    profession: 'UX Engineer',
                    testimonial:`“ I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. ”`
                },
                {
                    img: 'assets/images/image-john.jpg',
                    name: 'John Tarkpor',
                    profession: 'Junior Front-end Developer',
                    testimonial:`“ If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. ”`
                }];

const button = document.getElementById('slider__button');
const sliderImg = document.getElementById('slider__img');
const sliderText = document.getElementById('slider__text');

const globalStyle = document.documentElement;

let slideIndex = 0;
let transitionState = 'none';

const slideFadeOut = (textPosition, imgPosition) =>
{
    globalStyle.style.setProperty('--slide-text-position', `${textPosition}%`);
    globalStyle.style.setProperty('--slide-img-position', `${imgPosition}%`);
    sliderImg.classList.add('slider--fadeout');
    sliderText.classList.add('slider--fadeout');
    transitionState = 'start';
}

const slideFadeIn = (textPosition, imgPosition) =>
{
    globalStyle.style.setProperty('--slide-text-position', `${textPosition}%`);
    globalStyle.style.setProperty('--slide-img-position', `${imgPosition}%`);
    sliderImg.classList.replace('slider--fadeout','slider--return');
    sliderText.classList.replace('slider--fadeout','slider--return');
    transitionState = 'return';
}

document.addEventListener('keydown', (e) =>
{
    if ((e.key ==='ArrowLeft') && (slideIndex === 1)) 
    {
        slideFadeOut(110, 120);
        slideIndex = 0;
    }
    else
    if ((e.key === 'ArrowRight') && (slideIndex === 0))
    {
        slideFadeOut(-110, -120);
        slideIndex = 1;
    }
});


button.addEventListener('click', (e) =>
{
    if ((e.target.classList.contains('slider__buttonprev') && (slideIndex === 1))) 
    {
        slideFadeOut(110, 120);
        slideIndex = 0;
    }
    else
    if ((e.target.classList.contains('slider__buttonnext') && (slideIndex === 0))) 
    {
        slideFadeOut(-110, -120);
        slideIndex = 1;
    }
});

sliderImg.addEventListener('transitionend', (e) =>
{
    if (e.propertyName == 'transform')
    {
        switch (transitionState)
        {
            case 'start':   {
                sliderImg.setAttribute('src', userData[slideIndex].img);
                sliderText.children[0].textContent = userData[slideIndex].testimonial;
                sliderText.children[1].children[0].textContent = userData[slideIndex].name;
                sliderText.children[1].children[1].textContent = userData[slideIndex].profession;
                if (slideIndex === 1) slideFadeIn(110, 120);
                else
                    slideFadeIn(-110, -120);               
                // console.log('Termino el fadeout');
                break;
            }
            case 'return':  {
                globalStyle.style.setProperty('--slide-text-position', '0');
                globalStyle.style.setProperty('--slide-img-position' , '0');
                sliderImg.classList.replace('slider--return', 'slider--fadein');
                sliderText.classList.replace('slider--return', 'slider--fadein');
                transitionState = 'finish';
                // console.log('Retorna para el fade in');
                break;
            }            
            case 'finish':  {
                sliderImg.classList.remove('slider--fadein');
                sliderText.classList.remove('slider--fadein');
                transitionState = 'none';
                // console.log('Termino el fadein');
                break;
            } 
        }
    }
});