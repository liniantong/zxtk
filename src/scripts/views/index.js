var indexTpl = require('../tpl/index.string');

SPA.defineView('index', {
  html: indexTpl,

  plugins: ['delegated'],

  // 子视图的嵌套定义
  modules: [{
    name: 'content',
    container: '.m-index-container',
    views: ['home', 'search', 'my'],
    defaultTag: 'home'
  }],
  
  // 初始化视图属性和方法
  init: {
    indexSwiper: null,
    setActive: function (obj) {
      obj.addClass('active').siblings().removeClass('active');
    }
  },

  bindActions: {
    'switch.swiper': function (e) {
      this.setActive($(e.el));
      this.indexSwiper.slideTo($(e.el).index()+1);
    },

    'switch.view': function (e) {
      // 视图切换方法
      this.modules.content.launch(e.data.tag);
      this.setActive($(e.el));
    },

    'exit': function () {
      this.hide();
    }
  },

  bindEvents: {
    'beforeShow': function () {
      this.indexSwiper = new Swiper('#index-swiper', {
        loop: true,
        onSlideChangeStart: function (swiper) {
          $('#index-nav li').eq(swiper.activeIndex-1)
            .addClass('active').siblings().removeClass('active');
        }
      });
    }
  }
});
