      // console.log("PRESSED", this.keyPlayLast, Date.now() - this.keyPlayLast);

      // if (this.keyPlayLast === 0 || Date.now() - this.keyPlayLast < 1000) {
      //   this.keyPlayLast = Date.now();
      //   this.keyCounter += 1;
      //   console.log(":) ok", this.keyPlayLast, this.keyCounter);
      //   if (this.keyCounter > 3) {
      //     this.keyPlayLast = 0;
      //     this.keyCounter = 0;
      //     console.log("GO");
      //     _.inputPlay();
      //   }
      // } else {
      //   this.keyPlayLast = 0;
      //   this.keyCounter = 0;
      //   console.log(":( too slow", this.keyPlayLast, this.keyCounter);
      //   if(this.useUserInteraction){
      //     _.next();
      //   }
      // }