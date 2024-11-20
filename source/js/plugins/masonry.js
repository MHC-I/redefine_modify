export function initMasonry() {
  var masonryContainer = document.querySelector("#masonry-container");
  if (!masonryContainer) return;

  var images = document.querySelectorAll(
    "#masonry-container .masonry-item img[data-src]"
  );

  // 瀑布流初始化
  var screenWidth = window.innerWidth;
  var baseWidth;
  if (screenWidth >= 768) {
    baseWidth = 255;
  } else {
    baseWidth = 150;
  }

  var masonry = new MiniMasonry({ 
    baseWidth: baseWidth,
    container: masonryContainer,
    gutterX: 10,
    gutterY: 10,
    surroundingGutter: false,
    lazyLoad: true,
    fitWidth: true, 
  });

  // 懒加载同时刷新瀑布流布局
  var observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.onload = () => {
          img.style.height = '';
          masonry.layout(); // 图片加载完成后更新布局
        };
        // 处理加载失败的情况
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    observer.observe(img);
  });
}


if (data.masonry) {
  try {
    swup.hooks.on("page:view", initMasonry);
  } catch (e) {
    console.error("Error setting up swup hooks:", e);
  }
  document.addEventListener("DOMContentLoaded", initMasonry);
}