
function rgb(r,g,b) {
  
  function toHex(n) {
    if(n < 0) return '00';
    else if(n > 255) return 'FF';
    else return ('0' + n.toString(16)).toUpperCase()
  }
   return toHex(r) +  toHex(g) +  toHex(b)
}
