export class TextToSpeech {
  constructor() {
    this.speech = new SpeechSynthesisUtterance();

    this.speech.volume = 1;
    this.speech.pitch = 1;
    this.speech.rate = 1;
    this.end();
  }
  speak(text) {
    this.speech.text = text;
    speechSynthesis.speak(this.speech);
  }
  end(setPlay) {
    return (this.speech.onend = () => {
      setPlay(false);
    });
  }
  pause() {
    speechSynthesis.pause();
  }
  continue() {
    speechSynthesis.resume();
  }
}
