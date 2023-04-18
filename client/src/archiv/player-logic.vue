
    player: function () {
      if (this.flow === "ready") {
        this.init();
      } else if (this.flow === "running") {
        this.pause();
      } else if (this.flow === "paused") {
        this.play();
      }
    },



init: function () {
      this.cursor = 0;
      this.countdown = this.countdownDefault;
      clearInterval(this.intervalInit);
      if (this.useCountdown) {
        this.intervalInit = setInterval(() => {
          this.countdown--;
          if (this.countdown <= 0) {
            clearInterval(this.intervalInit);
            this.play();
          }
        }, 1000);
      } else {
        this.play();
      }
    },
    next: function () {
      if (this.cursor < this.s.frames.length - 1) {
        this.cursor++;
      } else {
        if (this.useLoop) {
          this.cursor = 0;
          return;
        }
        this.flow = "ready";
        clearInterval(this.intervalFlowId);
      }
    },
    play: function () {
      this.flow = "running";
      clearInterval(this.intervalFlowId);
      const currentFrame = toRaw(this.currentFrame);
      if (currentFrame) {
        this.intervalFlowId = setInterval(() => {
          this.next();
        }, currentFrame.duration * 1000);
      }
    },
    staticNext: function () {
      clearInterval(this.intervalFlowId);
      this.flow = "paused";
      if (this.cursor < this.s.frames.length - 1) {
        this.cursor++;
      }
    },
    staticPrev: function () {
      clearInterval(this.intervalFlowId);
      this.flow = "paused";
      if (this.cursor < 1) {
        return;
      }
      this.cursor--;
    },
    pause: function () {
      this.flow = "paused";
      clearInterval(this.intervalFlowId);
    },