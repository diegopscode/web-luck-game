class game {

  constructor( height, width ) {

    this.height = height;
    this.width = width;
  }

  get resolution() {
      return `${this.width} x ${this.height}`;
  }

  set resolution(res) {
    this.height = res;
  }

  log( str ) {
    console.log(str);

    return this;
  }

}