<script>
    // Creates a simple buzzer
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    let oscillatorNode = null;

    function play() {
        if (!oscillatorNode) {
            oscillatorNode = new OscillatorNode(context, {type: 'sawtooth'});
            oscillatorNode.connect(context.destination);
            oscillatorNode.start();
            setTimeout(() => {
                oscillatorNode.stop();
                oscillatorNode = null;
            }, 1000);
        }
    }
</script>

<button on:click={play}>Buzz</button>
