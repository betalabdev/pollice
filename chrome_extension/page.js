var glob

function addOverlay(el, id, autostart) {
    var bbox = el.getBBox()
    var div = document.createElement("div")
    
    var svg = document.querySelector(".punch-viewer-svgpage-svgcontainer > svg")
    
    div.style.position = "absolute"
    // div.style.border = "7px solid #fdf6e3"
    // div.style.boxSizing = "border-box"
    div.style.left = (bbox.x/svg.viewBox.baseVal.width*100)+"%"
    div.style.top = (bbox.y/svg.viewBox.baseVal.height*100)+"%"
    div.style.width = (bbox.width/svg.viewBox.baseVal.width*100)+"%"
    div.style.height = (bbox.height/svg.viewBox.baseVal.height*100)+"%"
    div.style.background = "rgba(253,246,227,.6)" // #fdf6e3"
    el._overlay_poll = div
    div.id = "foobar"
    
    var added = false
    
    function addIframe(e) {
        if (added) {
            return
        }
        top.navigator.keyboard.lock()
    div.innerHTML='<iframe style="border:0" src="http://127.0.0.1:8080/#/'+id+'" width="100%" height="100%"></iframe>'
    if (e) {
            e.stopPropagation()
    }
    added = true
    
    var refresh = document.createElement("div")
    refresh.style.position = "absolute"
    refresh.style.left = "98%"
    refresh.style.top = "100%"
    refresh.style.width = "15px"
    refresh.style.height = "15px"
    refresh.style.background = "rgba(0, 0, 0, .1)"
    div.appendChild(refresh)
        
    refresh.addEventListener("mousedown", function() {
        added = false
        addIframe()
      });		
    }
    
    if (autostart) {
        addIframe()
    } else {
      div.addEventListener("mousedown", addIframe);		
    }
    
    glob = div

    document.querySelector(".punch-viewer-svgpage").append(div)
}

function scanListener() {
  var polls = document.querySelectorAll(".punch-viewer-svgpage a")
  polls.forEach(function(poll) {
    if (poll._skip_poll) {
      return
    }
    if (poll._overlay_poll) {
      if (document.body.contains(poll._overlay_poll)) {
        return
      }
    }
        var v = poll.getAttribute("xlink:href").match(/.*^#poll=(.+)$/)
    if (v) {
            var rest = v[1]
            rest = rest.replace(/,autostart$/g, "")
      addOverlay(poll, rest, v[1].match(/,autostart$/) != null)
    } else {
      poll._skiip_poll = true
    }
  })
}

function setupListener() {
    setInterval(scanListener, 100)
    console.log("setupListener", document.URL, document.body)
}

setupListener()