export const _arrayBufferToUrl = (buffer) => {
  // _arrayBufferToBase64
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  let base64String = window.btoa( binary );
  return `data:image/png;base64,${base64String}`;
}