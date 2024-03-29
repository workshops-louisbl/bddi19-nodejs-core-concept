const { Writable, Readable, Duplex } = require('stream');

const inOutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback()
  },
  read(size) {
    this.push(String.fromCharCode(this.currentCharCode++));
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
})

inOutStream.currentCharCode = 65;

process.stdin
  .pipe(inOutStream)
  .pipe(process.stdout);
