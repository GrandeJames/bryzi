const INHALE_TIME_SECONDS = 4;
const HOLD_TIME_SECONDS = 7;
const EXHALE_TIME_SECONDS = 8;
const BREATHING_CYCLES = 4;

function Breath() {
  return <div>breath</div>;

  /**
   * {stage === "inhale" && <div>Inhale through your nose</div>}
        {stage === "hold" && <div>Hold your breath</div>}
        {stage === "exhale" && <div>Exhale completely with a woosh sound</div>}
   */
}

export default Breath;
