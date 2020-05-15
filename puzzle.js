/*
  copy paste this code into the console of any epuzzle.info website (for example, http://www.epuzzle.info/kat.php?wg=temat&n=310)
  and it set, in array m, a sorted list of puzzle urls based on number of pieces
*/
let n = []
let arr = document.getElementsByClassName("tdmini")
for(let i = 0; i < arr.length; i++){
    if(!arr[i].children[0]) continue
    n.push(arr[i].children[0].href)
}
let m = [] // [{url: "", size: ""}]
let regex1 = /psix=([0-9]+)/
let regex2 = /psiy=([0-9]+)/
let regex3 = /Size: ([0-9]+)x([0-9]+)/
for(let i = 0; i < n.length; i++){
    $.ajax({url: n[i]})
        .done(function(data){
            let x, y
            let match = data.match(regex1)
            if(match){
                x = parseInt(match[1])
                y = parseInt(data.match(regex2)[1])
            } else {
                let match3 = data.match(regex3)

                x = parseInt(match3[1])
                y = parseInt(match3[2])
            }
            m.push({url: n[i], size: x*y})
        })
}
m.sort(function(a, b){
    return b.size - a.size;
})
