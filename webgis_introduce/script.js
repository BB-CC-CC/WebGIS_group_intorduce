document.addEventListener('DOMContentLoaded', function() {

    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    const content = document.querySelector('.content');
    

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
        
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
      
            content.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
   
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });
    

    let scrollTimeout;
    
    content.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            let currentSection = '';
            const scrollPosition = content.scrollTop;
            

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= (sectionTop - 100)) {
                    currentSection = section.getAttribute('id');
                }
            });
            

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');
                }
            });
        }, 10);
    });
}); 