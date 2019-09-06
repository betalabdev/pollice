var glob

function addOverlay(el, id, wait) {
    var bbox = el.getBBox()
    var div = document.createElement('div')

    var svg = document.querySelector('.punch-viewer-svgpage-svgcontainer > svg')

    div.style.position = 'absolute'
    div.style.left = (bbox.x / svg.viewBox.baseVal.width) * 100 + '%'
    div.style.top = (bbox.y / svg.viewBox.baseVal.height) * 100 + '%'
    div.style.width = (bbox.width / svg.viewBox.baseVal.width) * 100 + '%'
    div.style.height = (bbox.height / svg.viewBox.baseVal.height) * 100 + '%'
    div.style.background = 'rgba(253,246,227,0)' // 100% transparent
    el._overlay_poll = div
    div.id = 'pollice'

    var added = false
    var showQr = false

    function addIframe(e) {
        if (added) {
            return
        }
        top.navigator.keyboard.lock()
        div.innerHTML =
            '<iframe style="border:0" src="https://127.0.0.1:8080/#' + (showQr ? '/qr/' : '/result/') + id +
            '" width="100%" height="100%"></iframe>'
        if (e) {
            e.stopPropagation()
        }
        added = true

        var refresh = document.createElement('div')
        refresh.style.position = 'absolute'
        refresh.style.left = '97%'
        refresh.style.top = '100%'
        refresh.style.width = '15px'
        refresh.style.height = '15px'
        refresh.style.background = 'rgba(0, 0, 0, .1)'
        div.appendChild(refresh)

        refresh.addEventListener('mousedown', function() {
            added = false
            showQr = false
            addIframe()
        })

        var qr = document.createElement('div')
        qr.style.position = 'absolute'
        qr.style.left = '95%'
        qr.style.top = '100%'
        qr.style.width = '15px'
        qr.style.height = '15px'
        qr.style.background = 'rgba(0, 0, 0, .1)'
        div.appendChild(qr)

        qr.addEventListener('mousedown', function() {
            added = false
            showQr = true
            addIframe()
        })

    }

    if (wait) {
        div.addEventListener('mousedown', addIframe)
    } else {
        addIframe()
    }

    glob = div

    el.closest('.punch-viewer-svgpage').append(div)
}

function scanListener() {
    var polls = document.querySelectorAll('.punch-viewer-svgpage a')
    polls.forEach(function(poll) {
        if (poll._skip_poll) {
            return
        }
        if (poll._overlay_poll) {
            if (document.body.contains(poll._overlay_poll)) {
                return
            }
        }
        var v = poll.getAttribute('xlink:href').match(/.*^#poll=(.+)$/)
        if (v) {
            var rest = v[1]
            rest = rest.replace(/,wait$/g, '')
            addOverlay(poll, rest, v[1].match(/,wait$/) != null)
        } else {
            poll._skiip_poll = true
        }
    })
}

function setupListener() {
    setInterval(scanListener, 100)
    console.log('setupListener', document.URL, document.body)
}

setupListener()
