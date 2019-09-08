var glob
// var baseUrl = 'https://localhost:8080/#'
var baseUrl = 'https://poll.betalab.dev/#'

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
            '<iframe style="border:0" src="'+ baseUrl + (showQr ? '/qr/' : '/result/') + id +
            '" width="100%" height="100%"></iframe>'
        if (e) {
            e.stopPropagation()
        }
        added = true

        var refresh = document.createElement('div')
        refresh.innerHTML = '&#x21BA;'
        refresh.style.display = 'flex'
        refresh.style.color = '#335ecf'
        refresh.style.cursor = 'pointer'
        refresh.style.position = 'absolute'
        refresh.style.left = '100%'
        refresh.style.top = '0'
        refresh.style.width = '3rem'
        refresh.style.height = '3rem'
        refresh.style['font-size'] = '1rem'
        refresh.style['align-items'] = 'center'
        refresh.style['font-weight'] = '600'
        refresh.style['justify-content'] = 'center'
        refresh.style['border-right'] = '2px solid #335ecf'
        refresh.style['border-top'] = '2px solid #335ecf'
        refresh.style['border-bottom'] = '2px solid #335ecf'
        refresh.style['box-shadow'] = '2px 3px 4px -2px'

        div.appendChild(refresh)

        refresh.addEventListener('mousedown', function() {
            added = false
            showQr = false
            addIframe()
        })

        var qr = document.createElement('div')
        qr.innerHTML = '&#9974;'
        qr.style.display = 'flex'
        qr.style.color = '#335ecf'
        qr.style.cursor = 'pointer'
        qr.style.position = 'absolute'
        qr.style.left = '100%'
        qr.style.top = '4rem'
        qr.style.width = '3rem'
        qr.style.height = '3rem'
        qr.style['font-size'] = '1rem'
        qr.style['align-items'] = 'center'
        qr.style['justify-content'] = 'center'
        qr.style['font-weight'] = '600'
        qr.style['border-right'] = '2px solid #335ecf'
        qr.style['border-top'] = '2px solid #335ecf'
        qr.style['border-bottom'] = '2px solid #335ecf'
        qr.style['box-shadow'] = '2px 3px 4px -2px'
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
