if (getUrlVars()['tag']){
  var tag = getUrlVars()['tag'];
} else {
  var tag = 'soup';
}


const igUrl = 'https://www.instagram.com/explore/tags/'+tag+'/?__a=1'

let markup = '';
let altText ='';

  fetch(igUrl).then(function(response) {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json().then(function(json) {
          const igs = json.graphql.hashtag.edge_hashtag_to_media.edges;
        
          igs.forEach(function(element){
            if (element.node.edge_media_to_caption.edges[0]){
               altText = element.node.edge_media_to_caption.edges[0].node.text;
            } else {
               altText = 'a picture involving ' + tag 
            }
            markup = `<a href="https://www.instagram.com/p/${element.node.shortcode}"  target="_blank" ><img src="${element.node.thumbnail_src}" alt="${altText}"></a>` + markup;                     
          })
        })
      }
  }).then(function(){
        console.log(document.getElementById('ig-holder'))
        document.getElementById('ig-holder').innerHTML = markup;
  })



  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}