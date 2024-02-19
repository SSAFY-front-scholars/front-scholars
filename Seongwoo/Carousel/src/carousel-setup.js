document.addEventListener('DOMContentLoaded', () => {
    const imageUrls = [
      'https://nhlyvly.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/a7c571fb0a86253634fe991709b41081.jpg',
      'https://nhlyvly.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/0a9dd891abd57916a834f59c520823b2.jpg',
        'https://nhlyvly.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/c525807c6bc5e34391f629569d57dc24.jpg',
        'https://nhlyvly.com/web/upload/appfiles/ZaReJam3QiELznoZeGGkMG/dbd9d9e098663bf814c6124d0c6e17ea.jpg'
  ];
  
    const options = {
      autoLoop: true, 
      slideDuration: 2000 
    };
  
    initCarousel(imageUrls, options);
  });
  