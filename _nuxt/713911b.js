(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{244:function(t,e,n){"use strict";n(26),n(37);var r="https://baris-kode.github.io/",title="Baris-Kode",o="Kumpulan baris kode program untuk belajar.",l=r+"/baris-kode.png";e.a=function(meta){return[{hid:"description",name:"description",content:meta&&meta.description||o},{hid:"og:type",property:"og:type",content:meta&&meta.type||"website"},{hid:"og:url",property:"og:url",content:meta&&meta.url||r},{hid:"og:title",property:"og:title",content:meta&&meta.title||title},{hid:"og:description",property:"og:description",content:meta&&meta.description||o},{hid:"og:image",property:"og:image",content:meta&&meta.mainImage||l},{hid:"twitter:url",name:"twitter:url",content:meta&&meta.url||r},{hid:"twitter:title",name:"twitter:title",content:meta&&meta.title||title},{hid:"twitter:description",name:"twitter:description",content:meta&&meta.description||o},{hid:"twitter:image",name:"twitter:image",content:meta&&meta.mainImage||l}]}},246:function(t,e,n){var content=n(251);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(32).default)("1cf5290c",content,!0,{sourceMap:!1})},250:function(t,e,n){"use strict";n(246)},251:function(t,e,n){var r=n(31)((function(i){return i[1]}));r.push([t.i,".image[data-v-1feb84de]{\n  margin:auto\n}\n.author[data-v-1feb84de]{\n  margin-top:10px;\n  font-size:1rem;\n  text-align:right\n}\n@media only screen and (min-width:320px) and (max-width:767px){\n.author[data-v-1feb84de]{\n    margin-top:3px;\n    font-size:.65rem\n}\n}\n@media only screen and (min-width:768px) and (max-width:991px){\n.author[data-v-1feb84de]{\n    margin-top:5px;\n    font-size:.8rem\n}\n}",""]),t.exports=r},269:function(t,e,n){"use strict";n.r(e);var r=n(86),o=n(6),l=(n(69),n(10),n(90),n(19),n(26),n(37),n(36),n(1)),c=n(244),d=l.a.extend({asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,r,o,article;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$content,r=t.params,e.next=3,n("articles").where({slug:null!==(o=null==r?void 0:r.slug)&&void 0!==o?o:""}).fetch();case 3:return article=e.sent,e.abrupt("return",{article:article[0]});case 5:case"end":return e.stop()}}),e)})))()},head:function(){var t,e,n,o,l,c,d,m,article=null===this||void 0===this?void 0:this.article,meta=null===this||void 0===this?void 0:this.meta;return{title:null==article?void 0:article.title,meta:[].concat(Object(r.a)(meta),[{property:"article:published_time",content:null==article?void 0:article.createdAt},{property:"article:modified_time",content:null==article?void 0:article.updatedAt},{property:"article:tag",content:null!==(e=null===(t=null==article?void 0:article.tags)||void 0===t?void 0:t.toString())&&void 0!==e?e:""},{name:"twitter:label1",content:"Written by"},{name:"twitter:data1",content:null!==(o=null===(n=null==article?void 0:article.author)||void 0===n?void 0:n.name)&&void 0!==o?o:""},{name:"twitter:label2",content:"Filed under"},{name:"twitter:data2",content:null!==(c=null===(l=null==article?void 0:article.tags)||void 0===l?void 0:l.toString())&&void 0!==c?c:""}]),link:[{hid:"canonical",rel:"canonical",href:"".concat(this.$config.baseUrl,"/blog/").concat(null===(m=null===(d=this.$route)||void 0===d?void 0:d.params)||void 0===m?void 0:m.slug,"/")}]}},computed:{meta:function(){var t,e,n,article=null===this||void 0===this?void 0:this.article,r={type:"article",title:null==article?void 0:article.title,description:null==article?void 0:article.description,url:"".concat(this.$config.baseUrl,"/blog/").concat(null===(e=null===(t=this.$route)||void 0===t?void 0:t.params)||void 0===e?void 0:e.slug,"/"),mainImage:"".concat(this.$config.baseUrl,"/images/").concat(null===(n=null==article?void 0:article.image)||void 0===n?void 0:n.src)};return Object(c.a)(r)}},methods:{hasImage:function(article){var t,e;return null!==(null!==(e=null===(t=null==article?void 0:article.image)||void 0===t?void 0:t.src)&&void 0!==e?e:null)},getImage:function(t){return null!==t&&("string"==typeof t||t instanceof String)?"/images/".concat(t):null},hasAuthor:function(article){var t,e;return null!==(null!==(e=null===(t=null==article?void 0:article.author)||void 0===t?void 0:t.name)&&void 0!==e?e:null)},formatDateTime:function(t){var e=new Date(t);return e.getDate()+" "+e.toLocaleString("id-ID",{month:"long"})+" "+e.getFullYear()}}}),m=(n(250),n(17)),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.hasImage(t.article)?n("div",[n("img",{staticClass:"image",attrs:{src:t.getImage(t.article.image.src),alt:t.article.image.alt}})]):t._e(),t._v(" "),t.hasAuthor(t.article)?n("div",[n("p",{staticClass:"author"},[n("i",[t._v("\n        Oleh :\n        "),n("a",{attrs:{href:t.article.author.link}},[t._v(t._s(t.article.author.name))]),t._v(",\n        "+t._s(t.formatDateTime(t.article.createdAt))+"\n      ")])])]):n("div",[n("p",{staticClass:"author"},[t._v("\n      "+t._s(t.formatDateTime(t.article.createdAt))+"\n    ")])]),t._v(" "),n("article",[n("nuxt-content",{attrs:{document:t.article}})],1)])}),[],!1,null,"1feb84de",null);e.default=component.exports}}]);